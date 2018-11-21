import './url.API'

export const API = (key, branchtype = '') => {
    //console.clear();
    //console.log(global.cfg);
    //console.log(global.login);

    switch (key) {
        case "GetDataFormNodes_mobile"://得到树形列表（分类及表单）
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataFormMobile/GetDataFormNodes"
            }
        case "GetCategory_mobile"://得到分类
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataFormMobile/GetCategory"
            }
        case "DataFormSave_mobile"://保存
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataFormMobile/Save"
            }

        case "GetUserFunctions"://用户权限
            return {
                method: 'POST',
                httpu: global.cfg.centerQueryAPI + "api/DataFormMobile/GetUserFunctions"
            }
        case 'Delete'://del
            return {
                method: "POST",
                http: global.cfg.centerQueryAPI + 'api/DataFormMobile/'
            }
        case "getusers"://所有用户
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataFormRole/GetUsers"
            }
        case "savedataformrole"://保存配置
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataFormRole/Save"
            }
        case "getdataformrolelist"://根据资源ID 获取资源的配置；
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataFormRole/GetList"
            }
        case "getdataformrolelistbytargettype"://根据目标资源ID 获取目标资源的配置；
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataFormRole/GetListByTarget"
            }
        default:
            break;
    }
}