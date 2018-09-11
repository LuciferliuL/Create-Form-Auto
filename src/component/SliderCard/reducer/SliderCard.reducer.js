import { CURRENT_TAGS_UPDATA } from '../action/SliderCard.action'

const SData = [
    {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'edit', id: 8, type: 'INPUT', required: true, 
        message: "123", label: "输入框", placeholder: "123", disabled: false,
        layout: { labelCol: { xs: { span: 24 }, sm: { span: 8 }, }, 
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } } },
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'copyright', id: 8, type: 'RadioGroup', required: true, 
        message: "123", label: "单选框组", disabled: false,
        RadioValue: [{ value: 'Apple', name: 'Apple' }, { value: 'Pear', name: 'Pear' }], 
        groupname: 'cen',
        layout: { labelCol: { xs: { span: 24 }, sm: { span: 8 }, }, 
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } } }
    },
    {
        GridX: 0, GridY: 0, w: 8, h: 2, key: '0',
        icons: 'border', id: 8, type: 'CheckBox', required: true, 
        message: "123", label: "多选框", checked: false, disabled: false,
        layout: { labelCol: { xs: { span: 24 }, sm: { span: 8 }, }, 
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } } }
    },
    { icons: 'select', label: '下拉框', CardData: '' },
    { icons: 'calendar', label: '日期选择', CardData: '' },
    { icons: 'contacts', label: '时段选择', CardData: '' },
    { icons: 'table', label: '简单表格', CardData: '' },
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