// import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';
import {clone} from '@core/utils';

// есть проблема с механизмом добавления новых полей стейта - нужно полностью удалить из LocalStarage чтобы работало корректноашкые
const defaultState = {
    rowState: {}, // ресайз рядов
    colState: {}, // ресайз столбцов
    dataState: {}, // текст ячеек
    stylesState: {}, // стили ячейки
    currentText: '',
    openedDate: new Date(),
    title: defaultTitle,
    currentStyles: defaultStyles
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

// export const initialState = storage('excel-state')
//     ? normalize(storage('excel-state'))
//     : defaultState

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}

