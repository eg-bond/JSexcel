const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, colNumber) {
    return `<div class="cell" contenteditable="true" data-type='resizable' data-col=${colNumber}></div>`
}

// String.fromCharCode(colsCount).toString()

function toColumn(colValue, colNumber) {
    return `<div class="column" data-type='resizable' data-col=${colNumber}>
                ${colValue}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

function createRow(rowIndex, content) {
    const resizer = rowIndex ? `<div class='row-resize' data-resize="row"></div>` : ''
    return `
        <div class="row" data-type='resizable'>
            <div class="row-info">
                ${rowIndex ? rowIndex : ''}                
                ${resizer}
            </div>
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
