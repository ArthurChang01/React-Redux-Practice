import {LOGIN_FAIL} from '../../../constants/AuthConstant';
import toastr from 'toastr';

export default function LoginFailAction(err_msg){
    toastr.error(err_msg, "Login fail!");
    
    return {
        type: LOGIN_FAIL,
        error_message: err_msg
    };
}