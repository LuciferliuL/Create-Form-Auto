export default [ 
    { title:"客户信息",show:true,control:
    [{id:"look",type:"lookup",data:{name:"客户",value:"",key:""}}
    ]},
    { title:"测试输入框",show:true,control:
    [{id:"test",type:"input",mode:"number",data:{name:"测试输入",value:""}} //mode:number,money
    ]},
    { title:"时间",show:true,control:
    [{id:"begindate",type:"date",data:{name:"开始时间",value:Common.getday(1)}},{id:"enddate",type:"date",data:{name:"结束时间",value:Common.getday(0)}},
    ]},   
    { title:"业务类型",show:true,control:
    [{id:"bussinesstype",type:"radio",default:"0",data:[
        {name:"全部",value:"1",selected:true},
        {name:"消费品",value:"2"},
        {name:"可混开",value:"3"},
        {name:"计生",value:"4"},
        {name:"基药",value:"5"},
        {name:"器械",value:"6"},
        {name:"西药",value:"7"},
        {name:"原料药",value:"8"},
        {name:"中药",value:"9"},
        {name:"食品",value:"10"},
        {name:"保健食品",value:"11"},
       ]}

    ]},
    { title:"单据类型",show:true,control:
    [{id:"state_1",type:"select",data:{name:"开票",value:"1",default:"0",selected:true}},
     {id:"state_2",type:"select",data:{name:"退回",value:"2",default:"0",selected:true}},
     {id:"state_4",type:"select",data:{name:"退补价",value:"4",default:"0",selected:true}}
    ]}
]