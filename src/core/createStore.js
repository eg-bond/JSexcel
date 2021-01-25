export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let listeners = [] // массив функций, вызываемых при изменении стейта

    return {
        // подписываем функцию на изменение стейта - запихиваем её в массив listeners
        subscribe(fn) {
            listeners.push(fn)
            return {
                // возвращаем метод для отписки конкретной функции от обновления стейта
                unsubscribe() {
                    listeners = listeners.filter(l => l !== fn)
                }
            }
        },
        // Метод, который отвечает за передачу экшена в rootReducer, запуская таким образом изменение стейта
        // Также, после!!! обновления стейта запускает все функции, подписанные на его изменение
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },
        getState() {
            // лайфхак для того, чтобы избежать мутирования стейта
            return JSON.parse(JSON.stringify(state))
        }
    }
}

// Extra Task - Переписать на класс
