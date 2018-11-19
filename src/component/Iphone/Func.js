/**
 * 换位
 */

export const ReplaceArr = (arr, index1, index2) => {
    // console.log(arr, index1, index2);
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    // console.log(arr);
    
    return arr
}
/**
 * 数组位置向后
 */
export const RightMoveArr = (arr, index, length) => {
    // console.log('Right');
    if (index + 1 != length) {
        return ReplaceArr(arr, index, index + 1)
    } else {
        return arr
    }
}
/**
 * 数组位置向前
 */
export const LeftMoveArr = (arr, index, length) => {
    // console.log('Left');
    if (index != 0) {
        return ReplaceArr(arr, index, index - 1);
    } else {
        return arr
    }
}
