class BaseData {
    constructor(id, value, defaultValue, paramtype = 'String') {
        this.Key = guid() //组件唯一性
        this.id = id//组件传递的值
        this.value = value//组件值
        this.defaultValue = defaultValue//默认值
        this.paramtype = paramtype
    }
}

export class InputData extends BaseData {
    constructor(id, value, defaultValue, paramtype, data = { name: '测试输入框', value: '' }, mode = 'default') {
        super(id, value, defaultValue, paramtype)
        this.type = 'input'//组件类型
        this.data = data//组件名称
        this.mode = mode//输入类型  //mode:number,money
        this.Label = '输入框'
    }
}

export class RadioData extends BaseData {
    constructor(id, value, defaultValue, paramtype,
        data = []
        , sqlname = '', selectname = '', selectvalue = '', isObj = false) {
        super(id, value, defaultValue, paramtype)
        this.type = 'radio'//组件类型
        this.data = data
        this.default = '0'
        this.Label = '单选框'
        this.sqlname = sqlname
        this.selectname = selectname
        this.selectvalue = selectvalue
        this.isObj = isObj
    }
    add(e) {
        this.data = [...this.data, e]
    }
    del(num) {
        this.data = this.data.filter((e, i) => i !== num)
    }

}

export class LookUp extends BaseData {
    constructor(id, value, defaultValue, paramtype, data = { name: "客户", value: "", key: ""}, mode = 'cust', isObj = false) {
        super(id, value, defaultValue, paramtype)
        this.type = 'lookup'
        this.data = data
        this.Label = 'LookUp'
        this.mode = mode
        this.isObj = isObj
    }
}

export class Title extends BaseData {
    constructor(id, value, defaultValue, paramtype, title = '单据类型', show = true, control = []) {
        super(id, value, defaultValue, paramtype)
        this.type = 'title'
        this.title = title
        this.show = show
        this.control = control
        this.Label = '表题'
    }
}

//时间控件
export class DateS extends BaseData {
    constructor(id, value, defaultValue, paramtype, data = { name: "时间", value: 0 }) {
        super(id, value, defaultValue, paramtype)
        this.type = 'date'
        this.data = data
        this.Label = '时间控件'
    }
}

export class SelectS extends BaseData {
    constructor(id, value, defaultValue, paramtype, data = { name: 'select', value: '0', default: "0", selected: true }) {
        super(id, value, defaultValue, paramtype)
        this.type = 'select'//组件类型
        this.data = data
        this.default = '0'
        this.Label = '选择框'
    }
    add(e) {
        this.data = [...this.data, e]
    }
    del(num) {
        this.data = this.data.filter((e, i) => i !== num)
    }
}

// GUID生产
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}