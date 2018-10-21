import { CURRENT_TAGS_UPDATA, SQL_DATA } from '../action/SliderCard.action'
import '../../../App'

const SData = [
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'edit', id: 8, type: 'INPUT', required: false,
        message: "", label: "输入框", placeholder: "", disabled: false,
        isTrueInLookUp: 0, defaultValue: '', typePoint: 'type',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'copyright', id: 8, type: 'RadioGroup', required: false,
        message: "", label: "单选框组", disabled: false,
        GroupValue: [{ value: '', name: 'Apple' }, { value: '', name: 'Pear' }],
        groupname: 'cen', defaultValue: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 4, h: 1, key: '0',
        icons: 'border', id: 8, type: 'CheckBox', required: false,
        message: "", label: "多选框", checked: false, disabled: false,
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
        message: "", label: "日期选择", disabled: false, placeholder: "",
        defaultValue: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 16, h: 1, key: '0',
        icons: 'contacts', id: 8, type: 'Range', required: false,
        message: "", label: "时段选择", disabled: false,
        defaultValue: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
    //     GridX: 0, GridY: 0, w: 24, h: 8, key: '0', pageSize: 200, scroll: 1200,
    //     icons: 'table', label: '简单表格', type: 'Table',
    //     SQL: 'select * where', groupname: '',
    //     columns: [
    //     ],
    //     dataSource: []
    // },
    // {
    //     GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
    //     icons: 'diff', id: 8, type: 'LookUp', required: false,
    //     message: "", label: "LookUp", disabled: false, upKey: '',
    //     show: false, scroll: 1200,
    //     layout: {
    //         labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
    //         wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
    //     }, tr: 0, values: '', uniqueKey: 'key',
    //     columns: [
    //         {
    //             title: 'Date',
    //             dataIndex: 'date',
    //             width: '20%',
    //         }, {
    //             title: 'Amount',
    //             dataIndex: 'amount',
    //             width: '10%',
    //         }, {
    //             title: 'Type',
    //             dataIndex: 'type',
    //             width: '10%',
    //         }, {
    //             title: 'Note',
    //             dataIndex: 'note',
    //             width: '10%',
    //         }, {
    //             title: 'Action',
    //             dataIndex: 'action',
    //             width: '50%'
    //         }],
    //     SQL: '',
    //     dataSource: []
    // }, {
        GridX: 0, GridY: 0, w: 24, h: 1, key: '0',
        icons: 'copy', id: 8, type: 'Group', label: "说明", orientation: 'left'
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
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0', float: 0,
        icons: 'gift', id: 8, type: 'LookUp', required: false,
        message: "", label: "商品检索", disabled: false, upKey: '',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key', scroll: 1200,
        show: false,
        columns: [{
            title: "采购员ID",
            dataIndex: "PURCHASER",
            width: 100,
        }, {
            title: "商品内码",
            dataIndex: "PRODID",
            width: 120,
        }, {
            title: "商品编码",
            dataIndex: "PRODNO",
            width: 150,
        }, {
            title: "商品名称",
            dataIndex: "PRODNAME",
            width: 300,
        }, {
            title: "包装单位",
            dataIndex: "PACKAGEUNIT",
            width: 80,
        }, {
            title: "大包装量",
            dataIndex: "BIGPACKAGEQUANTITY",
            width: 100,
        }, {
            title: "中包装量",
            dataIndex: "MIDPACKAGEQUANTITY",
            width: 100,
        }, {
            title: "生产厂家",
            dataIndex: "MANUFACTURE",
            width: 450,
        }, {
            title: "产地",
            dataIndex: "CHINESEDRUGYIELDLY",
            width: 100,
        }, {
            title: "税率",
            dataIndex: "TAXRATE",
            width: 60,
        }, {
            title: "商品助记码",
            dataIndex: "PRODMEMORYCODE",
            width: 150,
        }, {
            title: "供应商简码",
            dataIndex: "ARCHIVENO",
            width: 120,
        }, {
            title: "商品规格",
            dataIndex: "PRODSPECIFICATION",
            width: 100,
        }, {
            title: "商品剂型",
            dataIndex: "PRODDOSAGEFORMNOTEXT",
            width: 100,
        }, {
            title: "是否集采",
            dataIndex: "IS_CENTRALIZEDPURCHASING",
            width: 80,
        }, {
            title: "处方分类ID",
            dataIndex: "PRESCRIPTIONCLASS",
            width: 100,
        }, {
            title: "零售价",
            dataIndex: "RETAILPRICE",
            width: 80,
        }, {
            title: "最低售价",
            dataIndex: "MINSELLPRICE",
            width: 100,
        }, {
            title: "厂家限价",
            dataIndex: "MINSELLPRICELIMIT",
            width: 100,
        }, {
            title: "基准指导价",
            dataIndex: "SELLGUIDPRICE",
            width: 100,
        }, {
            title: "含税售价",
            dataIndex: "SELLTAXPRICE",
            width: 100,
        }, {
            title: "业务类型",
            dataIndex: "BUSITYPETEXT",
            width: 120,
        }, {
            title: "采购员ID",
            dataIndex: "PURCHASEID",
            width: 100,
        }, {
            title: "成本单价",
            dataIndex: "COSTPRICE",
            width: 100,
        }, {
            title: "核算成本价",
            dataIndex: "COSTACCOUNTING",
            width: 100,
        }, {
            title: "是否活动",
            dataIndex: "IS_ACTIVE",
            width: 80,
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
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0', float: 0,
        icons: 'team', id: 8, type: 'LookUp', required: false,
        message: "", label: "人员查询", disabled: false, upKey: '', scroll: 1200,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        show: false,
        columns: [{
            title: "主键",
            dataIndex: "PK",
            width: 150,
        }, {
            title: "助记码",
            dataIndex: "ABBR",
            width: 200,
        }, {
            title: "人员ID",
            dataIndex: "STAFFID",
            width: 150,
        }, {
            title: "人员名称",
            dataIndex: "STAFFNAME",
            width: 150,
        }, {
            title: "组织名称",
            dataIndex: "ORGNAME",
            width: 150,
        }, {
            title: "组织结构内码",
            width: 200,
            dataIndex: "ORGID",
        }, {
            title: "分公司ID",
            dataIndex: "BRANCHID",
            width: 100,
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
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0', float: 0,
        icons: 'hdd', id: 8, type: 'LookUp', required: false,
        message: "", label: "字典检索", disabled: false, upKey: '', scroll: 1200,
        show: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        columns: [{
            title: "经销代销类型",
            dataIndex: "DICTITEMCODE",
            width: 200,
        }, {
            title: "字典名称",
            dataIndex: "DICTITEMNAME",
            width: 200,
        }, {
            title: "备注",
            dataIndex: "note",
            width: 200,
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
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0', float: 0,
        icons: 'heat-map', id: 8, type: 'LookUp', required: false,
        message: "", label: "客户检索", disabled: false, upKey: '',
        show: false, scroll: 1200,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        columns: [
            {
                title: "主管部门名称",
                dataIndex: "EXECUTIVEDEPT",
                width: 150,
            }, {
                title: "助记码",
                dataIndex: "CUSTMEMORYCODE",
                width: 120,
            }, {
                title: "质管备注",
                dataIndex: "QUALIFICATIONDEADLINE",
                width: 200,
            }, {
                title: "客户类别ID",
                dataIndex: "CUSTTYPEID",
                width: 100,
            }, {
                title: "客户内码",
                dataIndex: "CUSTID",
                width: 100,
            }, {
                title: "客户编码",
                dataIndex: "CUSTNO",
                width: 100,
            }, {
                title: "客户名称",
                dataIndex: "CUSTNAME",
                width: 200,
            }, {
                title: "客户地址",
                dataIndex: "CUSTADD",
                width: 200,
            }, {
                title: "客户标识",
                dataIndex: "CUSTIDENTIFY",
                width: 120,
            }, {
                title: "联系人",
                dataIndex: "CONTACTPERSON",
                width: 100,
            }, {
                title: "联系电话",
                dataIndex: "CONTACTPHONE",
                width: 120,
            }, {
                title: "业务员ID",
                dataIndex: "BUSINESSID",
                width: 150,
            }, {
                title: "业务员",
                dataIndex: "BUSINESSMAN",
                width: 150,
            }, {
                title: "不可经营类别",
                dataIndex: "NONBUSINESSTYPE",
                width: 150,
            }, {
                title: "经营简码",
                dataIndex: "BUSINESSSCOPECODE",
                width: 100,
            }, {
                title: "不可经营简码",
                dataIndex: "NONBUSINESSSCOPECODE",
                width: 150,
            }, {
                title: "分销客户类型",
                dataIndex: "CUSTTYPE",
                width: 120,
            }, {
                title: "是否转配送",
                dataIndex: "ISARTICULATED",
                width: 120,
            }, {
                title: "责任开票员ID",
                dataIndex: "MAINOPID",
                width: 150,
            }, {
                title: "责任开票员",
                dataIndex: "MAINOPNAME",
                width: 150,
            }, {
                title: "采购员",
                dataIndex: "PURCHASER",
                width: 100,
            }, {
                title: "采购员ID",
                dataIndex: "PURCHASERID",
                width: 120,
            }, {
                title: "付款方式",
                dataIndex: "PAYMENTNAME",
                width: 120,
            }, {
                title: "销售信贷期",
                dataIndex: "SALESCREDITTIME",
                width: 120,
            }, {
                title: "是否可进货",
                dataIndex: "ISPURCHASING",
                width: 120,
            }, {
                title: "关联关系ID",
                dataIndex: "RELATION",
                width: 120,
            }, {
                title: "是否集采",
                dataIndex: "IS_CENTRALIZEDPURCHASING",
                width: 100,
            }, {
                title: "是否可销售",
                dataIndex: "ISSALES",
                width: 152,
            }, {
                title: "开发票要求",
                dataIndex: "BILLINGNOTE",
                width: 120,
            }, {
                title: "主配送仓库ID",
                dataIndex: "STOREID",
                width: 120,
            }, {
                title: "区域划分",
                dataIndex: "TERRITORIESTEXT",
                width: 150,
            }, {
                title: "区域划分ID",
                dataIndex: "TERRITORIES",
                width: 100,
            }, {
                title: "所属大区",
                dataIndex: "OWNERAREATEXT",
                width: 120,
            }, {
                title: "大区经理ID",
                dataIndex: "AREAMGR",
                width: 100,
            }, {
                title: "是否活动",
                dataIndex: "IS_ACTIVETEXT",
                width: 150,
            }, {
                title: "开户行帐号",
                dataIndex: "BANKACCOUNT",
                width: 300,
            }, {
                title: "开户行",
                dataIndex: "DEPOSITBANK",
                width: 300,
            }, {
                title: "是否活动",
                dataIndex: "IS_ACTIVE",
                width: 80,
            }, {
                title: "收货地址",
                dataIndex: "CONSIGNEE",
                width: 100,
            }, {
                title: "收货人电话",
                dataIndex: "CONSIGNEEPHONE",
                width: 100,
            }, {
                title: "仓库地址",
                dataIndex: "STOREADDR",
                width: 300,
            }, {
                title: "客户简称",
                dataIndex: "CUSTABBREVIATION",
                width: 200,
            }, {
                title: "客户业务类型ID",
                dataIndex: "PARTNERTYPE",
                width: 150,
            }, {
                title: "收货地址",
                dataIndex: "CONSIGNEEADD",
                width: 200,
            }, {
                title: "管理合同",
                dataIndex: "IS_MANAGECONTRACT",
                width: 120,
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
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0', float: 0,
        icons: 'rise', id: 8, type: 'LookUp', required: false,
        message: "", label: "上游客户检索", disabled: false, upKey: '', scroll: 1200,
        show: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }, tr: 0, values: '', uniqueKey: 'key',
        columns: [{
            title: "主管部门名称",
            dataIndex: "EXECUTIVEDEPT",
            width: 200,
        }, {
            title: "助记码",
            dataIndex: "CUSTMEMORYCODE",
            width: 200,
        }, {
            title: "质管备注",
            dataIndex: "QUALIFICATIONDEADLINE",
            width: 200,
        }, {
            title: "客户类别ID",
            dataIndex: "CUSTTYPEID",
            width: 100,
        }, {
            title: "客户内码",
            dataIndex: "CUSTID",
            width: 100,
        }, {
            title: "客户编码",
            dataIndex: "CUSTNO",
            width: 150,
        }, {
            title: "客户名称",
            dataIndex: "CUSTNAME",
            width: 200,
        }, {
            title: "客户地址",
            dataIndex: "CUSTADD",
            width: 200,
        }, {
            title: "客户标识",
            dataIndex: "CUSTIDENTIFY",
            width: 250,
        }, {
            title: "联系人",
            dataIndex: "CONTACTPERSON",
            width: 100,
        }, {
            title: "联系人电话",
            dataIndex: "CONTACTPHONE",
            width: 100,
        }, {
            title: "业务员ID",
            dataIndex: "BUSINESSID",
            width: 120,
        }, {
            title: "业务员",
            dataIndex: "BUSINESSMAN",
            width: 120,
        }, {
            title: "不可经营类别",
            dataIndex: "NONBUSINESSTYPE",
            width: 150,
        }, {
            title: "经营简码",
            dataIndex: "BUSINESSSCOPECODE",
            width: 120,
        }, {
            title: "不可经营简码",
            dataIndex: "NONBUSINESSSCOPECODE",
            width: 150,
        }, {
            title: "分销客户",
            dataIndex: "CUSTTYPE",
            width: 100,
        }, {
            title: "是否转配送",
            dataIndex: "ISARTICULATED",
            width: 120,
        }, {
            title: "责任开票员",
            dataIndex: "MAINOPNAME",
            width: 100,
        }, {
            title: "采购员",
            dataIndex: "PURCHASER",
            width: 100,
        }, {
            title: "采购员ID",
            dataIndex: "PURCHASERID",
            width: 100,
        }, {
            title: "付款方式",
            dataIndex: "PAYMENTNAME",
            width: 100,
        }, {
            title: "销售信贷期",
            dataIndex: "SALESCREDITTIME",
            width: 100,
        }, {
            title: "是否可进货",
            dataIndex: "ISPURCHASING",
            width: 100,
        }, {
            title: "关联关系ID",
            dataIndex: "RELATION",
            width: 100,
        }, {
            title: "是否集采",
            dataIndex: "IS_CENTRALIZEDPURCHASING",
            width: 100,
        }, {
            title: "是否可销售",
            dataIndex: "ISSALES",
            width: 100,
        }, {
            title: "开发票要求",
            dataIndex: "BILLINGNOTE",
            width: 100,
        }, {
            title: "责任开票员",
            dataIndex: "MAINOPID",
            width: 120,
        }, {
            title: "主配送仓库",
            dataIndex: "STOREID",
            width: 120,
        }, {
            title: "区域划分名称",
            dataIndex: "TERRITORIESTEXT",
            width: 120,
        }, {
            title: "区域划分ID",
            dataIndex: "TERRITORIES",
            width: 100,
        }, {
            title: "所属大区名称",
            dataIndex: "OWNERAREATEXT",
            width: 120,
        }, {
            title: "大区经理ID",
            dataIndex: "AREAMGR",
            width: 100,
        }, {
            title: "活动名称",
            dataIndex: "IS_ACTIVETEXT",
            width: 150,
        }, {
            title: "开户行帐号",
            dataIndex: "BANKACCOUNT",
            width: 200,
        }, {
            title: "开户银行",
            dataIndex: "DEPOSITBANK",
            width: 200,
        }, {
            title: "是否活动",
            dataIndex: "IS_ACTIVE",
            width: 100,
        }, {
            title: "收货地址",
            dataIndex: "CONSIGNEE",
            width: 200,
        }, {
            title: "收货人电话",
            dataIndex: "CONSIGNEEPHONE",
            width: 120,
        }, {
            title: "仓库地址",
            dataIndex: "STOREADDR",
            width: 150,
        }, {
            title: "客户简称",
            dataIndex: "CUSTABBREVIATION",
            width: 100,
        }, {
            title: "客户业务类型",
            dataIndex: "PARTNERTYPE",
            width: 150,
        }, {
            title: "收货地址",
            dataIndex: "CONSIGNEEADD",
            width: 200,
        }, {
            title: "是否管理合同",
            dataIndex: "IS_MANAGECONTRACT",
            width: 120,
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
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0', float: 0,
        icons: 'bulb', id: 8, type: 'LookUp', required: false,
        message: "", label: "全部客户检索", disabled: false, upKey: '', scroll: 1200,
        show: false,
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
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0', float: 0,
        icons: 'fall', id: 8, type: 'LookUp', required: false,
        message: "", label: "下游客户检索", disabled: false, upKey: '', scroll: 1200,
        show: false,
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
            column: "BANKACCOUNT",
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
and  (f.partnertypeid='2')
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