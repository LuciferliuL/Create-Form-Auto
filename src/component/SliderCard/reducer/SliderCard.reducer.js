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
        GridX: 0, GridY: 0, w: 24, h: 8, key: '0', pageSize: 200, scroll: 1200,
        icons: 'table', label: '简单表格', type: 'Table',
        SQL: 'select * where',groupname:'',
        columns: [
            {
                title: '姓名',
                data: 'name',
                width: '120px'
            }, {
                title: '年龄',
                data: 'age',
                width: '120px'
            }, {
                title: '住址',
                data: 'address',
                width: '120px'
            }],
        dataSource: []
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'diff', id: 8, type: 'LookUp', required: false,
        message: "123", label: "LookUp", disabled: false, upKey: '',
        show:false,scroll: 1200,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0,  values: '', uniqueKey: 'key',
        columns: [
            {
                title: 'Date',
                data: 'date',
                width: '20%',
            }, {
                title: 'Amount',
                data: 'amount',
                width: '10%',
            }, {
                title: 'Type',
                data: 'type',
                width: '10%',
            }, {
                title: 'Note',
                data: 'note',
                width: '10%',
            }, {
                title: 'Action',
                data: 'action',
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
        }, tr: 0,  values: '', uniqueKey: 'key',scroll: 1200,
        show:false,
        columns: [{
            title: "采购员ID",
            data: "PURCHASER",
            width: '200',
        }, {
            title: "商品内码",
            data: "PRODID",
            width: '200',
        }, {
            title: "商品编码",
            data: "PRODNO",
            width: '200',
        }, {
            title: "商品名称",
            data: "PRODNAME",
            width: '200',
        }, {
            title: "包装单位",
            data: "PACKAGEUNIT",
            width: '200',
        }, {
            title: "大包装数量",
            data: "BIGPACKAGEQUANTITY",
            width: '200',
        }, {
            title: "中包装数量",
            data: "MIDPACKAGEQUANTITY",
            width: '200',
        }, {
            title: "生产厂家全称",
            data: "MANUFACTURE",
            width: '200',
        }, {
            title: "产地",
            data: "CHINESEDRUGYIELDLY",
            width: '200',
        }, {
            title: "税率",
            data: "TAXRATE",
            width: '200',
        }, {
            title: "商品助记码",
            data: "PRODMEMORYCODE",
            width: '200',
        }, {
            title: "供应商简码",
            data: "ARCHIVENO",
            width: '200',
        }, {
            title: "商品规格",
            data: "PRODSPECIFICATION",
            width: '200',
        }, {
            title: "商品剂型",
            data: "PRODDOSAGEFORMNOTEXT",
            width: '200',
        }, {
            title: "是否集采",
            data: "IS_CENTRALIZEDPURCHASING",
            width: '200',
        }, {
            title: "处方分类ID",
            data: "PRESCRIPTIONCLASS",
            width: '200',
        }, {
            title: "零售价",
            data: "RETAILPRICE",
            width: '200',
        }, {
            title: "最低售价",
            data: "MINSELLPRICE",
            width: '200',
        }, {
            title: "厂家限价",
            data: "MINSELLPRICELIMIT",
            width: '200',
        }, {
            title: "基准指导价",
            data: "SELLGUIDPRICE",
            width: '200',
        }, {
            title: "含税售价",
            data: "SELLTAXPRICE",
            width: '200',
        }, {
            title: "业务类型名称",
            data: "BUSITYPETEXT",
            width: '200',
        }, {
            title: "采购员ID",
            data: "PURCHASEID",
            width: '200',
        }, {
            title: "成本单价",
            data: "COSTPRICE",
            width: '200',
        }, {
            title: "核算成本价",
            data: "COSTACCOUNTING",
            width: '200',
        }, {
            title: "是否活动",
            data: "IS_ACTIVE",
            width: '200',
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
        message: "123", label: "人员查询", disabled: false, upKey: '',scroll: 1200,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        show:false,
        columns: [{
            title: "主键",
            data: "PK",
            width: '200',
        }, {
            title: "助记码",
            data: "ABBR",
            width: '200',
        }, {
            title: "人员ID",
            data: "STAFFID",
            width: '200',
        }, {
            title: "人员名称",
            data: "STAFFNAME",
            width: '200',
        }, {
            title: "组织名称",
            data: "ORGNAME",
            width: '200',
        }, {
            title: "组织结构内码",
            width: '200',
            data: "ORGID",
        }, {
            title: "分公司ID",
            data: "BRANCHID",
            width: '200',
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
        message: "123", label: "字典检索", disabled: false, upKey: '',scroll: 1200,
        show:false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        columns: [{
            title: "经销代销类型",
            data: "DICTITEMCODE",
            width: '200',
        }, {
            title: "字典名称",
            data: "DICTITEMNAME",
            width: '200',
        }, {
            title: "备注",
            data: "note",
            width: '200',
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
        show:false,scroll: 1200,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        columns: [{
            title: "子公司主管部门名称",
            data: "EXECUTIVEDEPT",
            width: '200',
        }, {
            title: "助记码",
            data: "CUSTMEMORYCODE",
            width: '200',
        }, {
            title: "质管备注",
            data: "QUALIFICATIONDEADLINE",
            width: '200',
        }, {
            title: "客户类别ID",
            data: "CUSTTYPEID",
            width: '200',
        }, {
            title: "客户内码",
            data: "CUSTID",
            width: '200',
        }, {
            title: "客户编码",
            data: "CUSTNO",
            width: '200',
        }, {
            title: "客户名称",
            data: "CUSTNAME",
            width: '200',
        }, {
            title: "客户地址（注册地址）",
            data: "CUSTADD",
            width: '200',
        }, {
            title: "客户标识",
            data: "CUSTIDENTIFY",
            width: '200',
        }, {
            title: "联系人",
            data: "CONTACTPERSON",
            width: '200',
        }, {
            title: "联系人电话",
            data: "CONTACTPHONE",
            width: '200',
        }, {
            title: "责任业务员ID",
            data: "BUSINESSID",
            width: '200',
        }, {
            title: "责任业务员",
            data: "BUSINESSMAN",
            width: '200',
        }, {
            title: "不可经营类别",
            data: "NONBUSINESSTYPE",
            width: '200',
        }, {
            title: "经营简码ID",
            data: "BUSINESSSCOPECODE",
            width: '200',
        }, {
            title: "不可经营简码ID",
            data: "NONBUSINESSSCOPECODE",
            width: '200',
        }, {
            title: "分销客户类型",
            data: "CUSTTYPE",
            width: '200',
        }, {
            title: "是否转配送",
            data: "ISARTICULATED",
            width: '200',
        }, {
            title: "责任开票员ID",
            data: "MAINOPID",
            width: '200',
        }, {
            title: "责任开票员",
            data: "MAINOPNAME",
            width: '200',
        }, {
            title: "采购员",
            data: "PURCHASER",
            width: '200',
        }, {
            title: "采购员ID",
            data: "PURCHASERID",
            width: '200',
        }, {
            title: "付款方式",
            data: "PAYMENTNAME",
            width: '200',
        }, {
            title: "销售信贷期",
            data: "SALESCREDITTIME",
            width: '200',
        }, {
            title: "是否可进货",
            data: "ISPURCHASING",
            width: '200',
        }, {
            title: "关联关系ID",
            data: "RELATION",
            width: '200',
        }, {
            title: "是否集采",
            data: "IS_CENTRALIZEDPURCHASING",
            width: '200',
        }, {
            title: "是否可销售",
            data: "ISSALES",
            width: '200',
        }, {
            title: "开发票要求",
            data: "BILLINGNOTE",
            width: '200',
        }, {
            title: "责任开票员ID",
            data: "MAINOPID",
            width: '200',
        }, {
            title: "主配送仓库ID",
            data: "STOREID",
            width: '200',
        }, {
            title: "区域划分名称",
            data: "TERRITORIESTEXT",
            width: '200',
        }, {
            title: "区域划分ID",
            data: "TERRITORIES",
            width: '200',
        }, {
            title: "所属大区名称",
            data: "OWNERAREATEXT",
            width: '200',
        }, {
            title: "大区经理ID",
            data: "AREAMGR",
            width: '200',
        }, {
            title: "是否活动名称",
            data: "IS_ACTIVETEXT",
            width: '200',
        }, {
            title: "开户银行帐号",
            data: "BANKACCOUNT",
            width: '200',
        }, {
            title: "开户银行",
            data: "DEPOSITBANK",
            width: '200',
        }, {
            title: "是否活动",
            data: "IS_ACTIVE",
            width: '200',
        }, {
            title: "收货地址",
            data: "CONSIGNEE",
            width: '200',
        }, {
            title: "收货人电话",
            data: "CONSIGNEEPHONE",
            width: '200',
        }, {
            title: "仓库地址",
            data: "STOREADDR",
            width: '200',
        }, {
            title: "客户简称",
            data: "CUSTABBREVIATION",
            width: '200',
        }, {
            title: "客户业务类型ID(供、销)",
            data: "PARTNERTYPE",
            width: '200',
        }, {
            title: "收货地址",
            data: "CONSIGNEEADD",
            width: '200',
        }, {
            title: "是否管理合同",
            data: "IS_MANAGECONTRACT",
            width: '200',
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
          or (0=200 and f.custtypeid=7/*生产企业*/  )
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
        message: "123", label: "上游客户检索", disabled: false, upKey: '',scroll: 1200,
        show:false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0,  values: '', uniqueKey: 'key',
        columns: [{
            title: "子公司主管部门名称",
            data: "EXECUTIVEDEPT",
            width: '200',
        }, {
            title: "助记码",
            data: "CUSTMEMORYCODE",
            width: '200',
        }, {
            title: "质管备注",
            data: "QUALIFICATIONDEADLINE",
            width: '200',
        }, {
            title: "客户类别ID",
            data: "CUSTTYPEID",
            width: '200',
        }, {
            title: "客户内码",
            data: "CUSTID",
            width: '200',
        }, {
            title: "客户编码",
            data: "CUSTNO",
            width: '200',
        }, {
            title: "客户名称",
            data: "CUSTNAME",
            width: '200',
        }, {
            title: "客户地址（注册地址）",
            data: "CUSTADD",
            width: '200',
        }, {
            title: "客户标识",
            data: "CUSTIDENTIFY",
            width: '200',
        }, {
            title: "联系人",
            data: "CONTACTPERSON",
            width: '200',
        }, {
            title: "联系人电话",
            data: "CONTACTPHONE",
            width: '200',
        }, {
            title: "责任业务员ID",
            data: "BUSINESSID",
            width: '200',
        }, {
            title: "责任业务员",
            data: "BUSINESSMAN",
            width: '200',
        }, {
            title: "不可经营类别",
            data: "NONBUSINESSTYPE",
            width: '200',
        }, {
            title: "经营简码ID",
            data: "BUSINESSSCOPECODE",
            width: '200',
        }, {
            title: "不可经营简码ID",
            data: "NONBUSINESSSCOPECODE",
            width: '200',
        }, {
            title: "分销客户类型",
            data: "CUSTTYPE",
            width: '200',
        }, {
            title: "是否转配送",
            data: "ISARTICULATED",
            width: '200',
        }, {
            title: "责任开票员ID",
            data: "MAINOPID",
            width: '200',
        }, {
            title: "责任开票员",
            data: "MAINOPNAME",
            width: '200',
        }, {
            title: "采购员",
            data: "PURCHASER",
            width: '200',
        }, {
            title: "采购员ID",
            data: "PURCHASERID",
            width: '200',
        }, {
            title: "付款方式",
            data: "PAYMENTNAME",
            width: '200',
        }, {
            title: "销售信贷期",
            data: "SALESCREDITTIME",
            width: '200',
        }, {
            title: "是否可进货",
            data: "ISPURCHASING",
            width: '200',
        }, {
            title: "关联关系ID",
            data: "RELATION",
            width: '200',
        }, {
            title: "是否集采",
            data: "IS_CENTRALIZEDPURCHASING",
            width: '200',
        }, {
            title: "是否可销售",
            data: "ISSALES",
            width: '200',
        }, {
            title: "开发票要求",
            data: "BILLINGNOTE",
            width: '200',
        }, {
            title: "责任开票员ID",
            data: "MAINOPID",
            width: '200',
        }, {
            title: "主配送仓库ID",
            data: "STOREID",
            width: '200',
        }, {
            title: "区域划分名称",
            data: "TERRITORIESTEXT",
            width: '200',
        }, {
            title: "区域划分ID",
            data: "TERRITORIES",
            width: '200',
        }, {
            title: "所属大区名称",
            data: "OWNERAREATEXT",
            width: '200',
        }, {
            title: "大区经理ID",
            data: "AREAMGR",
            width: '200',
        }, {
            title: "是否活动名称",
            data: "IS_ACTIVETEXT",
            width: '200',
        }, {
            title: "开户银行帐号",
            data: "BANKACCOUNT",
            width: '200',
        }, {
            title: "开户银行",
            data: "DEPOSITBANK",
            width: '200',
        }, {
            title: "是否活动",
            data: "IS_ACTIVE",
            width: '200',
        }, {
            title: "收货地址",
            data: "CONSIGNEE",
            width: '200',
        }, {
            title: "收货人电话",
            data: "CONSIGNEEPHONE",
            width: '200',
        }, {
            title: "仓库地址",
            data: "STOREADDR",
            width: '200',
        }, {
            title: "客户简称",
            data: "CUSTABBREVIATION",
            width: '200',
        }, {
            title: "客户业务类型ID(供、销)",
            data: "PARTNERTYPE",
            width: '200',
        }, {
            title: "收货地址",
            data: "CONSIGNEEADD",
            width: '200',
        }, {
            title: "是否管理合同",
            data: "IS_MANAGECONTRACT",
            width: '200',
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
or (0=200 and f.custtypeid=7/*生产企业*/  )
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