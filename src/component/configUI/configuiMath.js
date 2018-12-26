export  const menu = (data) => {
    let arr1 = [],arr2 = [],arr3 = []
    data.forEach(element => {
        if(element.LevelString.length === 2){
            arr1.push(element)
        }else if(element.LevelString.length === 4){
            arr2.push(element)
        }else{
            arr3.push(element)
        }
    });
    arr2.forEach(e => {
        e['child'] = []
        arr3.forEach(k => {
            if(e.PK === Number(k.OriginalGuidString)){
                e['child'].push(k)
            }
        })
    })
    arr1.forEach(e => {
        e['child'] = []
        arr2.forEach(k => {
            if(e.PK === Number(k.OriginalGuidString)){
                e['child'].push(k)
            }
        })
    })
    return arr1
}