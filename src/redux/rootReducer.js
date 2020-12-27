import {CHANGE_TEXT, TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
    let prevState
    let field
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState}
        case CHANGE_TEXT:
            prevState = state['dataState'] || {}
            prevState[action.data.id] = action.data.text
            return {...state, currentText: action.data.text, dataState: prevState}
        default: return state
    }
}

// Action creators
export const actions = {
    // data = {id, value, type}
    tableResize: (data) => ({type: TABLE_RESIZE, data}),
    changeText: (data) => ({type: CHANGE_TEXT, data}) // деструктуризовать data
}
