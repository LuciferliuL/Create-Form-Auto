import 'isomorphic-fetch'
import $ from 'jquery'
import {message} from 'antd'

/**
 * 
 * @param {链接} URL 
 */
function GETFetch(URL, Callback) {
    //超时对象  超过5000ms 返回reject
    let time = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('timeout')
        }, 3000000);
    })
    //请求对象 resolve返回data reject返回error
    let fetchs = new Promise((resolve, reject) => {
        fetch(URL, { method: "GET" })
            .then((response) => {
                // console.log(response)
                if (response.status === 200) {//成功
                    return response.json()
                } else {
                    return '获取数据失败'
                }
            })
            .then(data => {
                // console.log(data)
                resolve(data)
            })
            .catch(error => reject(error))
    })
    Promise.race([time, fetchs]).then((result) => {
        // console.log(result)
        //5秒以后  返回timeout
        Callback(result)
    }).catch((error) => {
        console.log(error)
        return error
    })
}

export { GETFetch }

/**
 * 
 * @param {链接} URL 
 * @param {内容} postBody 
 * @param {是否是正常格式}boolean
 */
function POSTFETCH(URL, postBody, Callback) {
    let token = localStorage.getItem('token')
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append("Authorization", "Bearer " + token)
    let request = new Request(URL, {
        method: 'POST',
        mode: 'cors',
        body: postBody,
        headers: myHeaders
    });
    console.log(myHeaders);

    fetch(request)
        .then(response => response.json())
        .then(result => {
            Callback(result)
        })
        .catch(res => {
            console.log(res)
        })
}

export { POSTFETCH }

function POSTFETCHNOBODY(URL, postBody, Callback) {

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json, text/plain, */*');
    let request = new Request(URL, {
        method: 'POST',
        mode: 'cors',
        body: postBody,
        headers: myHeaders
    });
    fetch(request)
        .then(response => response.json())
        .then(result => {
            Callback(result)
        })
        .catch(res => {
            console.log(res)
        })
}

export { POSTFETCHNOBODY }


export const TreeMath = (data) => {
    const compare = (obj1, obj2) => {
        var val1 = obj1.OrgLevel
        var val2 = obj2.OrgLevel
        if (val1 < val2) {
            return -1
        } else if (val1 > val2) {
            return 1
        } else {
            return 0
        }
    }
    data.sort(compare)

    let TreeData = []
    let flag_1 = 0
    let flag_2 = 0
    data.forEach((e, i) => {
        e.label = e.ServerName
        e.value = e.SystemGUID
        e.children = []
        if (e.OrgLevel.length === 2) {
            TreeData.push(e)
            flag_1 = TreeData.length - 1
        } else if (e.OrgLevel.length === 4) {
            TreeData[flag_1].children.push(e)
            flag_2 = TreeData[flag_1].children.length - 1
        } else if (e.OrgLevel.length === 6) {
            TreeData[flag_1].children[flag_2].children.push(e)
        }
    });
    return TreeData
}


export const GET$ = (URL, Callback) => {
    let token = localStorage.getItem('token')
    $.ajax({
        url: URL,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: {},
        dataType: "json",
        beforeSend: function (xhr) { xhr.setRequestHeader("Authorization", "Bearer " + token) },
        success: function (res) {
            Callback(res)
        }
    })
}

export const POST$ = (URL, POSTBODY, CALLBACK) => {
    POSTBODY = JSON.stringify(POSTBODY)
    let token = localStorage.getItem('token')
        $.ajax({
            url: URL,
            type: "POST",
            contentType: 'application/json;charset=utf-8',
            data: POSTBODY,
            dataType: "JSON",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token)
            },
            success: function (res) {
                CALLBACK(res)
            }
        })
}

$.ajaxSetup({
    statusCode:{
        500:function(){
            message.error('服务器错误。500')
        }
    }
})

function getTime() {
    var myDate = new Date()
    var mytime
    myDate.toLocaleDateString()
    myDate.getFullYear()
    myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    myDate.getDate();        //获取当前日(1-31)
    myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
    myDate.getHours();       //获取当前小时数(0-23)
    myDate.getMinutes();     //获取当前分钟数(0-59)
    myDate.getSeconds();     //获取当前秒数(0-59)
    mytime = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}T${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
    return mytime
}

export { getTime }

function getHours() {
    var myDate = new Date()
    var myHours = ''
    let hours = myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours()
    let minutes = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes()
    let seconds = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds()
    return myHours = `T${hours}:${minutes}:${seconds}`
}

export { getHours }

//下载
function downloadFile(fileName, content){
      // 创建隐藏的可下载链接
      var eleLink = document.createElement('a');
      eleLink.download = fileName;
      eleLink.style.display = 'none';
      // 字符内容转变成blob地址
      var blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
}

export {downloadFile}

function fileImport() {
    //获取读取我文件的File对象
    var selectedFile = document.getElementById('files').files[0];
    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    console.log("文件名:"+name+"大小:"+size);

    var reader = new FileReader();//这是核心,读取操作就是由它完成.
    //reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
    reader.onload = function () {
        //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
        console.log(this.result);
    }
}

export {fileImport}