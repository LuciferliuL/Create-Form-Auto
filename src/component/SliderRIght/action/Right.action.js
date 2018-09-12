export const CURRENT_ATTR_UPDATA = 'CURRENT_ATTR_UPDATA'
export const FORM_UPDATA_FROM_CURRENT = 'FORM_UPDATA_FROM_CURRENT'

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