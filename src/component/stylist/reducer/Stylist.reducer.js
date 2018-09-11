import { STYLIST_DATASOURCE_GET } from '../action/Stylist.action'
import { FORM_SOURCE_DATA, FORM_SOURCE_DATA_UPDATA } from '../action/Stylist.action'
import { CURRENT_ATTR } from '../action/Stylist.action'
const initialState = []

export const InitStylistData = (state = initialState, action) => {
    switch (action.type) {
        case STYLIST_DATASOURCE_GET: {
            return Object.assign(state, { 'InitStylistData': action.InitStylistData })
        }
        default:
            return state
    }
}

//数组覆盖
const result = (o1 , o2) => {
    return o1.map(item1 => {
        return Object.assign(item1, o2.find(item2 => {
          return item2 && item1.key === item2.key
        }))
      })
}

export const UpdataFormData = (state = [], action) => {
    switch (action.type) {
        case FORM_SOURCE_DATA:
            return [...state, action.FormSourceData]
        case FORM_SOURCE_DATA_UPDATA:
            // console.log(state);
            // console.log(action.formSourceDataUpdata);
            
            return result(state,action.formSourceDataUpdata)

        default:
            return state;
    }
}

export const currentAttr = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_ATTR:
            return Object.assign({}, state, { 'currentAttr': action.currentAttr })
        default:
            return state
    }
}