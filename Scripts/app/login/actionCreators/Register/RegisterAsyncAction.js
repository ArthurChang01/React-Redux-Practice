import "es6-promise";
import "fetch";
import * as toastr from 'toastr';
import {LoginAsyncAction} from '../Login/LoginAsyncAction';
import {RegisterRequestAction} from './RegisterRequestAction';
import {RegisterSuccessAction} from './RegisterSuccessAction';
import {RegisterFailAction} from './RegisterFailAction';

export function RegisterAsyncAction(email, password, confirmed_password) {
    return dispatch => {
        if (password !== confirmed_password){
            dispatch(RegisterFailAction("password is not matched with confirmed_password"));
            return;
        }
        
        if (!email || !password || !confirmed_password){
            toastr.error("email, password and confirmed_password can't be empty!");
            return;
        }

        dispatch(RegisterRequestAction());

        let fetch_Parm = {
            headers: { "Content-Type": 'application/json' },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ email: email, "password": password })
        };

        fetch('http://localhost:3000/Members', fetch_Parm)
            .then(resp => resp.json())
            .then(data => {
                dispatch(RegisterSuccessAction(data));
                dispatch(LoginAsyncAction(email, password));
            })
            .catch(err => {
                dispatch(RegisterFailAction(err));
            });
    }
}