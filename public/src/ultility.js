export function convertObjToArray(obj) {
    let copyObj = Object.assign({}, obj);
    let arrayTemp = [];
    for (let item in copyObj){
        if (copyObj.hasOwnProperty(item)) {
            arrayTemp.push(Object.assign({id: item}, copyObj[item]));
        }
    }
    return arrayTemp;
}

export function convertArrayToObj(array) {
    let copyArray = array.slice();
    let objTemp = {};
    for(let i = 0, len = copyArray.length; i < len; ++i){
        let objItem = copyArray[i];
        let id = objItem.id;
        delete objItem.id;
        objTemp[id] = objItem;
    }
    return objTemp;
}