import Validator from 'validator';

export function validateLogin(data) {
    let errors = {};

    if(Validator.isEmpty(data.username)) {
        errors.username = 'This field is required'
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'This field is required'
    }

    return {
        errors,
        isValid: _.isEmpty(errors),
    }
}