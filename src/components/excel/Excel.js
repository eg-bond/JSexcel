import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
    }

    // Создаем страницу Excel (Создаем корневой div страницы, инициализируем все подкомпоненты и привязываем их к созданным для них div-ам)
    getRoot() {
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            // вызываем инстанс классового компонента, лежащего в массиве
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    // метод, отвечающий за инициализацию страницы Excel
    init() {
        this.subscriber.subscribeComponents(this.components) // подписываемся на изменение стейта
        // инициализируем подкомпоненты
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }
}
