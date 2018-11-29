Fetch(Common.WebApiHost["Query"]+ Api.QueryBySqlName, {
    "SqlName": "SQL_I9_Billing","IsPaged": false,
    "ParamList": [
    { "ParamName": "BranchID","ParamType": "String","ParamValue": Common.BranchId},
    {"ParamName": "staffid","ParamType": "String","ParamValue": Common.StaffId},
    {"ParamName": "custid","ParamType": "String","ParamValue": this.refs.Modal.value["custid"]},
    {"ParamName": "begindate","ParamType": "DateTime", "ParamValue":this.refs.Modal.value["begindate"]},
    {"ParamName": "enddate","ParamType": "DateTime","ParamValue":this.refs.Modal.value["enddate"]},
    {"ParamName": "state_1","ParamType": "String","ParamValue":this.refs.Modal.value["state_1"]},
    {"ParamName": "state_2","ParamType": "String","ParamValue":this.refs.Modal.value["state_2"]},
    {"ParamName": "state_4", "ParamType": "String","ParamValue":this.refs.Modal.value["state_4"]},
    {"ParamName": "bussinesstype","ParamType": "String","ParamValue":this.refs.Modal.value["bussinesstype"]},
    {"ParamName": "isallcust", "ParamType": "String","ParamValue": Common.IsAllCust}
   ]
   this.data=[ 
    { title:"客户信息",show:true,control:
    [{id:"custid",type:"lookup",isObj:false,data:{name:"客户",value:"",key:"",obj:{}}}
    ]},
    { title:"时间",show:true,control:
    [{id:"begindate",type:"date",data:{name:"开始时间",value:Common.getday(1)}},{id:"enddate",type:"date",data:{name:"结束时间",value:Common.getday(0)}},
    ]},   
    { title:"业务类型",show:true,control:
    [{id:"bussinesstype",isObj:false,type:"radio",default:"",data:[ ]}
    ]},
    { title:"单据类型",show:true,control:
    [{id:"state_1",type:"select",data:{name:"开票",value:"1",default:"0",selected:true}},
     {id:"state_2",type:"select",data:{name:"退回",value:"2",default:"0",selected:true}},
     {id:"state_4",type:"select",data:{name:"退补价",value:"4",default:"0",selected:true}}
    ]},
    { title:"统计信息",show:true,control:
    [
    {id:"AMOUNT",type:"label",data:{name:"总金额",value:"0"}},
    {id:"NUMBEROFPACKAGES",type:"label",data:{name:"件数",value:"0"}},
    {id:"GROSSPROFIT",type:"label",data:{name:"财务毛利",value:"0"}},    
    ]}
 ]

 this.data=[ 
    { title:"客户信息",show:true,control:
    [{id:"custid",type:"lookup",isObj:false,data:{name:"客户",value:"",key:"",obj:{}}}
    ]},
    { title:"时间",show:true,control:
    [{id:"begindate",type:"date",data:{name:"开始时间",value:Common.getday(1)}},{id:"enddate",type:"date",data:{name:"结束时间",value:Common.getday(0)}},
    ]},   
    { title:"业务类型",show:true,control:
    [{id:"bussinesstype",isObj:false,type:"radio",default:"",data:[ ]}
    ]},
    { title:"单据类型",show:true,control:
    [{id:"state_1",type:"select",data:{name:"开票",value:"1",default:"0",selected:true}},
     {id:"state_2",type:"select",data:{name:"退回",value:"2",default:"0",selected:true}},
     {id:"state_4",type:"select",data:{name:"退补价",value:"4",default:"0",selected:true}}
    ]},
    { title:"统计信息",show:true,control:
    [
    {id:"AMOUNT",type:"label",data:{name:"总金额",value:"0"}},
    {id:"NUMBEROFPACKAGES",type:"label",data:{name:"件数",value:"0"}},
    {id:"GROSSPROFIT",type:"label",data:{name:"财务毛利",value:"0"}},    
    ]}
 ]

陶松 2018/11/27 16:14:02
Fetch(Common.WebApiHost["Query"]+ Api.QueryBySqlName, {
    "SqlName": "SQL_I9_Billing","IsPaged": false,
    "ParamList": [
    { "ParamName": "BranchID","ParamType": "String","ParamValue": Common.BranchId},
    {"ParamName": "staffid","ParamType": "String","ParamValue": Common.StaffId},
    {"ParamName": "custid","ParamType": "String","ParamValue": this.refs.Modal.value["custid"]},
    {"ParamName": "begindate","ParamType": "DateTime", "ParamValue":this.refs.Modal.value["begindate"]},
    {"ParamName": "enddate","ParamType": "DateTime","ParamValue":this.refs.Modal.value["enddate"]},
    {"ParamName": "state_1","ParamType": "String","ParamValue":this.refs.Modal.value["state_1"]},
    {"ParamName": "state_2","ParamType": "String","ParamValue":this.refs.Modal.value["state_2"]},
    {"ParamName": "state_4", "ParamType": "String","ParamValue":this.refs.Modal.value["state_4"]},
    {"ParamName": "bussinesstype","ParamType": "String","ParamValue":this.refs.Modal.value["bussinesstype"]},
    {"ParamName": "isallcust", "ParamType": "String","ParamValue": Common.IsAllCust}
   ]
16:20:33
陶松 2018/11/27 16:20:33
SQL_I9_GetBusiType

陶松 2018/11/27 16:20:47
NAME

陶松 2018/11/27 16:20:51
VALUE
16:23:28
陶松 2018/11/27 16:23:28
<View style={styles.item}> 
        <View style={[styles.itemview]}>   
        <Text style={[styles.itemtext,styles.red]}><Text style={styles.itemtitle} >单据: </Text> {this.props.BILLTYPENAME} </Text>
        </View>

        <View style={[styles.itemview,{width:'50%'}]}> 
        <Text  style={[styles.itemtext,styles.red]}><Text style={styles.itemtitle} >日期:  </Text>{this.props.BILLINGDATE} </Text>
        </View>   

         <View style={[styles.itemview]}>   
             <Text  style={[styles.itemtext]}><Text style={styles.itemtitle} >状态:  </Text> {this.props.BILLSTATE}</Text>
        </View>  

         <View style={[styles.itemview]}>  
        <Text  style={[styles.itemtext]}><Text style={styles.itemtitle} >分类:  </Text> {this.props.BUSSINESSTYPENAME}</Text>
        </View>  

        <View style={styles.itemview}> 
        <Text  style={[styles.itemtext]}><Text style={styles.itemtitle} >客户编码:  </Text> {this.props.CUSTNO} </Text>
        </View>

        <View style={styles.itemview}> 
        <Text  style={[styles.itemtext]}><Text style={styles.itemtitle} >单据编号:  </Text> {this.props.BILLID} </Text>
        </View>


        <View style={[styles.itemview,{width:'100%'}]}> 
        <Text  style={[styles.itemtext,styles.red]}><Text style={styles.itemtitle} >单位名称:  </Text> {this.props.CUSTNAME}</Text>
        </View>   

        <View style={styles.itemview}> 
        <Text  style={[styles.itemtext,styles.red]}><Text style={styles.itemtitle} >金额:  </Text> {this.props.AMOUNT}</Text>
        </View>   

        <View style={styles.itemview}> 
        <Text  style={[styles.itemtext,styles.red]}><Text style={styles.itemtitle} >毛利:  </Text> {this.props.GROSSPROFIT} </Text>
        </View>

        <View style={styles.itemview}> 
        <Text  style={[styles.itemtext,styles.red]}><Text style={styles.itemtitle} >件数:  </Text> {this.props.NUMBEROFPACKAGES} </Text>
        </View>
    </View>
    </TouchableOpacity>
  </View>



  {id:"check",type:"check",paramtype:"String",sqlname:"",
  selectname:"",selectvalue:"",isObj:false,default:"0",
  data:[
        {name:"全部",value:"1",obj:{name:"1"},selected:true},
        {name:"消费品",value:"2",obj:{name:"2"}},
        {name:"可混开",value:"3",obj:{name:"3"}},
     ]}
