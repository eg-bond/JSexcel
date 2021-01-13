import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE} from '@/redux/types';

export function rootReducer(state, action) {
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)}
        case CHANGE_TEXT:
            field = 'dataState'
            return {...state, currentText: action.data.text, [field]: value(state, field, action)}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field]
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.data
            }
        default: return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}

// Action creators
export const actions = {
    // data = {id, value, type}
    tableResize: (data) => ({type: TABLE_RESIZE, data}),
    changeText: (data) => ({type: CHANGE_TEXT, data}), // деструктуризовать data
    changeStyles: (data) => ({type: CHANGE_STYLES, data}),
    applyStyle: (data) => ({type: APPLY_STYLE, data}), // data = value, ids
    changeTitle: (data) => ({type: CHANGE_TITLE, data})
}
