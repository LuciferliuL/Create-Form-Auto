export const STYLIST_DATASOURCE_GET = 'STYLIST_DATASOURCE_GET'
export const FORM_SOURCE_DATA = 'FORM_SOURCE_DATA'
export const CURRENT_ATTR = 'CURRENT_ATTR'
export const FORM_SOURCE_DATA_UPDATA = 'FORM_SOURCE_DATA_UPDATA'

//需要编辑选中的元素
export const stylistDataSourceGet = (InitStylistData) => {
    return {
        type: STYLIST_DATASOURCE_GET,
        InitStylistData: InitStylistData
    }
}

export const stylistDataSourceAsync = (k) => {
    // console.log(k);
    return (dispatch, getState) => {
        console.log(getState().InitStylistData);
        dispatch(stylistDataSourceGet(k))
    }
}
//更新创建的表单
export const formSourceData = (FormSourceData) => {
    return {
        type: FORM_SOURCE_DATA,
        FormSourceData: FormSourceData
    }
}
export const formSourceDataUpdata = (formSourceDataUpdata) => {
    return {
        type:FORM_SOURCE_DATA_UPDATA,
        formSourceDataUpdata:formSourceDataUpdata
    }
}

//右边显示的属性
export const currentAttr = (currentAttr) => {
    return {
        type: CURRENT_ATTR,
        currentAttr: currentAttr
    }
}