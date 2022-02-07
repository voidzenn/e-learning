import userApi from '../apis/userApi';
import { SIGN_IN } from './types';

export const signIn = (formData) => async dispatch => {
    var data = {};
    var submitDisabled = true;
    const email = formData.get('email');
    const password = formData.get('password');
    const users = {
        email: email,
        password: password
    }
    // if all fields are not blank 
    if (users.email != '' && users.password != '') {
        await userApi.post('/sign-in', users)
        .then(response => {
            // this is used for error checking display
            data = {
                submitDisabled: false,
                errors: response.data.errors,
                message: response.data.message
            }
        })
    }else if (users.email == '' && users.password != '') {
        data = { submitDisabled ,email: 'Email should not be empty' }
    }else if (users.email != ''  && users.password == '') {
        data = { submitDisabled ,password: 'Email should not be empty' }
    }else {
        data = {
            submitDisabled,
            email: 'Email should not be empty',
            password: 'Password should not be empty'
        }
    }

    dispatch({
        type: SIGN_IN,
        payload: data
    });
}

// check if in email format
export const validateEmail = email => dispatch => {
    var submitDisabled = true;
    var check = /\S+@\S+\.\S+/;
    const validation = check.test(email) == true ? '' : 'Invalid Email';

    if (validation == true) {
        submitDisabled = false;
    }

    dispatch({
        type: SIGN_IN,
        payload: {
            submitDisabled,
            email: validation
        }
    });
}

// check if password is blank
export const validatePassword = password => dispatch => {
    var submitDisabled = true;
    const validation = password != '' ? '' : 'Password should not be empty';

    if (validation == '') {
        submitDisabled = false;
    }

    dispatch({
        type: SIGN_IN,
        payload: {
            submitDisabled,
            password: validation
        }
    });
}
