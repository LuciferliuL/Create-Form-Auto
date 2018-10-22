//export const baseAPI = 'http://10.3.4.177:9004'
export const baseAPI = 'http://10.2.132.215:7000'

export const API = (key) => {
    switch (key) {
        case 'CheckFormList':
            return {
                method: 'GET',
                http: baseAPI + '/api/DataForm'
            }
        case 'SaveForm':
            return {
                method: 'POST',
                http: baseAPI + '/api/DataForm'
            }
        case 'SQL':
            return {
                method: 'POST',
                http: baseAPI + '/api/dataquery/GetDataBySqlName'
            }
        case 'CheckId':
            return {
                method: 'GET',
                http: baseAPI + '/api/DataSourceRole?$filter=SourceId eq'
            }
        case 'Role':
            return {
                method: 'POST',
                http: baseAPI + '/api/DataSourceRole/'
            }
        case 'CheckCurrentId':
            return {
                method: "POST",
                http: baseAPI + '/api/dataquery/GetDataBySqlName'
            }
        case 'Delete':
            return {
                method: "POST",
                http: baseAPI + '/api/DataForm/'
            }
        case 'DOWNLOAD':
            return {
                method: 'POST',
                http: baseAPI + '/api/commonquery/Dataformas'
            }
        case 'POSTDATA':
            return {
                method: "POST",
                http: baseAPI + '/api/DataForm/GetDataFormNodes'
            }
        case 'GetCategory':
            return {
                method: 'POST',
                http: baseAPI + '/api/DataForm/GetCategory'
            }
        default:
            break;
    }
}