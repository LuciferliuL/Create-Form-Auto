import './url.API'

export const API = (k, id) => {
    // console.clear();
    console.log(global.cfg);
    console.log(global.login);

    switch (k) {
        case "geti9msgall"://列表
            return {
                method: 'GET',
                http: global.cfg.centerQueryAPI + "api/DataMsg"
            }
        case "geti9orgs"://部门；
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataMsg/GetOrgs"
            }
        case "geti9orgpersons"://部门人员；
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataMsg/GetPersons"
            }
        case "I9msg"://发起工作流；
            return {
                response: 'json',
                http: global.cfg.centerQueryAPI + "api/DataMsg/Save"
            }
        case "geti9allpersons"://全部人员
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataMsg/GetAllPerson"
            }
        case 'i9Del':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataMsg/' + id + '/delete' //获取列表
            }
        case "geti9msgsendlist"://获取日志
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataMsg/GetSendList"
            }
        default:
            break;
    }
}