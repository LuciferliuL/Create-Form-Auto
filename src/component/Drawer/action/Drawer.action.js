export const TAG_PUSH_DATA_IN_COLUMNS = 'TAG_PUSH_DATA_IN_COLUMNS'
export const INPUT_VALUE_CHANGE = 'INPUT_VALUE_CHANGE'
export const SQL_VALUE_CHANGE = 'SQL_VALUE_CHANGE'
export const GROUP_VALUE_CHANGE = 'GROUP_VALUE_CHANGE'
export const TAG_PUSH_DATA_IN_GROUP = 'TAG_PUSH_DATA_IN_GROUP'
export const TAG_CANCEL_DATA_IN_GROUP = 'TAG_CANCEL_DATA_IN_GROUP'
export const INPUT_CANCEL_DATA = 'INPUT_CANCEL_DATA'

export const tagPushDataInColumns = (key, initial) => {
    return {
        type: TAG_PUSH_DATA_IN_COLUMNS,
        initial: initial,
        key: key
    }
}

export const tagPushDataInGroup = (key, initial) => {
    return {
        type: TAG_PUSH_DATA_IN_GROUP,
        initial: initial,
        key: key
    }
}

export const inputValueChange = (key, title, data) => {
    return {
        type: INPUT_VALUE_CHANGE,
        key: key,
        title: title,
        data:data
    }
}

export const sqlValueChange = (initial) => {
    return {
        type:SQL_VALUE_CHANGE,
        initial:initial
    }
}

export const GroupValueChange = (key, title, data) => {
    return {
        type: GROUP_VALUE_CHANGE,
        key: key,
        title: title,
        data:data
    }
}

export const TagCancelDataInGroup = (key) => {
    return {
        type:TAG_CANCEL_DATA_IN_GROUP,
        key:key
    }
}

export const InputCancelData = (key) => {
    return {
        type:INPUT_CANCEL_DATA,
        key:key
    }
}