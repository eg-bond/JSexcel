import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            // тут указаны конкретные поля стейта, за изменениями которых необходимо наблюдать
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>            
        `
    }

    init() {
        super.init();

        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })

        // this.$on('table:input', $cell => {
        //     this.$formula.text($cell.text())
        // })

        // this.$subscribe(state => {
        //     console.log('FormulaUpdate', state.currentText)
        //     this.$formula.text(state.currentText)
        // })
    }

    // storeChanged вызывается в обертке StoreSubscriber при изменении необходимой части стейта
    storeChanged({currentText}) { // currentText приходит из
        this.$formula.text(currentText)
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}
