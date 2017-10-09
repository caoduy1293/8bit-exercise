import _ from 'lodash';

export const appRoute = {
    root: '',
    addressPage: 'address/',
    addressEdit: 'address/edit/',
    addressNew: 'address/new'
};

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

export function removeOutArrayById(id, array) {
    let arrayTemp = _.cloneDeep(array);
    let index = -1;
    for (let i = 0; i< arrayTemp.length; i++){
        if(arrayTemp[i].id === id){
            index = i;
        }
    }
    if (index > -1) {
        arrayTemp.splice(index, 1);
    }
    return arrayTemp;
}