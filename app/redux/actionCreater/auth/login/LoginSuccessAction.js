import toastr from 'toastr';

import {LOGIN_SUCCESS} from '../../../constants/AuthConstant';
import history from '../../../../common/history';

export default function LoginSuccessAction(resp){
    history.push('/');
    toastr.success('LogIn successfully!',"");
    
    return {
        type: LOGIN_SUCCESS,
        data: resp
    };
}