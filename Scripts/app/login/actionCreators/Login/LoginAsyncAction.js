import "es6-promise";
import "fetch";
import * as toastr from 'toastr';
import {LoginRequestAction} from './LoginRequestAction';
import {LoginSuccessAction} from './LoginSuccessAction';
import {LoginFailAction} from './LoginFailAction';

export function LoginAsyncAction(email, password) {
    return dispatch => {
        if(!email || !password){
            toastr.error("email or password can't be empty!");
            return;
        }

        dispatch(LoginRequestAction());

        let fetch_Parm = {
            method: 'GET',
            mode: 'cors'
        };

        fetch(`http://localhost:3000/Members?email=${email}&password=${password}`, fetch_Parm)
            .then(resp => resp.json())
            .then(data => {
                if(data.length==0)
                    dispatch(LoginFailAction('email or password is not matched'));
                else 
                    dispatch(LoginSuccessAction(data));
            })
            .catch(err => {
                dispatch(LoginFailAction(err));
            });
    }
}