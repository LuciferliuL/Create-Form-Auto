import { combineReducers } from 'redux';
import Slider from '../component/Slider/reducer/Header.reduce'
import StylistData from '../component/stylist/reducer/Stylist.reducer'
const allReducers = {
    Slider:Slider,
    StylistData:StylistData
}
const  rootReducer = combineReducers(allReducers)
//使用combineReducers组合reducer
export default rootReducer