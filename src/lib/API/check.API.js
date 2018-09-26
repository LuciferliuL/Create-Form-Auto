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
        default:
            break;
    }
}