import { combineReducers } from 'redux';
import Slider from '../component/Slider/reducer/Header.reduce'
import { InitStylistData, UpdataFormData, currentAttr, tableSource } from '../component/stylist/reducer/Stylist.reducer'
import { SliderCardData, currentTagsUpdata, SQL_Data } from '../component/SliderCard/reducer/SliderCard.reducer'
import {hidenDrawer, flagChange} from '../component/SliderRIght/reducer/Right.reducer'
import {TabsData, TableList, KEYS} from '../component/User/User.reducer'


const allReducers = {
    Slider: Slider,//侧边定位
    InitStylistData: InitStylistData,//初始化的数据
    SliderCardData: SliderCardData,//组件集合
    UpdataFormData: UpdataFormData,//选中的元素
    currentTagsUpdata: currentTagsUpdata,
    currentAttr: currentAttr,//右边显示的属性
    SQL_Data:SQL_Data,//写好sql的lookup
    hide:hidenDrawer,//drawer是否隐藏
    flag:flagChange,
    tableSource:tableSource, //表格的数据
    TabsData:TabsData,//多表单数据存储
    TableList:TableList,//多表格数据存储
    KEYS:KEYS//激活的多tabs的key
}
const rootReducer = combineReducers(allReducers)
//使用combineReducers组合reducer
export default rootReducer