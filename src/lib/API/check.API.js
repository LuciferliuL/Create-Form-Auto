import './url.API'

export const API = (key, branchtype = '') => {
    //console.clear();
    //console.log(global.cfg);
    //console.log(global.login);

    switch (key) {
        case 'SaveForm':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataForm'
            }
        case 'CheckId':
            return {
                method: 'GET',
                http: global.cfg.centerQueryAPI + 'api/DataSourceRole?$filter=SourceId eq'
            }
        case 'Role':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataSourceRole/'
            }
        case 'Delete':
            return {
                method: "POST",
                http: global.cfg.centerQueryAPI + 'api/DataForm/'
            }
        case 'POSTDATA':
            return {
                method: "POST",
                http: global.cfg.centerQueryAPI + 'api/DataForm/GetDataFormNodes'
            }
        case 'GetCategory':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataForm/GetCategory'
            }
        case 'SQL':
            return {
                method: 'POST',
                http: global.cfg.branchQueryAPI + 'api/dataquery/GetDataBySqlName'
            }
        case 'GetSqlColumns'://根据SQL得到列
            return {
                method: "POST",
                http: global.cfg.branchQueryAPI + 'api/dataquery/GetColumnsBySqlScript'
            }
        case 'CheckCurrentId':
            return {
                method: "POST",
                http: global.cfg.branchQueryAPI + 'api/dataquery/GetDataBySqlName'
            }
        default:
            break;
    }
}