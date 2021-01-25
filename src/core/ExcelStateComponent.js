import {ExcelComponent} from '@core/ExcelComponent';

// Класс, который имитирует Реактовский хук setState, создает локальный стейт  для компоненты
export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }
    // Получаем HTML верстку, обновленную с учетом изменившегося стейта
    get template() {
        return JSON.stringify(this.localState, null, 2)
    }
    // создаем локальный стейт компоненты в переменной this.state
    initState(initialState = {}) {
        this.localState = {...initialState}
    }
    // Обновляем локальный стейт и перерисовываем компоненту
    setState(newState) {
        this.localState = {...this.localState, ...newState}
        this.$root.html(this.template)
    }
}
