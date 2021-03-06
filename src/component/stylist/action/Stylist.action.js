export const STYLIST_DATASOURCE_GET = 'STYLIST_DATASOURCE_GET'
export const FORM_SOURCE_DATA = 'FORM_SOURCE_DATA'
export const CURRENT_ATTR = 'CURRENT_ATTR'
export const FORM_SOURCE_DATA_UPDATA = 'FORM_SOURCE_DATA_UPDATA'
export const FORM_SOURCE_DATA_DELETE = 'FORM_SOURCE_DATA_DELETE'
export const FORM_UPDATA_FUGAI = 'FORM_UPDATA_FUGAI'
export const CLEAR_FORM = 'CLEAR_FORM'
export const TABLE_UPDATA_FROM_RESULTS = 'TABLE_UPDATA_FROM_RESULTS'
export const TABLE_FUGAI = 'TABLE_FUGAI'
export const TABLE_TR_0 = 'TABLE_TR_0'
export const TABLE_RESET = 'TABLE_RESET'
export const EDIT_TABLE = 'ADD_TABLE'


//需要编辑选中的元素
export const stylistDataSourceGet = (InitStylistData) => {
    return {
        type: STYLIST_DATASOURCE_GET,
        InitStylistData: InitStylistData
    }
}

export const stylistDataSourceAsync = (k) => {
    return (dispatch, getState) => {
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
        type: FORM_SOURCE_DATA_UPDATA,
        formSourceDataUpdata: formSourceDataUpdata
    }
}
//删除
export const formSourceDataDelete = (formSourceDataDelete) => {
    return {
        type: FORM_SOURCE_DATA_DELETE,
        formSourceDataDelete: formSourceDataDelete
    }
}
//右边显示的属性
export const currentAttr = (currentAttr) => {
    return {
        type: CURRENT_ATTR,
        currentAttr: currentAttr
    }
}

export const fugai = (init) => {
    return {
        type: FORM_UPDATA_FUGAI,
        init: init
    }
}

export const _clear = (initial = []) => {
    return {
        type: CLEAR_FORM,
        initial: initial
    }
}

export const _tableUpdataFromResults = (initial) => {
    return {
        type: TABLE_UPDATA_FROM_RESULTS,
        initial: initial
    }
}

export const tableFugai = (initial) => {
    return {
        type: TABLE_FUGAI,
        initial: initial
    }
}

export const tableTr0 = (initial) => {
    return {
        type: TABLE_TR_0,
        initial: initial
    }
}

export const tableReset = (init) => {
    return {
        type: TABLE_RESET,
        init: init
    }
}

//添加table
export const editTable = (value) => {
    return {
        type:EDIT_TABLE,
        value:value
    }
}

