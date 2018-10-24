import './url.API'
const userAPI = global.cfg.userAPI;

export const API = (k) => {
    switch (k) {
        case 'login':
            return {
                method: 'GET',
                http: userAPI + '/api/RegisterManager/GetRegisterInfo'
            }
        case 'checkLoginID':
            return {
                method: 'GET',
                http: userAPI + `/token?`
            }
        case 'getuserdata':
            return {
                method: 'POST',
                http: userAPI + `/api/user/LoginUserInfo`
            }
        default:
            break;
    }
}

