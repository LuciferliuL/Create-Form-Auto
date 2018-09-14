import { combineReducers } from 'redux';
import Slider from '../component/Slider/reducer/Header.reduce'
import { InitStylistData, UpdataFormData, currentAttr } from '../component/stylist/reducer/Stylist.reducer'
import { SliderCardData, currentTagsUpdata, SQL_Data } from '../component/SliderCard/reducer/SliderCard.reducer'
import {hidenDrawer, flagChange} from '../component/SliderRIght/reducer/Right.reducer'

const allReducers = {
    Slider: Slider,//侧边定位
    InitStylistData: InitStylistData,//初始化的数据
    SliderCardData: SliderCardData,//组件集合
    UpdataFormData: UpdataFormData,//选中的元素
    currentTagsUpdata: currentTagsUpdata,
    currentAttr: currentAttr,//右边显示的属性
    SQL_Data:SQL_Data,//写好sql的lookup
    hide:hidenDrawer,//drawer是否隐藏
    flag:flagChange
}
const rootReducer = combineReducers(allReducers)
//使用combineReducers组合reducer
export default rootReducer