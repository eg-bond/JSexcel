import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(colState, index) {
    return (colState[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(rowState, index) {
    return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
    return (_, colNumber) => {
        const id = `${row}:${colNumber}`
        // const cellText = state.dataState[id]
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        return ` 
        <div 
        class="cell" 
        contenteditable 
        data-col=${colNumber} 
        data-row=${row}
        data-type="cell" 
        data-id=${id} 
        data-value="${data || ''}"
        style="${styles}; width: ${getWidth(state.colState, colNumber)}"
        >${parse(data) || ''}</div>`
    }
}

function toColumn({colValue, index, width}) {
    return `<div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
                ${colValue}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

function createRow(rowIndex, content, rowState) {
    const resizer = rowIndex ? `<div class='row-resize' data-resize="row"></div>` : ''
    const height = getHeight(rowState, rowIndex)
    return `
        <div class="row" data-type='resizable' data-row=${rowIndex} style="height: ${height}">
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

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    // создаем ряд столбцов
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn) // el => createCol(el)
        .join('')

    rows.push(createRow(null, cols, {}))

    // Создаем остальные клетки

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }

    return rows.join('')
}
