import {isEqual} from '@core/utils';

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.sub = null //
        this.prevState = {}
    }

    // Эта функция
    subscribeComponents(components) {
        this.prevState = this.store.getState()
        this.sub = this.store.subscribe(state => { // state - это обновленный стейт
            Object.keys(state).forEach(key => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach(component => {
                        // isWatching проверяет, подписана ли подкомпонента на изменение state[key]
                        if (component.isWatching(key)) {
                            const changes = {[key]: state[key]}
                            component.storeChanged(changes)
                        }
                    })
                }
            })
            // тут мы обновляем prevState (после этого this.prevState[key] === state[key])
            this.prevState = this.store.getState()
        })
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe() // unsubscribe() из createStore
    }
}
