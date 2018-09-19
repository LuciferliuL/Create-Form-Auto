export const TD_ADD_DOWN = 'TD_ADD_DOWN'
export const TD_REDUCE_UP = 'TD_REDUCE_UP'
export const TR_ADD_DOWN = 'TR_ADD_DOWN'
export const TR_REDUCE_UP = 'TR_REDUCE_UP'
export const SHOWS = 'SHOWS'
export const UPDATA_VALUES = 'UPDATA_VALUES'

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
export const trAddDown = (init) => {
    return {
        type:TR_ADD_DOWN,
        current:init
    }
}
export const trReduceUp = (init) => {
    return {
        type:TR_REDUCE_UP,
        current:init
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