export const INPUT_CHANGE = 'INPUT_CHANGE'
export const CHECK_BOX_VALUE = 'CHECK_BOX_VALUE'

export const inputChange = (key,value)=>{
    return {
        type:INPUT_CHANGE,
        value:value,
        key:key
    }
}

export const checkboxvalue = (key, value)=>{
    return {
        type:CHECK_BOX_VALUE,
        value:value,
        key:key
    }
}
