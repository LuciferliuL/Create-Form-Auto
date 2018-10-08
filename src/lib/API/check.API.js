const baseAPI = 'http://10.3.4.177:9004'

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
                http: 'http://10.2.132.127:7000/api/DataSourceRole?$filter=SourceId eq'
            }
        case 'Role':
            return {
                method: 'POST',
                http: 'http://10.2.132.127:7000/api/DataSourceRole/'
            }
        case 'CheckCurrentId':
            return {
                method: "POST",
                http: 'http://10.2.132.127:7000/api/dataquery/GetDataBySqlName'
            }
        case 'Delete':
            return {
                method: "POST",
                http: 'http://10.3.4.177:9004/api/DataForm/'
            }
        case 'DOWNLOAD':
            return {
                method:'POST',
                http: 'http://10.2.132.215:7000/api/commonquery/Dataformas'
            }
        default:
            break;
    }
}