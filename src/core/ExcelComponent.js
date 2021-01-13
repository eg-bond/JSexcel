import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        // массив с полями стейта, за изменениями в которых необходимо наблюдать
        this.subscribe = options.subscribe || []
        this.store = options.store

        this.prepare()
    }

    // Настраиваем наш компонент до init
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // Сюда приходят только изменения по тем полям, на изменения которых мы подписались ..
    // .. в конкретной подкомпоненте (в массиве this.subscribe)
    storeChanged() {}

    // Проверяем, отслеживается ли необходимая часть стейта
    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // Инициализируем компонент
    // Добавляем DOM слушателей
    init() {
        this.initDOMListeners()
    }

    // Удаляем компонент
    // Чистим слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach((unsub) => unsub())
        // this.storeSub.unsubscribe()
    }
}
