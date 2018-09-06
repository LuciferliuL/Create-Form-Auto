import { combineReducers } from 'redux';
import Slider from './Header.reduce'
const allReducers = {
    Slider:Slider
}
const  rootReducer = combineReducers(allReducers)
//使用combineReducers组合reducer
export default rootReducer