export const ADD_TABS = 'ADD_TABS'
export const DEL_TABS = 'DEL_TABS'
export const DEL_TABLE = 'DEL_TABLE'
export const ADD_TABLE = 'ADD_TABLE'
export const KEYS_CHANGE = 'KEYS_CHANGE'

//添加
export const addTabs = (value)=> {
    return {
        type:'ADD_TABS',
        value:value
    }
}

//删除
export const delTabs = (key) => {
    return {
        type:'DEL_TABS',
        key:key
    }
}

//添加表格
export const addTable = (value) => {
    return {
        type:"ADD_TABLE",
        value:value
    }
}

//删除表格
export const delTable = (key) => {
    return {
        type:"DEL_TABLE",
        key:key
    }
}

export const keyschange = (key) => {
    return {
        type:'KEYS_CHANGE',
        key:key
    }
}