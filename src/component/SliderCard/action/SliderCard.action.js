export const SLIDERCARD_ADD_DATA = 'SLIDERCARD_ADD_DATA'
export const CURRENT_TAGS_UPDATA = 'CURRENT_TAGS_UPDATA'
export const SQL_DATA = 'SQL_DATA'

export const sliderCardAddData = (CurrentTag) => {
    return {
        type: SLIDERCARD_ADD_DATA,
        CurrentTag: CurrentTag
    }
}

export const currentTagsUpdata = (InitialTags) => {
    return {
        type: CURRENT_TAGS_UPDATA,
        InitialTags: InitialTags
    }
}

export const sqlData = (SQL) => {
    return {
        type: SQL_DATA,
        SQL: SQL
    }
}
