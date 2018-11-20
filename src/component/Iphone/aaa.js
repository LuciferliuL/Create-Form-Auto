export default [ 
    { title:"客户信息",show:true,control:
    [{id:"look",type:"lookup",mode:"cust",isObj:false,paramtype:"String",data:{name:"客户",value:"",key:"",obj:{}}} //mode:cust 弹窗种类 isObj 是否返回对象
    ]},
    { title:"测试输入框",show:true,control:
    [{id:"test",type:"input",mode:"number",paramtype:"String",data:{name:"测试输入",value:""}} //mode:number,money,default
    ]},
    { title:"时间",show:true,control:
    [{id:"begindate",type:"date",paramtype:"String",data:{name:"开始时间",value:Common.getday(1)}},{id:"enddate",type:"date",data:{name:"结束时间",value:Common.getday(0)}},
    ]},   
    { title:"业务类型",show:true,control:
    [{id:"bussinesstype",type:"radio",paramtype:"String",sqlname:"",selectname:"",selectvalue:"",isObj:false,default:"0",data:[
        {name:"全部",value:"1",obj:{},selected:true},
        {name:"消费品",value:"2",obj:{}},
        {name:"可混开",value:"3",obj:{}},
        {name:"计生",value:"4",obj:{}},
        {name:"基药",value:"5",obj:{}},
        {name:"器械",value:"6",obj:{}},
        {name:"西药",value:"7",obj:{}},
        {name:"原料药",value:"8",obj:{}},
        {name:"中药",value:"9",obj:{}},
        {name:"食品",value:"10",obj:{}},
        {name:"保健食品",value:"11",obj:{}},
       ]}

    ]},
    { title:"单据类型",show:true,control:
    [{id:"state_1",type:"select",paramtype:"String",data:{name:"开票",value:"1",default:"0",selected:true}},
     {id:"state_2",type:"select",paramtype:"String",data:{name:"退回",value:"2",default:"0",selected:true}},
     {id:"state_4",type:"select",paramtype:"String",data:{name:"退补价",value:"4",default:"0",selected:true}}
    ]}
]