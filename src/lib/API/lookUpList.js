import './url.API'

export const LookUpApi = (key, id) => {
    //console.clear();
    //console.log(global.cfg);
    //console.log(global.login);

    switch (key) {
        case 'LookUpList':
            return {
                method: 'GET',
                http: global.cfg.centerQueryAPI + 'api/DataLookUp' //获取列表
            }
        case 'LookUpSave':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataLookUp/Save' //获取列表
            }
        case 'LookUpDel':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataLookUp/' + id + '/delete' //获取列表
            }
        default:
            break;
    }
}