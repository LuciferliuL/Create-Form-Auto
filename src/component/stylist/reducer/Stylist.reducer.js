import { STYLIST_DATASOURCE_GET } from '../action/Stylist.action'
import { FORM_SOURCE_DATA, FORM_SOURCE_DATA_UPDATA, FORM_SOURCE_DATA_DELETE } from '../action/Stylist.action'
import { CURRENT_ATTR } from '../action/Stylist.action'
import { CURRENT_ATTR_UPDATA, FORM_UPDATA_FROM_CURRENT } from '../../SliderRIght/action/Right.action'
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
const result = (o1, o2) => {
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
            return result(state, action.formSourceDataUpdata)
        case FORM_SOURCE_DATA_DELETE:
            if (state.length > 1) {
                return state.filter(item => {
                    if (item.key !== action.formSourceDataDelete.key) {
                        return item
                    }
                })
            } return state
        case FORM_UPDATA_FROM_CURRENT:
            return state.map(e => e.key === action.currentAttr.key
                ? Object.assign(e, action.currentAttr)
                : e)
        default:
            return state;
    }
}

export const currentAttr = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_ATTR:
            return Object.assign({}, state, action.currentAttr)
        case CURRENT_ATTR_UPDATA:
            return Object.assign({}, state, action.currentAttr)
        default:
            return state
    }
}