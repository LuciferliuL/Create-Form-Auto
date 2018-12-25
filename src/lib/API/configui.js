// http://10.3.2.21:9004/api/DataConvert/GetMenus


import './url.API'

export const API = (key) => {
    //console.clear();
    //console.log(global.cfg);
    //console.log(global.login);

    switch (key) {
        case "GetConfigMenu"://得到树形列表（分类及表单）
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + "api/DataConvert/GetMenus"
            }
        default:
            break;
    }
}