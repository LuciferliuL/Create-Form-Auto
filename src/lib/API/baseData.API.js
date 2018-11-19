import './url.API'

export const API = (key) => {
    // console.clear();
    //console.log(global.cfg);
    //console.log(global.login);
    // U = 'http://10.2.110.25:4615/'
    // let U = 'http://10.3.4.233:20296/'
    let U = 'http://10.3.4.21:20296/'
    switch (key) {
        // 用户列表查询
        case 'userList':
            return {
                http: U + 'api/DataBaseOperation/GetDBAccount'
            }
        // 用户信息保存以及更新
        case 'saveUserInfo':
            return {
                method: 'POST',
                http: U + 'api/DataBaseOperation/SaveDBAccount'
            }
        // 数据库列表查询
        case 'dbList':
            return {
                method: "GET",
                http: U + 'api/DataBaseOperation/GetDBInfo'
            }
        // 数据库信息保存以及更新
        case 'saveDbInfo':
            return {
                method: 'POST',
                http: U + 'api/DataBaseOperation/SaveDbInfo'
            }
        // 获取用户授权信息
        case 'getAuthorList':
            return {
                method: 'POST',
                http: U + 'api/DataBaseOperation/GetDBPermissionsByAccount'
            }
        // 保存授权信息
        case 'saveAuthorInfo':
            return {
                method: 'POST',
                http: U + 'api/DataBaseOperation/SaveDBPermissions'
            }
        case 'getActionList':
            return {
                method: 'POST',
                http: U + 'api/DataBaseOperation/SaveDbInfo'
            }

        default:
            break;
    }
}