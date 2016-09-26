import {browserHistory} from 'react-router';
import * as toastr from 'toastr';

import {LOGIN_SUCCESS} from '../../constants/LoginConstant';

export function LoginSuccessAction(resp){
    browserHistory.push('/');
    toastr.success('LogIn successfully!');
    
    return {
        type: LOGIN_SUCCESS,
        data: resp
    };
}