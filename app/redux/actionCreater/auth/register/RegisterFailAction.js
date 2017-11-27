import toastr from 'toastr';

import {REGISTER_FAIL} from '../../../constants/AuthConstant';

export default function RegisterFailAction(err_msg){
    console.log(err_msg);
    toastr.error(err_msg,"Register fail!");
    
    return {
        type: REGISTER_FAIL,
        error_message: err_msg
    };
}
