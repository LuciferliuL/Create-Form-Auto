import './url.API'

export const API = (k) => {
    console.log(global.cfg);
    console.log(global.login);

    switch (k) {
        case 'login':
            return {
                method: 'GET',
                http: global.login.api + '/api/RegisterManager/GetRegisterInfo'
            }
        case 'checkLoginID':
            return {
                method: 'GET',
                http: global.cfg.branchSysAPI + `token?`
            }
        case 'getuserdata':
            return {
                method: 'POST',
                http: global.cfg.branchSysAPI + `api/user/LoginUserInfo`
            }
        default:
            break;
    }
}

