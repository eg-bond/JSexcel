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
