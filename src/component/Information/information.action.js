export const COPY_DATASOURCE = 'COPY_DATASOURCE'
export const UPDATA_DATASOURCE = 'UPDATA_DATASOURCE'
export const CHANGE_ACTIVEKEY = 'CHANGE_ACTIVEKEY'

export const copyDataSource = (value) => {
    return {
        type: COPY_DATASOURCE,
        value: value
    }
}

export const upDataSource = (obj) => {
    return {
        type: UPDATA_DATASOURCE,
        obj: obj
    }
}

export const changeActiveKey = (value) => {
    return {
        type: CHANGE_ACTIVEKEY,
        value: value
    }
}