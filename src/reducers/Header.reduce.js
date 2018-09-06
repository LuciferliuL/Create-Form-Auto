import { SELECTKEYS_TO_HEADER } from '../actions/Header.action'

const initialState = {
    selectedKeys: ['表单总览']
}

export default function(state = initialState, action){
    switch(action.type){
        case SELECTKEYS_TO_HEADER:{
            return {
                ...state,
                selectedKeys:action.selectedKeys
            }
        }
        default:
            return state
    }
}