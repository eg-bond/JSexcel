const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function toCell(state, row) {
    return (_, colNumber) => `
        <div 
        class="cell" 
        contenteditable 
        data-col=${colNumber} 
        data-type="cell" 
        data-id=${row}:${colNumber} 
        style="width: ${getWidth(state.colState, colNumber)}"
        ></div>`
}

function toColumn({colValue, index, width}) {
    return `<div class="column" data-type='resizable' data-col=${index} style="width: ${width}">
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

function withWidthFrom(state) {
    return function(colValue, index) {
        return {
            colValue, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 15, state) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    // создаем ряд столбцов
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn) // el => createCol(el)
        .join('')

    rows.push(createRow(null, cols))

    // Создаем остальные клетки

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(row + 1, cells))
    }

    return rows.join('')
}
