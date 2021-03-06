/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as form } from "redux-form";
import {reducer as toastrReducer} from 'react-redux-toastr'

import languageProviderReducer from './containers/SharedComponent/LanguageProvider/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = {
  location: null,
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
      case LOCATION_CHANGE:
      return {
          ...state,
          location: action.payload,
      };
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    form, // mounted under "form"
    toastr: toastrReducer, // <- Mounted at toastr.
    route: routeReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
}
