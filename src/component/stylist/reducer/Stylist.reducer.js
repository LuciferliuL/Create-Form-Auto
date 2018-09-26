import { STYLIST_DATASOURCE_GET, FORM_UPDATA_FUGAI } from '../action/Stylist.action'
import { FORM_SOURCE_DATA, FORM_SOURCE_DATA_UPDATA, FORM_SOURCE_DATA_DELETE } from '../action/Stylist.action'
import { CURRENT_ATTR } from '../action/Stylist.action'
import { CURRENT_ATTR_UPDATA, FORM_UPDATA_FROM_CURRENT } from '../../SliderRIght/action/Right.action'
import { TR_ADD_DOWN, TR_REDUCE_UP, SHOWS, UPDATA_VALUES, UPDATA_CURRENt_DATASOURCE } from '../../PublicComponent/lookup/action/lookup.action'
import { TAG_PUSH_DATA_IN_COLUMNS, INPUT_VALUE_CHANGE, SQL_VALUE_CHANGE, GROUP_VALUE_CHANGE, TAG_PUSH_DATA_IN_GROUP } from '../../Drawer/action/Drawer.action'
import { INPUT_CHANGE } from '../../PublicComponent/Public.action'

const initialState = []

export const InitStylistData = (state = initialState, action) => {
    switch (action.type) {
        case STYLIST_DATASOURCE_GET: {
            return state = action.InitStylistData
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
        case FORM_UPDATA_FUGAI:
            return state = action.init
        case INPUT_CHANGE:
            return state.map(e => e.key === action.key
                ? {...e,defaultValue:action.value}
                : e)
        default:
            return state;
    }
}

export const currentAttr = (state = {}, action) => {
    console.log(action);

    switch (action.type) {
        case CURRENT_ATTR:
            return state = action.currentAttr
        case CURRENT_ATTR_UPDATA:
            return Object.assign({}, state, action.currentAttr)
        case TR_ADD_DOWN:
            return { ...state, tr: action.current + action.step }
        case TR_REDUCE_UP:
            return { ...state, tr: action.current - action.step }
        case SHOWS:
            return { ...state, show: !action.shows.show }
        case UPDATA_VALUES:
            return {
                ...state, values: action.init
            }
        case TAG_PUSH_DATA_IN_COLUMNS:
            let keys = action.key
            let initial = action.initial
            let list = []
            state.columns.forEach((e, i) => {
                if (i === keys) {
                    list.push(initial)
                }
                list.push(e)
            })
            return {
                ...state, columns: list
            }
        case TAG_PUSH_DATA_IN_GROUP:
            let keys_ = action.key
            let initial_ = action.initial
            let list_ = []
            state.GroupValue.forEach((e, i) => {
                if (i === keys_) {
                    list_.push(initial_)
                }
                list_.push(e)
            })
            return {
                ...state, GroupValue: list_
            }
        case INPUT_VALUE_CHANGE:
            state.columns[action.key][action.title] = action.data
            return {
                ...state
            }
        case GROUP_VALUE_CHANGE:
            state.GroupValue[action.key][action.title] = action.data
            return {
                ...state
            }
        case SQL_VALUE_CHANGE:
            return {
                ...state, SQL: action.initial
            }
        case UPDATA_CURRENt_DATASOURCE:
            return {
                ...state, dataSource: action.initial
            }
        default:
            return state
    }
}