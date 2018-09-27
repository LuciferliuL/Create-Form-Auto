import { CURRENT_TAGS_UPDATA, SQL_DATA } from '../action/SliderCard.action'

const SData = [
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'edit', id: 8, type: 'INPUT', required: false,
        message: "123", label: "输入框", placeholder: "123", disabled: false,
        isTrueInLookUp: 0, defaultValue: '', typePoint: 'type',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'copyright', id: 8, type: 'RadioGroup', required: false,
        message: "123", label: "单选框组", disabled: false,
        GroupValue: [{ value: 'Apple', name: 'Apple' }, { value: 'Pear', name: 'Pear' }],
        groupname: 'cen',defaultValue: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 4, h: 1, key: '0',
        icons: 'border', id: 8, type: 'CheckBox', required: false,
        message: "123", label: "多选框", checked: false, disabled: false,
        defaultValue: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 16 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 8 } }
        }
    },
    // {
    //     GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
    //     icons: 'select', id: 8, type: 'Select', required: false,
    //     message: "123", label: "下拉框", disabled: false,
    //     GroupValue: [{ value: 'Apple', name: 'Apple' }, { value: 'Pear', name: 'Pear' }],
    //     layout: {
    //         labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
    //         wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
    //     }
    // },
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'calendar', id: 8, type: 'Date', required: false,
        message: "123", label: "日期选择", disabled: false, placeholder: "123",
        defaultValue: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 16, h: 1, key: '0',
        icons: 'contacts', id: 8, type: 'Range', required: false,
        message: "123", label: "时段选择", disabled: false,
        defaultValue: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 24, h: 8, key: '0', pageSize: 10, scroll: 180,
        icons: 'table', label: '简单表格', type: 'Table',
        SQL: 'select * where',groupname:'',
        columns: [
            {
                title: '姓名',
                dataIndex: 'name',
                width: '20%'
            }, {
                title: '年龄',
                dataIndex: 'age',
                width: '20%'
            }, {
                title: '住址',
                dataIndex: 'address',
                width: '20%'
            }],
        dataSource: []
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'diff', id: 8, type: 'LookUp', required: false,
        message: "123", label: "LookUp", disabled: false, upKey: '',
        show:false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0,  values: '', uniqueKey: 'key',
        columns: [
            {
                title: 'Date',
                dataIndex: 'date',
                width: '20%',
            }, {
                title: 'Amount',
                dataIndex: 'amount',
                width: '10%',
            }, {
                title: 'Type',
                dataIndex: 'type',
                width: '10%',
            }, {
                title: 'Note',
                dataIndex: 'note',
                width: '10%',
            }, {
                title: 'Action',
                dataIndex: 'action',
                width: '50%'
            }],
        SQL: 'select * where',
        dataSource: []
    }, {
        GridX: 0, GridY: 0, w: 24, h: 1, key: '0',
        icons: 'copy', id: 8, type: 'Group', label: "组别", orientation: 'left'
    }
    // , {
    //     GridX: 0, GridY: 0, w: 4, h: 1, key: '0',
    //     icons: 'key', id: 8, type: 'Switch', required: false,
    //     message: "123", label: "开关", checked: false, disabled: false,
    //     unCheckedChildren: 'NO', checkedChildren: 'YES',
    //     layout: {
    //         labelCol: { xs: { span: 24 }, sm: { span: 12 }, },
    //         wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
    //     }
    // }
]

export const SliderCardData = (state = SData, action) => {
    switch (action.type) {
        case 'DEV':
            return {
                ...state
            }

        default:
            return state;
    }
}

export const currentTagsUpdata = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_TAGS_UPDATA:
            return {
                ...state,
                InitialTags: action.InitialTags
            }

        default:
            return {}
    }
}

