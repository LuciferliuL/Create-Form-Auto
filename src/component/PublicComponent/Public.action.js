export const INPUT_CHANGE = 'INPUT_CHANGE'

export const inputChange = (key,value)=>{
    return {
        type:INPUT_CHANGE,
        value:value,
        key:key
    }
}
