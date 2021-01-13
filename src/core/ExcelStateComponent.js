import {ExcelComponent} from '@core/ExcelComponent';

// Класс, который имитирует Реактовский хук setState
export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }
    // Получаем HTML верстку, обновленную с учетом изменившегося стейта
    get template() {
        return JSON.stringify(this.state, null, 2)
    }
    // Инициализируем начальный стейт
    initState(initialState = {}) {
        this.state = {...initialState}
    }
    // Обновляем стейт
    setState(newState) {
        this.state = {...this.state, ...newState}
        this.$root.html(this.template)
    }
}
