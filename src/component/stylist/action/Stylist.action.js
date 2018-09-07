export const STYLIST_DATASOURCE_GET = 'STYLIST_DATASOURCE_GET'

export const stylistDataSourceGet = (dataSource) => {
    return {
        type: STYLIST_DATASOURCE_GET,
        dataSource: dataSource
    }
}

export const stylistDataSourceAsync = (k) => {
    // console.log(k);

    return (dispatch, getState) => {
        console.log(getState().StylistData);
        dispatch(stylistDataSourceGet(k))
    }
}