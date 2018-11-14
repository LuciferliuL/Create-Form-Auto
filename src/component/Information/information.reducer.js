import {COPY_DATASOURCE,UPDATA_DATASOURCE,CHANGE_ACTIVEKEY} from './information.action'



export const information = (state={}, action) =>{
    switch (action.type) {
        case COPY_DATASOURCE:
            return Object.assign({},state,action.value)
        case UPDATA_DATASOURCE:
            return state
    
        default:
            return state
    }
}

export const activeKey = (state='0', action) => {
    // console.log(action);
    
    switch (action.type) {
        case CHANGE_ACTIVEKEY:
            
            return state = action.value
    
        default:
            return state
    }
}