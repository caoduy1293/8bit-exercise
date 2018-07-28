import {itemsRef, storageRef} from '../../firebase';
import FileSaver from 'file-saver';
import * as moment from 'moment';
export function uploadImageFirebase(fileName, file, callback){
    storageRef.child(fileName).put(file).then((snapshot) => {
        callback(snapshot);
    });
}
export function removeImageFirebase(fileUrl, callbackSuccess, callbackErr) {
    let ImageRef = storageRef.child(fileUrl);
    ImageRef.delete().then(() => {
        callbackSuccess();
    }).catch((error) => {
        callbackErr(error);
    });
}
export function addItemFireBase(itemAddingModel, callback){
    itemsRef.push().set(itemAddingModel).then(() => {
        callback();
    });
}
export function editItemFireBase(itemAddingModel, id, callback){
    itemsRef.child(id).update(itemAddingModel).then(() => {
        callback();
    });
}
export function removeItemFireBase(id, callback){
    itemsRef.child(id).remove().then(() => {
        callback();
    });
}

export function getDownloadUrl(fileUrl, successCallback, errorCallback) {
    let ImageRef = storageRef.child(fileUrl);
    ImageRef.getDownloadURL().then((url) => {
        successCallback(url);
    }).catch((error) => {
        errorCallback(error);
    });
}

export function downloadFileFirebase(fileUrl, isFromNasaData) {
    if(isFromNasaData) {
        var win = window.open(fileUrl, '_blank');
        win.focus();
    } else {
        getDownloadUrl(fileUrl, (url) => {
            // This can be downloaded directly:
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                let blob = xhr.response;
                FileSaver.saveAs(blob, fileUrl);
            };
            xhr.open('GET', url);
            xhr.send();
        }, (err) => {
            console.log(err);
        });
    }
}

export function createModel(value) {
    return {
        title: value.title || '',
        description: value.description || '',
        previewUrl: value.previewUrl || '',
        dateCreated: value.dateCreated || '',
        mediaType: value.mediaType || '',
        isFromNasaData: !!value.isFromNasaData
    };
}

export function updateEditModel(sourceObj, destinationObj) {
    destinationObj.title = !sourceObj.title ? destinationObj.title: sourceObj.title;
    destinationObj.description = sourceObj.description || '';
    return destinationObj;
}