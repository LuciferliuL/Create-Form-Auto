import { STYLIST_DATASOURCE_GET } from '../action/Stylist.action'

const initialState = {
    data: []
}

export default function(state = initialState, action){
    switch(action.type){
        case STYLIST_DATASOURCE_GET:{
            return {
                ...state,
                data:action.dataSource
            }
        }
        default:
            return state
    }
}