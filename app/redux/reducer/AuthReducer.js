import {
    LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT,
    REGISTER_BEGIN, REGISTER_SUCCESS, REGISTER_FAIL
} from '../constants/AuthConstant';
import InitState from '../InitState/AuthState';

export function AuthReducer(state = InitState, action) {
    switch (action.type) {
        case LOGIN_BEGIN: //Login
            return Object.assign({}, state, { isFetching: true });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { isFetching: false, isAuth: true, Members: action.data });
        case LOGIN_FAIL:
            return Object.assign({}, state, { isFetching: false, isAuth: false, error_message: action.error_message, Members: []});
        case LOGOUT: //Logout
            return Object.assign({}, state, { isAuth: false });
        case REGISTER_BEGIN: //Register
            return Object.assign({}, state, { isFetching: true });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, { isFetching: false });
        case REGISTER_FAIL:
            return Object.assign({}, state, { isFetching: false, error_message: action.error_message });
    }
}