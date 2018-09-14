export const CURRENT_ATTR_UPDATA = 'CURRENT_ATTR_UPDATA'
export const FORM_UPDATA_FROM_CURRENT = 'FORM_UPDATA_FROM_CURRENT'
export const HIDEN_DRAWER = 'HIDEN_DRAWER'
export const FLAG_CHANGE = 'FLAG_CHANGE'

export const currentAttrUpdata = (currentAttr) => {
    return {
        type: CURRENT_ATTR_UPDATA,
        currentAttr: currentAttr
    }
}

export const formUpdataFromCurrent = (currentAttr) => {
    return {
        type: FORM_UPDATA_FROM_CURRENT,
        currentAttr: currentAttr
    }
}

export const hidenDrawer = (hide) => {
    return {
        type:HIDEN_DRAWER,
        hide:hide
    }
}

export const flagChange = (flag) => {
    return {
        type:FLAG_CHANGE,
        flag:flag
    }
}