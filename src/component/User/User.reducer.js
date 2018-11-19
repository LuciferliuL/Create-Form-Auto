import { ADD_TABS, DEL_TABS, ADD_TABLE, DEL_TABLE, KEYS_CHANGE, COPY_THIS } from './User.action'




//用来记录表单
export const TabsData = (state = [], action) => {
    switch (action.type) {
        case ADD_TABS:
            state.push(action.value)
            return state;
        case DEL_TABS:
            return state.filter(e => e.Name !== action.key)
        case COPY_THIS:
            return state = action.List
        default:
            return state;
    }
}

//用来记录table
export const TableList = (state = [], action) => {
    switch (action.type) {
        case ADD_TABLE:
            state.push(action.value)
            return state;
        case DEL_TABLE:
            return state.filter(e => e.Name !== action.key)
        default:
            return state;
    }
}

//用来记录激活的key
export const KEYS = (state = 0, action) => {
    switch (action.type) {
        case KEYS_CHANGE:

            return action.key;

        default:
            return state;
    }
}