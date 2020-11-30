export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatch, fire, trigger
    // Уведомляем слушателей если они есть
    // table.emit('table:select', {a: 1})
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // on, listen
    // Подписываемся на уведомление
    // Добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// Example
// const emitter = new Emitter()
// // почему подписка сразу работает?
// const unsub = emitter.subscribe('vladilen', data => console.log('Sub:', data))
//
// emitter.emit('vladilen', 42)
// emitter.emit('123213', 42) // не будет работать, т.к. на кое событие не подписались
//
// setTimeout(() => {
//     emitter.emit('vladilen', 'after 2 sec')
// }, 2000)
//
// setTimeout(() => {
//     unsub()
// }, 3000)
//
// setTimeout(() => {
//     emitter.emit('vladilen', 'after 4 sec')
// }, 4000)
