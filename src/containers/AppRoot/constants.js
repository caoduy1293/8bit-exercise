import {APP_ROOT_API, NASA_API, NASA_API_KEY} from "../../config/index";

export const SELECTOR_ID_PAGE = 'global';

export const DEFAULT_LOCALE = 'en';
export const LOCAL_STORAGE_ID_KEY = {
    token: 'app-token',
};
export const ROUTE_TREE = {
    home: 'home',
    login: 'login',
    userApp: 'user',
    roomApp: 'room-management',
};
export const API_URL = {
    authApp: {
        login: `${APP_ROOT_API}auth/login`,
        me: `${APP_ROOT_API}auth/me`,
        register: `${APP_ROOT_API}auth/register`,
    },
    dashboardApp: {
        getAPOD: `${NASA_API}/planetary/apod?api_key=${NASA_API_KEY}&count={count}`
    },
    userApp: {
        getUsers: `${APP_ROOT_API}users`,
        addUser: `${APP_ROOT_API}users`,
        userDetails: `${APP_ROOT_API}users/{userId}`,
    }
};

export const errorToastr = {timeOut: 0, removeOnHover: false};
