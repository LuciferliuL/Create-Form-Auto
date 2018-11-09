import './url.API'

export const API = (key) => {
    // console.clear();
    console.log(global.cfg);
    console.log(global.login);
    // global.cfg.centerQueryAPI = 'http://10.2.110.25:4615/'
    switch (key) {
        // 用户列表查询
        case 'userList':
            return {
                http: global.cfg.centerQueryAPI + 'api/DataBaseOperation/GetDBAccount'
            }
        // 用户信息保存以及更新
        case 'saveUserInfo':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataBaseOperation/SaveDBAccount'
            }
        // 数据库列表查询
        case 'dbList':
            return {
                method: "GET",
                http: global.cfg.centerQueryAPI + 'api/DataBaseOperation/GetDBInfo'
            }
        // 数据库信息保存以及更新
        case 'saveDbInfo':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataBaseOperation/SaveDbInfo'
            }
        // 获取用户授权信息
        case 'getAuthorList':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataBaseOperation/GetDBPermissionsByAccount'
            }
        // 保存授权信息
        case 'saveAuthorInfo':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataBaseOperation/SaveDBPermissions'
            }
        case 'getActionList':
            return {
                method: 'POST',
                http: global.cfg.centerQueryAPI + 'api/DataBaseOperation/SaveDbInfo'
            }

        default:
            break;
    }
}