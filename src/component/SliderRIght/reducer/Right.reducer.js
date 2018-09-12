import CURRENT_ATTR_UPDATA from '../action/Right.action'

export const currentAttrUpdata = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
        case CURRENT_ATTR_UPDATA:
     
        
            return Object.assign({},state,action.currentAttr)
        default:
            return state
    }
}