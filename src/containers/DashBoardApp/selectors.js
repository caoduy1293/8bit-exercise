import { createSelector } from 'reselect/es';
import { get } from 'lodash';

import { SELECTOR_ID_PAGE } from './constants';
import { APP_STATE_NAME } from './reducer';

const selectPageState = (state) => state[SELECTOR_ID_PAGE];

const getItemsState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.items)
);
const nasaDataState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.nasaData)
);
const loadingNasaState = () => createSelector(
    selectPageState,
    (pageState) => get(pageState, APP_STATE_NAME.loadingNasa)
);


export {
    selectPageState,
    getItemsState,
    nasaDataState,
    loadingNasaState,
};
