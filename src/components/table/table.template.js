const CODES = {
    A: 65,
    Z: 90
}

function toCell() {
    return `<div class="cell" contenteditable="true"></div>`
}

function toColumn(col) {
    return `<div class="column">${col}</div>`
}

function createRow(rowIndex, content) {
    return `
        <div class="row">
            <div class="row-info">${rowIndex ? rowIndex : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) { // подстрочником обозначается неиспользуемый элемент, который ,тем не менее, необходимо обозначить для доступа к index
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    // создаем ряд столбцов
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn) // el => createCol(el)
        .join('')

    rows.push(createRow(null, cols))

    // Создаем остальные клетки
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    for (let i=0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}
