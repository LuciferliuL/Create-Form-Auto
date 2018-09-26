export const API = (key) => {
    switch (key) {
        case 'CheckFormList':
            return {
                method: 'GET',
                http: 'http://10.2.132.127:7000/api/DataForm'
            }
        case 'SaveForm':
            return {
                method: 'POST',
                http: 'http://10.2.132.127:7000/api/DataForm'
            }
        case 'SQL':
            return {
                method: 'POST',
                http: 'http://10.2.132.127:7000/api/dataquery/GetDataBySqlName'
            }
        default:
            break;
    }
}