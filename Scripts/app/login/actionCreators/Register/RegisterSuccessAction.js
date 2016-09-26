import * as toastr from 'toastr';

import {REGISTER_SUCCESS} from '../../constants/LoginConstant';

export function RegisterSuccessAction(){
    toastr.success('Register successfully!');
    
    return {
        type: REGISTER_SUCCESS
    };
}