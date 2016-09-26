import * as toastr from 'toastr';

import {REGISTER_FAIL} from '../../constants/LoginConstant';

export function RegisterFailAction(err_msg){
    toastr.error(err_msg,"Register fail!");
    
    return {
        type: REGISTER_FAIL,
        error_message: err_msg
    };
}