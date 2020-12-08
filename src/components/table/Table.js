import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable(25)
    }

    prepare() { // вызывается перед init
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))
        // this.selection.select($cell)
        // // этот эмит для того, чтобы при первоначальной загрузке страницы контент ячейки сразу оказывался в формуле
        // this.$emit('table:select', $cell)

        this.$on('formula:input', text => {
            this.selection.currentCell.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.currentCell.focus()
        })

        // this.$subscribe(state => {
        //     console.log('TableState', state)
        // })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
            console.log('Resize data', data)
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.currentCell)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']

        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.currentCell.id(true)

            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
            // this.selection.select($next)
            // this.$emit('table:select', $next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}


