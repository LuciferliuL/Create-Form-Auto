export const API = (k) => {
    switch (k) {
        case 'login':
            return {
                method: 'GET',
                http: 'http://10.3.4.233:20296/api/RegisterManager/GetRegisterInfo'
            }
        case 'checkLoginID':
            return {
                method: 'GET',
                http: `http://10.3.4.233:20296/token?`
            }
        default:
            break;
    }
}