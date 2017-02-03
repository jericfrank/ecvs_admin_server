import Validator from 'validator';

export function validateWorkers(data) {
    let errors = {};

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'This field is required'
    }

    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'This field is required'
    }

    if(Validator.isEmpty(data.birthdate)) {
        errors.birthdate = 'This field is required'
    }

    if(Validator.isEmpty(data.remarks)) {
        errors.remarks = 'This field is required'
    }

    return {
        errors,
        isValid: _.isEmpty(errors),
    }
}