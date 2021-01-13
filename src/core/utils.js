// Pure functions
// Функция, которая формирует название колбека для евента

export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Формирует массив, состоящий из последовательного массива цифр, обозначающих целевые ряды или колонки ячеек
export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

// Вытаскиваем данные из Локального хранилища либо засовывает их туда, если передан data
export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}
// Хелпер для стора
export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelCaseToDash( myStr ) {
    return myStr.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
        .join(';')
}
// Функция, оптимизирующая работу со стором (и не только), создавая задержку выполнения
export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            // eslint-disable-next-line
            fn.apply(this, args) // чтобы не терять контекст
            // fn(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
