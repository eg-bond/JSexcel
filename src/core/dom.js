class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector) // функция выбирает селектор
            : selector
    }

    html(html = '') {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this // мы возвращаем инстанс, чтобы другие методы класса работали там, где это происходит
        }
        return this.$el.outerHTML.trim() // trim удаляет пробелы из начала и кончца строки
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }


    append(node) { // node - это Element в JavaScript
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    get data() {
        return this.$el.dataset
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }


    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key]
            })
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }
    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus() {
        this.$el.focus()
        return this
    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }
}


export function $(selector) {
    return new Dom(selector)
}
// проделываем такую манипуляцию для того, чтобы не создавать каждый раз инстанс класса через new

$('div').html('<h1>Test</h1>').clear()

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el) // оборачиваем возвращаемый элемент в функцию $, чтобы у нее был весь функционал сласса Dom
}
