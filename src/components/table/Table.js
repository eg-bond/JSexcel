import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(25)
    }

    onMousedown(event) {
        console.log(event.target.getAttribute('data-resize'))
        if (event.target.dataset.resize) {
           console.log('resizing', event.target.dataset.resize)
        }
    }

    // onMouseup() {
    //     console.log('mouseup')
    // }
    //
    // onMousemove() {
    //     console.log('mousemove')
    // }
}
