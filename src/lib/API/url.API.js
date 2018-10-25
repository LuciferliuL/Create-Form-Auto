//默认
global.cfg = {
    model: sessionStorage.getItem('model'),
    center: "ZDA",
    currentBranchId: sessionStorage.getItem('currentBranchId'),
    centerQueryAPI: sessionStorage.getItem('centerQueryAPI'),//集中
    branchSysAPI: sessionStorage.getItem('branchSysAPI'),//sys
    branchQueryAPI: sessionStorage.getItem('branchQueryAPI'),//分公司
}

sessionStorage.setItem('environment', 'test');//test,product,develop
const environment = sessionStorage.getItem('environment');
if (environment === 'test') {
    global.login = {
        api: 'http://10.3.2.21:20296/',
        environment: "test"
    }
}
else if (environment === 'product') {
    global.login = {
        api: 'http://10.3.4.233:20296/',
        environment: "product"
    }
}
else if (environment === 'develop') {
    //开发环境；
    global.login = {
        api: 'http://10.3.2.21:20296/',
        environment: "dev"
    }
    global.cfg = {
        model: "dev",
        center: "ZDA",
        currentBranchId: sessionStorage.getItem('currentBranchId'),
        branchSysAPI: 'http://10.3.2.21:20296/',//登录
        centerQueryAPI: 'http://10.3.4.177:9004/',//queryservice
        branchQueryAPI: 'http://10.3.4.177:9004/',//queryservice
    }
}