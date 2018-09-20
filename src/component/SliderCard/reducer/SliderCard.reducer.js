import { CURRENT_TAGS_UPDATA, SQL_DATA } from '../action/SliderCard.action'

const SData = [
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'edit', id: 8, type: 'INPUT', required: false,
        message: "123", label: "输入框", placeholder: "123", disabled: false,
        isTrueInLookUp:0,defaultValue:'',typePoint:'type',
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
        groupname: 'cen',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 4, h: 1, key: '0',
        icons: 'border', id: 8, type: 'CheckBox', required: false,
        message: "123", label: "多选框", checked: false, disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 16 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 8 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'select', id: 8, type: 'Select', required: false,
        message: "123", label: "下拉框", disabled: false,
        GroupValue: [{ value: 'Apple', name: 'Apple' }, { value: 'Pear', name: 'Pear' }],
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'calendar', id: 8, type: 'Date', required: false,
        message: "123", label: "日期选择", disabled: false, placeholder: "123",
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 16, h: 1, key: '0',
        icons: 'contacts', id: 8, type: 'Range', required: false,
        message: "123", label: "时段选择", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 24, h: 8, key: '0', pageSize: 10, scroll: 180,
        icons: 'table', label: '简单表格', type: 'Table',
        SQL: 'select * where',
        columns: [
            {
                title: '姓名',
                dataIndex: 'name',
                width:'20%'
            }, {
                title: '年龄',
                dataIndex: 'age',
                width:'20%'
            }, {
                title: '住址',
                dataIndex: 'address',
                width:'20%'
            }],
        dataSource: [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '3',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '4',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '5',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '6',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '7',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '8',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '9',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '10',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }, {
                key: '11',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }]
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'diff', id: 8, type: 'LookUp', required: false,
        message: "123", label: "LookUp", disabled: false,upKey:'',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },tr:0,shows:false,values:'',uniqueKey:'key',
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
        dataSource: [
            {
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 3,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 4,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 5,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 6,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 7,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 8,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 9,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 10,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 11,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }, {
            key: 12,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 13,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 14,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 15,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 16,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 17,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }]
    }, {
        GridX: 0, GridY: 0, w: 24, h: 1, key: '0',
        icons: 'copy', id: 8, type: 'Group', label: "组别", orientation: 'left'
    }, {
        GridX: 0, GridY: 0, w: 4, h: 1, key: '0',
        icons: 'key', id: 8, type: 'Switch', required: false,
        message: "123", label: "开关", checked: false, disabled: false,
        unCheckedChildren: 'NO', checkedChildren: 'YES',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 12 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
        }
    }
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
        message: "123", label: "商品检索", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },td:0,tr:0,shows:false,values:'',
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
            key: 'action',
            width: '50%'
        }],
        SQL: 'select * where',
        dataSource: [
            {
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }]
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'team', id: 8, type: 'LookUp', required: false,
        message: "123", label: "人物检索", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },td:0,tr:0,shows:false,values:'',
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
            key: 'action',
            width: '50%'
        }],
        SQL: 'select * where',
        dataSource: [
            {
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }]
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'deployment-unit', id: 8, type: 'LookUp', required: false,
        message: "123", label: "历史检索", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },td:0,tr:0,shows:false,values:'',
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
            key: 'action',
            width: '50%'
        }],
        SQL: 'select * where',
        dataSource: [
            {
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }]
    }, {
        GridX: 0, GridY: 0, w: 8, h: 1, key: '0',
        icons: 'hdd', id: 8, type: 'LookUp', required: false,
        message: "123", label: "字典检索", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },td:0,tr:0,shows:false,values:'',
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
            key: 'action',
            width: '50%'
        }],
        SQL: 'select * where',
        dataSource: [
            {
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        }]
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