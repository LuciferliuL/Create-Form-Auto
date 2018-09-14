import { CURRENT_TAGS_UPDATA, SQL_DATA } from '../action/SliderCard.action'

const SData = [
    {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'edit', id: 8, type: 'INPUT', required: false,
        message: "123", label: "输入框", placeholder: "123", disabled: false,
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
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'border', id: 8, type: 'CheckBox', required: false,
        message: "123", label: "多选框", checked: false, disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'select', id: 8, type: 'Select', required: false,
        message: "123", label: "下拉框", disabled: false,
        GroupValue: [{ value: 'Apple', name: 'Apple' }, { value: 'Pear', name: 'Pear' }],
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'calendar', id: 8, type: 'Date', required: false,
        message: "123", label: "日期选择", disabled: false, placeholder: "123",
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        }
    },
    {
        GridX: 0, GridY: 0, w: 16, h: 2, key: '0',
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
        columnsTable: [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
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
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'diff', id: 8, type: 'LookUp', required: false,
        message: "123", label: "LookUp", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },columns:['title','count'],
        SQL: 'select * where',
        dataSource: [ {
            title: '标题',
            children: [{
                title: 'AntDesign',
                count: 10000,
            }, {
                title: 'AntDewwI',
                count: 1061300,
            }, {
                title: 'AntD按时的全额委屈',
                count: 10601230,
            }, {
                title: 'Ant12的撒旦',
                count: 1064100,
            }, {
                title: 'AntqweqI',
                count: 10123600,
            }],
        }]
    }, {
        GridX: 0, GridY: 0, w: 24, h: 2, key: '0',
        icons: 'copy', id: 8, type: 'Group', label: "组别", orientation: 'left'
    }, {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'key', id: 8, type: 'Switch', required: false,
        message: "123", label: "开关", checked: false, disabled: false,
        unCheckedChildren: 'NO', checkedChildren: 'YES',
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
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
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'gift', id: 8, type: 'LookUp', required: false,
        message: "123", label: "商品检索", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },
        columns:['title','count'],
        SQL: 'select * where',
        dataSource:[ {
            title: '标题',
            children: [{
                title: 'AntDesign',
                count: 10000,
            }, {
                title: 'AntDewwI',
                count: 1061300,
            }, {
                title: 'AntD按时的全额委屈',
                count: 10601230,
            }, {
                title: 'Ant12的撒旦',
                count: 1064100,
            }, {
                title: 'AntqweqI',
                count: 10123600,
            }],
        }]
    }, {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'team', id: 8, type: 'LookUp', required: false,
        message: "123", label: "人物检索", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },
        columns:['title','count'],
        SQL: 'select * where',
        dataSource: [ {
            title: '标题',
            children: [{
                title: 'AntDesign',
                count: 10000,
            }, {
                title: 'AntDewwI',
                count: 1061300,
            }, {
                title: 'AntD按时的全额委屈',
                count: 10601230,
            }, {
                title: 'Ant12的撒旦',
                count: 1064100,
            }, {
                title: 'AntqweqI',
                count: 10123600,
            }],
        }]
    }, {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'deployment-unit', id: 8, type: 'LookUp', required: false,
        message: "123", label: "历史检索", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },
        columns:['title','count'],
        SQL: 'select * where',
        dataSource: [ {
            title: '标题',
            children: [{
                title: 'AntDesign',
                count: 10000,
            }, {
                title: 'AntDewwI',
                count: 1061300,
            }, {
                title: 'AntD按时的全额委屈',
                count: 10601230,
            }, {
                title: 'Ant12的撒旦',
                count: 1064100,
            }, {
                title: 'AntqweqI',
                count: 10123600,
            }],
        }]
    }, {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'hdd', id: 8, type: 'LookUp', required: false,
        message: "123", label: "字典检索", disabled: false,
        layout: {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
        },
        columns:['title','count'],
        SQL: 'select * where',
        dataSource:[ {
            title: '标题',
            children: [{
                title: 'AntDesign',
                count: 10000,
            }, {
                title: 'AntDewwI',
                count: 1061300,
            }, {
                title: 'AntD按时的全额委屈',
                count: 10601230,
            }, {
                title: 'Ant12的撒旦',
                count: 1064100,
            }, {
                title: 'AntqweqI',
                count: 10123600,
            }],
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