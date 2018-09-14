import { CURRENT_ATTR_UPDATA, HIDEN_DRAWER, FLAG_CHANGE } from '../action/Right.action'


export const currentAttrUpdata = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_ATTR_UPDATA:
            return Object.assign({}, state, action.currentAttr)
        default:
            return state
    }
}

export const hidenDrawer = (state = false , action) => {
    switch (action.type) {
        case HIDEN_DRAWER:
            return state = action.hide
        default:
            return state
    }
}

export const flagChange = (state = '',action)=>{
    switch (action.type) {
        case FLAG_CHANGE:
            return state = action.flag
    
        default:
            return state
    }
}