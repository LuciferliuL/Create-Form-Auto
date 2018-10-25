//test
const environment = 'test';

//默认
global.cfg = {
    model: sessionStorage.getItem('model'),
    center: "ZDA",
    currentBranchId: sessionStorage.getItem('currentBranchId'),
    centerQueryAPI: sessionStorage.getItem('centerQueryAPI'),//集中
    branchSysAPI: sessionStorage.getItem('branchSysAPI'),//sys
    branchQueryAPI: sessionStorage.getItem('branchQueryAPI'),//分公司
}

if (environment === 'test') {
    global.login = {
        api: 'http://10.3.2.21:20296',
    }
    global.cfg.center = 'ZDA';
}
else {
    global.login = {
        api: 'http://10.3.4.233:20296',
    }
}