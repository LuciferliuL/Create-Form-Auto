import './url.API'

export const API = (k) => {
    switch (k) {
        case 'login':
            return {
                method: 'GET',
                http: global.login.api + '/api/RegisterManager/GetRegisterInfo'
            }
        case 'checkLoginID':
            return {
                method: 'GET',
                http: global.cfg.sysAPI + `token?`
            }
        case 'getuserdata':
            return {
                method: 'POST',
                http: global.cfg.sysAPI + `api/user/LoginUserInfo`
            }
        default:
            break;
    }
}

