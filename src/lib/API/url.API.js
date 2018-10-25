//test
const environment = 'test';

//默认
global.cfg = {
    model: 'design',
    branchId: "ZDA",
    currentBranchId: "",
    sysAPI: '',//sys
    centerQueryAPI: "",//集中
    branchQueryAPI: ''//分公司
}

if (environment === 'test') {
    global.login = {
        api: 'http://10.3.2.21:20296',
    }
    global.cfg.branchId = 'ZDA';
}
else {
    global.login = {
        api: 'http://10.3.4.233:20296',
    }
}