const SQL = [
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'gift', id: 8, type: 'LookUp', required: false,
        message: "123", label: "商品检索", disabled: false, upKey: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0,  values: '', uniqueKey: 'key',
        show:false,
        columns: [{
            title: "采购员ID",
            dataIndex: "purchaser",
        }, {
            title: "商品内码",
            dataIndex: "prodID",
        }, {
            title: "商品编码",
            dataIndex: "prodNO",
        }, {
            title: "商品名称",
            dataIndex: "prodNAME",
        }, {
            title: "包装单位",
            dataIndex: "PACKAGEUNIT",
        }, {
            title: "大包装数量",
            dataIndex: "BIGPACKAGEQUANTITY",
        }, {
            title: "中包装数量",
            dataIndex: "MIDPACKAGEQUANTITY",
        }, {
            title: "生产厂家全称",
            dataIndex: "MANUFACTURE",
        }, {
            title: "产地",
            dataIndex: "CHINESEDRUGYIELDLY",
        }, {
            title: "税率",
            dataIndex: "taxrate",
        }, {
            title: "商品助记码",
            dataIndex: "prodMEMORYCODE",
        }, {
            title: "供应商简码",
            dataIndex: "archiveno",
        }, {
            title: "商品规格",
            dataIndex: "PRODSPECIFICATION",
        }, {
            title: "商品剂型",
            dataIndex: "Proddosageformnotext",
        }, {
            title: "是否集采",
            dataIndex: "is_centralizedpurchasing",
        }, {
            title: "处方分类ID",
            dataIndex: "PrescriptionClass",
        }, {
            title: "零售价",
            dataIndex: "RetailPrice",
        }, {
            title: "最低售价",
            dataIndex: "MinSellPrice",
        }, {
            title: "厂家限价",
            dataIndex: "minsellpricelimit",
        }, {
            title: "基准指导价",
            dataIndex: "SELLGUIDPRICE",
        }, {
            title: "含税售价",
            dataIndex: "selltaxprice",
        }, {
            title: "业务类型名称",
            dataIndex: "busitypetext",
        }, {
            title: "采购员ID",
            dataIndex: "purchaseid",
        }, {
            title: "成本单价",
            dataIndex: "CostPrice",
        }, {
            title: "核算成本价",
            dataIndex: "costaccounting",
        }, {
            title: "是否活动",
            dataIndex: "is_active",
        }
        ],
        SQL: `select
        a.purchaser,
        a.prodID,a.prodNO,a.prodNAME,a.PACKAGEUNIT,a.BIGPACKAGEQUANTITY,a.MIDPACKAGEQUANTITY,a.MANUFACTURE,
        a.CHINESEDRUGYIELDLY,nvl(a.taxrate,0) taxrate,
        a.prodMEMORYCODE,a.archiveno,a.PRODSPECIFICATION,a.Proddosageformnotext,
        a.is_centralizedpurchasing,
        a.PrescriptionClass,nvl(b.RETAILPRICE,0) RetailPrice,
        nvl(b.wholesaleprice,0) TradePrice,
        nvl(b.minsellprice,0) MinSellPrice,
        nvl(b.minsellpricelimit,0) minsellpricelimit,
        nvl(b.SELLGUIDPRICE,0) SELLGUIDPRICE,
        nvl(b.SELLGUIDPRICE,0) selltaxprice,
        a.IS_UNPICK ISUNPICK,a.busitypetext,
        nvl(a.prodSCOPENO,'') PROSCOPENO,
        a.purchaseid,
        b.note As sellnote,e.invbalqty,
        nvl(e.costprice,0) CostPrice,nvl(e.costaccounting,0) costaccounting,a.storagecondition,
        a.is_active
        from vw_common_prod a
        left join TB_COMMON_PROCPRICE b on a.prodID=b.proID and a.branchid=b.branchid
        left join TB_GOS_ACCOUNT_O_BRANINVEN e on a.prodid=e.prodid and a.branchid=e.branchid
        where rownum<=500 and a.branchid=:currentBranchId
        and (a.is_active=01 or 01 is null)
        and (a.prodno like '%' ||Upper(:Abbr)|| '%'  or a.prodNAME like '%' || Upper(:Abbr) || '%'
                    Or a.prodMEMORYCODE like '%' ||Upper(:Abbr) || '%'
                    or a.manufacture like '%'||:Abbr||'%' or a.prodid=trim(:Abbr))
        and a.deleteflag=0`,
        dataSource: []
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'team', id: 8, type: 'LookUp', required: false,
        message: "123", label: "人员查询", disabled: false, upKey: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        show:false,
        columns: [{
            title: "主键",
            dataIndex: "PK",
        }, {
            title: "助记码",
            dataIndex: "ABBR",
        }, {
            title: "人员ID",
            dataIndex: "STAFFID",
        }, {
            title: "人员名称",
            dataIndex: "STAFFNAME",
        }, {
            title: "组织名称",
            dataIndex: "ORGNAME",
        }, {
            title: "组织结构内码",
            dataIndex: "ORGID",
        }, {
            title: "分公司ID",
            dataIndex: "BRANCHID",
        }
        ],
        SQL: `select d.pk,d.abbr,d.staffid,d.staffname,d.orgname,d.orgid,e.branchid,e.orgname branchname/*,f.userid*/ from
        (
        SELECT a.PK,a.abbr,a.staffid,a.staffname,c.orgname,c.orgid,c.orglevel,b.branchid,a.deleteflag FROM tb_sys_staff a
        INNER JOIN tb_sys_orgstaff b ON a.staffid=b.staffid  and a.deleteflag=0
        INNER JOIN tb_sys_organization c ON b.orgid=c.orgid AND c.isbranch=0
        where a.deleteflag=0 /*and nvl(a.isactive,0)=1*/
        )d inner join tb_sys_organization e on d.branchid=e.orgid
        left join tb_sys_user f on f.staffid=d.staffid and f.deleteflag=d.deleteflag
        where e.branchid =:currentBranchId and (upper(d.abbr) like ('%'||Upper(:Abbr)||'%')  or d.staffname like '%'||:Abbr||'%' or d.staffid like '%'|| :Abbr)`,
        dataSource: []
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'hdd', id: 8, type: 'LookUp', required: false,
        message: "123", label: "字典检索", disabled: false, upKey: '',
        show:false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        columns: [{
            title: "经销代销类型",
            dataIndex: "DICTITEMCODE",
        }, {
            title: "字典名称",
            dataIndex: "DICTITEMNAME",
        }, {
            title: "备注",
            dataIndex: "note",
        }
        ],
        SQL: `SELECT  dictitemcode ,trim(dictitemname) as dictitemname,note
        FROM tb_sys_dictitem
        WHERE
        --dictcode=:dicCode and
            deleteflag=0 and (branchid='ZDA' or branchid=:currentBranchId)
            and (dictitemname like :Abbr or
            lower(dictitemcode) like lower(:Abbr) or :Abbr is null or UPPER(memorycode) like UPPER(:Abbr))
        order by lineid`,
        dataSource: []
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'heat-map', id: 8, type: 'LookUp', required: false,
        message: "123", label: "客户检索", disabled: false, upKey: '',
        show:false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        columns: [{
            title: "子公司主管部门名称",
            dataIndex: "EXECUTIVEDEPT",
        }, {
            title: "助记码",
            dataIndex: "CUSTMEMORYCODE",
        }, {
            title: "质管备注",
            dataIndex: "QUALIFICATIONDEADLINE",
        }, {
            title: "客户类别ID",
            dataIndex: "CUSTTYPEID",
        }, {
            title: "客户内码",
            dataIndex: "CUSTID",
        }, {
            title: "客户编码",
            dataIndex: "CUSTNO",
        }, {
            title: "客户名称",
            dataIndex: "CUSTNAME",
        }, {
            title: "客户地址（注册地址）",
            dataIndex: "CUSTADD",
        }, {
            title: "客户标识",
            dataIndex: "CUSTIDENTIFY",
        }, {
            title: "联系人",
            dataIndex: "CONTACTPERSON",
        }, {
            title: "联系人电话",
            dataIndex: "CONTACTPHONE",
        }, {
            title: "责任业务员ID",
            dataIndex: "BUSINESSID",
        }, {
            title: "责任业务员",
            dataIndex: "BUSINESSMAN",
        }, {
            title: "不可经营类别",
            dataIndex: "NONBUSINESSTYPE",
        }, {
            title: "经营简码ID",
            dataIndex: "BUSINESSSCOPECODE",
        }, {
            title: "不可经营简码ID",
            dataIndex: "NONBUSINESSSCOPECODE",
        }, {
            title: "分销客户类型",
            dataIndex: "CUSTTYPE",
        }, {
            title: "是否转配送",
            dataIndex: "ISARTICULATED",
        }, {
            title: "责任开票员ID",
            dataIndex: "MAINOPID",
        }, {
            title: "责任开票员",
            dataIndex: "MAINOPNAME",
        }, {
            title: "采购员",
            dataIndex: "PURCHASER",
        }, {
            title: "采购员ID",
            dataIndex: "PURCHASERID",
        }, {
            title: "付款方式",
            dataIndex: "PAYMENTNAME",
        }, {
            title: "销售信贷期",
            dataIndex: "SALESCREDITTIME",
        }, {
            title: "是否可进货",
            dataIndex: "ISPURCHASING",
        }, {
            title: "关联关系ID",
            dataIndex: "RELATION",
        }, {
            title: "是否集采",
            dataIndex: "IS_CENTRALIZEDPURCHASING",
        }, {
            title: "是否可销售",
            dataIndex: "ISSALES",
        }, {
            title: "开发票要求",
            dataIndex: "BILLINGNOTE",
        }, {
            title: "责任开票员ID",
            dataIndex: "MAINOPID",
        }, {
            title: "主配送仓库ID",
            dataIndex: "STOREID",
        }, {
            title: "区域划分名称",
            dataIndex: "TERRITORIESTEXT",
        }, {
            title: "区域划分ID",
            dataIndex: "TERRITORIES",
        }, {
            title: "所属大区名称",
            dataIndex: "OWNERAREATEXT",
        }, {
            title: "大区经理ID",
            dataIndex: "AREAMGR",
        }, {
            title: "是否活动名称",
            dataIndex: "IS_ACTIVETEXT",
        }, {
            title: "开户银行帐号",
            dataIndex: "BANKACCOUNT",
        }, {
            title: "开户银行",
            dataIndex: "DEPOSITBANK",
        }, {
            title: "是否活动",
            dataIndex: "IS_ACTIVE",
        }, {
            title: "收货地址",
            dataIndex: "CONSIGNEE",
        }, {
            title: "收货人电话",
            dataIndex: "CONSIGNEEPHONE",
        }, {
            title: "仓库地址",
            dataIndex: "STOREADDR",
        }, {
            title: "客户简称",
            dataIndex: "CUSTABBREVIATION",
        }, {
            title: "客户业务类型ID(供、销)",
            dataIndex: "PARTNERTYPE",
        }, {
            title: "收货地址",
            dataIndex: "CONSIGNEEADD",
        }, {
            title: "是否管理合同",
            dataIndex: "IS_MANAGECONTRACT",
        }],
        SQL: `
        select f.executivedept,
                  f.custmemorycode,
                  f.qualificationdeadline,
                  f.custtypeid,
                  f.custid,
                  f.custno,
               f.custname,
               f.custadd,
               f.custidentify,
               f.CONTACTPERSON,
               f.CONTACTPHONE,
               f.BUSINESSID,
               f.BUSINESSMAN,
               f.nonbusinesstype,
               f.businessscopecode,
               f.nonbusinessscopecode,
               f.CUSTTYPE,
               f.ISARTICULATED,
               f.MAINOPID,
               f.MAINOPNAME,
               f.purchaser,
               f.purchaserid,
               f.paymentname,
               f.salescreditvolume,
               f.salescredittime,
               nvl(f.ISPURCHASING, 0) ISPURCHASING,
               decode(f.ISPURCHASING, 1, '是', '否') IsPurchasingText,
               f.relation,
               f.is_centralizedpurchasing,
               case
                 when f.issales = 0 then
                  '否'
                 else
                  '是'
               end issales,
               f.billingnote,
               nvl(f.mainstoreid, '') storeid,
               nvl(f.mainstorename, '') storename,
               f.territoriestext,
               f.territories,
               f.ownerareatext,
               f.AREAMGR,
               f.is_activetext,
               f.bankaccount,
               f.depositbank,
               f.is_active,
               f.consignee,
               f.consigneephone,
               f.storeaddr,
               f.custabbreviation,
               f.is_activetext ISACTIVETEXT,
               f.partnertype,
               f.CONSIGNEEADD,
               nvl(f.is_managecontract, 0) is_managecontract,
               (select accountreceivable
                  From tb_gos_account_o_customer a
                 where a.customerid = f.custid
                   and a.branchid = f.branchid) accountreceivable
        from vw_common_cust f
        where   f.branchid=:currentBranchId
        and (f.is_active='01' or '01' is null)
        and (0 in(0,1,2)
          or (0=100 and f.custtypeid=7/*生产企业*/  )
          or (0=101 and f.custtypeid=7/*生产企业*/ )
          or (0=200 and is_activetext='潜'/*潜在客户*/ )
          or (0=201 and is_activetext='潜'/*潜在客户*/ )
          or (nvl(0, ' ') = ' ')
        ) and f.deleteflag = 0 and rownum<=500
          and (f.custno like upper('%' || :Abbr || '%') or
                f.custid = upper(:Abbr)  or f.custname like '%' || :Abbr || '%' or
                f.custmemorycode like upper('%' || :Abbr || '%') or
                f.custidentify like upper('%' || :Abbr || '%'))
        `,
        dataSource: []
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'rise', id: 8, type: 'LookUp', required: false,
        message: "123", label: "上游客户检索", disabled: false, upKey: '',
        show:false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0,  values: '', uniqueKey: 'key',
        columns: [{
            title: "子公司主管部门名称",
            dataIndex: "EXECUTIVEDEPT",
        }, {
            title: "助记码",
            dataIndex: "CUSTMEMORYCODE",
        }, {
            title: "质管备注",
            dataIndex: "QUALIFICATIONDEADLINE",
        }, {
            title: "客户类别ID",
            dataIndex: "CUSTTYPEID",
        }, {
            title: "客户内码",
            dataIndex: "CUSTID",
        }, {
            title: "客户编码",
            dataIndex: "CUSTNO",
        }, {
            title: "客户名称",
            dataIndex: "CUSTNAME",
        }, {
            title: "客户地址（注册地址）",
            dataIndex: "CUSTADD",
        }, {
            title: "客户标识",
            dataIndex: "CUSTIDENTIFY",
        }, {
            title: "联系人",
            dataIndex: "CONTACTPERSON",
        }, {
            title: "联系人电话",
            dataIndex: "CONTACTPHONE",
        }, {
            title: "责任业务员ID",
            dataIndex: "BUSINESSID",
        }, {
            title: "责任业务员",
            dataIndex: "BUSINESSMAN",
        }, {
            title: "不可经营类别",
            dataIndex: "NONBUSINESSTYPE",
        }, {
            title: "经营简码ID",
            dataIndex: "BUSINESSSCOPECODE",
        }, {
            title: "不可经营简码ID",
            dataIndex: "NONBUSINESSSCOPECODE",
        }, {
            title: "分销客户类型",
            dataIndex: "CUSTTYPE",
        }, {
            title: "是否转配送",
            dataIndex: "ISARTICULATED",
        }, {
            title: "责任开票员ID",
            dataIndex: "MAINOPID",
        }, {
            title: "责任开票员",
            dataIndex: "MAINOPNAME",
        }, {
            title: "采购员",
            dataIndex: "PURCHASER",
        }, {
            title: "采购员ID",
            dataIndex: "PURCHASERID",
        }, {
            title: "付款方式",
            dataIndex: "PAYMENTNAME",
        }, {
            title: "销售信贷期",
            dataIndex: "SALESCREDITTIME",
        }, {
            title: "是否可进货",
            dataIndex: "ISPURCHASING",
        }, {
            title: "关联关系ID",
            dataIndex: "RELATION",
        }, {
            title: "是否集采",
            dataIndex: "IS_CENTRALIZEDPURCHASING",
        }, {
            title: "是否可销售",
            dataIndex: "ISSALES",
        }, {
            title: "开发票要求",
            dataIndex: "BILLINGNOTE",
        }, {
            title: "责任开票员ID",
            dataIndex: "MAINOPID",
        }, {
            title: "主配送仓库ID",
            dataIndex: "STOREID",
        }, {
            title: "区域划分名称",
            dataIndex: "TERRITORIESTEXT",
        }, {
            title: "区域划分ID",
            dataIndex: "TERRITORIES",
        }, {
            title: "所属大区名称",
            dataIndex: "OWNERAREATEXT",
        }, {
            title: "大区经理ID",
            dataIndex: "AREAMGR",
        }, {
            title: "是否活动名称",
            dataIndex: "IS_ACTIVETEXT",
        }, {
            title: "开户银行帐号",
            dataIndex: "BANKACCOUNT",
        }, {
            title: "开户银行",
            dataIndex: "DEPOSITBANK",
        }, {
            title: "是否活动",
            dataIndex: "IS_ACTIVE",
        }, {
            title: "收货地址",
            dataIndex: "CONSIGNEE",
        }, {
            title: "收货人电话",
            dataIndex: "CONSIGNEEPHONE",
        }, {
            title: "仓库地址",
            dataIndex: "STOREADDR",
        }, {
            title: "客户简称",
            dataIndex: "CUSTABBREVIATION",
        }, {
            title: "客户业务类型ID(供、销)",
            dataIndex: "PARTNERTYPE",
        }, {
            title: "收货地址",
            dataIndex: "CONSIGNEEADD",
        }, {
            title: "是否管理合同",
            dataIndex: "IS_MANAGECONTRACT",
        }
        ],
        SQL: `select f.executivedept,
        f.custmemorycode,
        f.qualificationdeadline,
        f.custtypeid,
        f.custid,
        f.custno,
     f.custname,
     f.custadd,
     f.custidentify,
     f.CONTACTPERSON,
     f.CONTACTPHONE,
     f.BUSINESSID,
     f.BUSINESSMAN,
     f.nonbusinesstype,
     f.businessscopecode,
     f.nonbusinessscopecode,
     f.CUSTTYPE,
     f.ISARTICULATED,
     f.MAINOPID,
     f.MAINOPNAME,
     f.purchaser,
     f.purchaserid,
     f.paymentname,
     f.salescreditvolume,
     f.salescredittime,
     nvl(f.ISPURCHASING, 0) ISPURCHASING,
     decode(f.ISPURCHASING, 1, '是', '否') IsPurchasingText,
     f.relation,
     f.is_centralizedpurchasing,
     case
       when f.issales = 0 then
        '否'
       else
        '是'
     end issales,
     f.billingnote,
     nvl(f.mainstoreid, '') storeid,
     nvl(f.mainstorename, '') storename,
     f.territoriestext,
     f.territories,
     f.ownerareatext,
     f.AREAMGR,
     f.is_activetext,
     f.bankaccount,
     f.depositbank,
     f.is_active,
     f.consignee,
     f.consigneephone,
     f.storeaddr,
     f.custabbreviation,
     f.is_activetext ISACTIVETEXT,
     f.partnertype,
     f.CONSIGNEEADD,
     nvl(f.is_managecontract, 0) is_managecontract,
     (select accountreceivable
        From tb_gos_account_o_customer a
       where a.customerid = f.custid
         and a.branchid = f.branchid) accountreceivable
from vw_common_cust f
where   f.branchid=:currentBranchId
and  (f.partnertypeid='1')
and (f.is_active='01' or '01' is null)
and (0 in(0,1,2)
or (0=100 and f.custtypeid=7/*生产企业*/  )
or (0=101 and f.custtypeid=7/*生产企业*/ )
or (0=200 and is_activetext='潜'/*潜在客户*/ )
or (0=201 and is_activetext='潜'/*潜在客户*/ )
or (nvl(0, ' ') = ' ')
) and f.deleteflag = 0 and rownum<=500
and (f.custno like upper('%' || :Abbr || '%') or
      f.custid = upper(:Abbr)  or f.custname like '%' || :Abbr || '%' or
      f.custmemorycode like upper('%' || :Abbr || '%') or
      f.custidentify like upper('%' || :Abbr || '%'))`,
        dataSource: []
    }]

export const SQL_Data = (state = SQL, action) => {
    switch (action.type) {
        case SQL_DATA:
            return {
                ...state,
                SQL: action.SQL
            }


        default:
            return state
    }
}