import {isEqual} from '@core/utils';

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.sub = null // хранит в себе функцию отписки от стора
        this.prevState = {}
    }

    // Эта функция оптимизирует процесс взаимодействия подкомпонент со стейтом, снабжая их только теми..
    // ..полями стейта, изменение которых они отслеживают (посредством массива subscribe: [] в подкомпоненте)
    subscribeComponents(components) {
        this.prevState = this.store.getState()
        this.sub = this.store.subscribe(state => { // Не забывай, что этот state будет передан в функцию в методе dispatch после непосредственного обновления стейта
            Object.keys(state).forEach(key => { // разбиваем стейт на составляющие
                // isEqual сравнивает приведенные к строке сначения this.prevState[key] и state[key]
                if (!isEqual(this.prevState[key], state[key])) { // state[key] - обновленный стейт после диспатча
                    components.forEach(component => {
                        // isWatching проверяет, подписана ли подкомпонента на изменение поля key
                        if (component.isWatching(key)) {
                            const changes = {[key]: state[key]}
                            component.storeChanged(changes)
                        }
                    })
                }
            })
            // актуализируем this.prevState
            this.prevState = this.store.getState()
            // Т.к. функция, подписанная посредством метода subscribe вызывается ПОСЛЕ обновления стейта..
            // ..функция store.getState() будет содержать уже обновленное значение стейта
        })
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe()
    }
}
