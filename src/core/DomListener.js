import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DomListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            const name = this.name || ''
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${name} Component`)
            }
            // Переопределяем this[method], чтобы в дальнейшем при создании и удалении события не было проблем
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
