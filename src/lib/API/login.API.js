//获取用户信息
export const userAPI = 'http://10.3.4.233:20296';
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

