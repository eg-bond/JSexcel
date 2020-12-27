import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {actions} from '@/redux/rootReducer';

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
        return createTable(25, this.store.getState())
    }

    // вызывается перед init (в конструкторе ExcelComponent)
    prepare() {
        this.selection = new TableSelection()
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text => {
            this.selection.currentCell.text(text)
            this.updateTextInStore(text)
        })
        this.$on('formula:done', () => {
            this.selection.currentCell.focus()
        })
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

    // перемещение по ячейкам с помощью кнопок на клавиатуре
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

    updateTextInStore(text) {
        this.$dispatch(actions.changeText({
            id: this.selection.currentCell.id(),
            text
        }))
    }

    // Дублируем набираемый в ячейке текст в строку формулы
    onInput(event) {
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
    }
}


