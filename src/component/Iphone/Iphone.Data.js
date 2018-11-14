class BaseData {
    constructor(ID,  value, defaultValue) {
        this.Key = guid() //组件唯一性
        this.ID = ID//组件传递的值
        this.value = value//组件值
        this.defaultValue = defaultValue//默认值
    }
    set(Name, value) {
        this[Name] = value
    }
    get(Name, value) {
        this[Name] = value
    }
}

export class InputData extends BaseData {
    constructor(ID, value, defaultValue, Label = '输入框') {
        super(ID,  value, defaultValue)
        this.Type = 'Input'//组件类型
        this.Label = Label//组件名称
    }
}

export class RadioData extends BaseData {
    constructor(ID, value, defaultValue, Group = [], Label = '单选框') {
        super(ID,  value, defaultValue)
        this.Type = 'Radio'//组件类型
        this.Label = Label//组件名称
        this.Group = Group
    }
    add(e) {
        this.Group = [...this.Group, e]
    }
    del(num) {
        this.Group = this.Group.filter((e, i) => i !== num)
    }

}




// GUID生产
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}