import './scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {rootReducer} from '@/redux/rootReducer'
import {createStore} from '@core/createStore'
import {storage} from '@core/utils';
import {initialState} from '@/redux/initialState';

const store = createStore(rootReducer, initialState)
// const store = createStore(rootReducer, {colState: {}})

// Функция storage запихивает данные из state в localStorage под ключем 'excel-state'
store.subscribe(state => {
    storage('excel-state', state)
})

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()
