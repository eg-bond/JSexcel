export class TableSelection {
    static className = 'selected'

    constructor() { // this.group будет хранить в себе все ячейки, которые надо выделить
        this.group = []
        this.currentCell = null
    }

    // $el instanecof DOM === true
    select($el) {
        this.clearSelection()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.currentCell = $el
    }

    selectGroup($group = []) {
        this.clearSelection()

        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    clearSelection() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }
}
