export const TD_ADD_DOWN = 'TD_ADD_DOWN'
export const TD_REDUCE_UP = 'TD_REDUCE_UP'
export const TR_ADD_DOWN = 'TR_ADD_DOWN'
export const TR_REDUCE_UP = 'TR_REDUCE_UP'
export const SHOWS = 'SHOWS'
export const UPDATA_VALUES = 'UPDATA_VALUES'
export const UPDATA_CURRENt_DATASOURCE = 'UPDATA_CURRENt_DATASOURCE'
export const T_ADD_DOWN = 'T_ADD_DOWN'
export const T_REDUCE_UP = 'T_REDUCE_UP'
export const ON_CLICK_TR = 'ON_CLICK_TR' 


export const tdAddDown = (init) => {
    return {
        type:TD_ADD_DOWN,
        current:init
    }
}
export const tdReduceUp = (init) => {
    return {
        type:TD_REDUCE_UP,
        current:init
    }
}
export const trAddDown = (init,step) => {
    return {
        type:TR_ADD_DOWN,
        current:init,
        step:step
    }
}
export const trReduceUp = (init,step) => {
    return {
        type:TR_REDUCE_UP,
        current:init,
        step:step
    }
}

export const shows = (bool) => {
    return{
        type:SHOWS,
        shows:bool
    }
}



export const updataValues = (init) => {
    return {
        type:UPDATA_VALUES,
        init:init
    }
}

export const upDataCurrentDataSource = (initial,totalPage) => {
    return {
        type:UPDATA_CURRENt_DATASOURCE,
        initial:initial,
        totalPage:totalPage
    }
}

export const tAddDown = (init,step) => {
    return {
        type:T_ADD_DOWN,
        current:init,
        step:step
    }
}
export const tReduceUp = (init,step) => {
    return {
        type:T_REDUCE_UP,
        current:init,
        step:step
    }
}

export const onClickTr = (tr) => {
    return{
        type:ON_CLICK_TR,
        tr:tr
    }
}