import toastr from 'toastr';

import {REGISTER_SUCCESS} from '../../../constants/AuthConstant';
import history from '../../../../common/history';

export default function RegisterSuccessAction(){
    //history.push('/');
    toastr.success('Register successfully!');
    
    return {
        type: REGISTER_SUCCESS
    };
}