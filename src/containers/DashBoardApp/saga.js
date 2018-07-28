import { put, call, fork, takeEvery, all } from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import request from "../../utils/request";
import {API_URL} from "../AppRoot/constants";
import {GET_NASA_DATA, getNASADataDone} from "./actions";

export function* watchGetNASAData() {
    yield takeEvery(GET_NASA_DATA, getNASADataFromServer);
}
export function* getNASADataFromServer(action) {
    try {
        const res = yield call(request, API_URL.dashboardApp.getAPOD.replace('{count}', action.count), {
            method: 'get',
        });
        toastr.success('Get NASA data successfully');
        yield put(getNASADataDone(res));
    } catch (error) {
        toastr.error('Fail to get NASA data');
        yield put(getNASADataDone([]));
    }
}

export default function* pageSaga() {
    yield all([
        fork(watchGetNASAData),
    ]);
}