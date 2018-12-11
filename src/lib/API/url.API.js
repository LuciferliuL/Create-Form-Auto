//默认
global.cfg = {
    model: sessionStorage.getItem('model'),
    center: "ZDA",
    currentBranchId: sessionStorage.getItem('currentBranchId'),
    centerQueryAPI: sessionStorage.getItem('centerQueryAPI'),//集中
    branchSysAPI: sessionStorage.getItem('branchSysAPI'),//sys
    branchQueryAPI: sessionStorage.getItem('branchQueryAPI'),//分公司
}

//i9消息发送配置；
global.msgcfg = {
    eId: "8070424",//eid
    esecret: "ArqyyWkxcIl3jmXcUXwmxTqvtetoZvgG",//通讯录密钥
    AppId: "500068278",
    appSecret: "3n1toHGU5409tfuCPVHe",//app密钥
    pub: "XT-4ab2b772-1947-4d23-800f-9ffa29e1ee49",
    pubsercet: "6387b41720c244e2d013ae0f0f3d579d",
    corntemplateid: "I9MessageSendcron",
    autotemplateid: "I9MessageSendhw",
    filepath: "C:\\Program Files (x86)\\JZTERP\\QueryService\\design",//excel保存路径
    fileurl: "http://10.3.2.21:9003/"//excel保存站点
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
    global.msgcfg = {
        eId: "12400638",//
        esecret: "fdphO8ouKda8zlx7UFhjj6GUqRJSlLAU",
        AppId: "500040363",
        appSecret: "erp",//
        pub: "XT-abd10904-f8d6-47cc-8be1-32c1cb18a229",
        pubsercet: "11a8551ab4d10bf786faba3740934a89",
        corntemplateid: "I9MessageSendcron",
        autotemplateid: "I9MessageSendhw",
        filepath: "C:\\Program Files (x86)\\JZTERP\\CenterQuerybuild",//design路径
        fileurl: "http://10.3.4.233:9003/"//design站点
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
        branchSysAPI: 'http://10.3.4.177:20296/',//分公司登录
        //centerQueryAPI: 'http://10.3.4.177:9004/',//queryservice
        //branchQueryAPI: 'http://10.3.4.177:9004/',//queryservice
        centerQueryAPI: 'http://10.2.132.215:7000/',//queryservice
        branchQueryAPI: 'http://10.2.132.215:7000/',//queryservice
    }

    global.msgcfg.filepath = "E:\\mui\\ngsearch";
    global.msgcfg.fileurl = "http://10.2.132.215:7001/";
}