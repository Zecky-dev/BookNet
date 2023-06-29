import * as yup from 'yup';

const ERRORS = {
    required: "Please fill this blank area.",
    email: "You should pass valid email address to this area.",
    string: "You should pass only alphabetical characters to this area.",
    numeric: "You should pass only numerical characters to this area.",
    min: (type,min) => { type === "numeric" ? `You should pass minimum ${min} value to this area` : `Length of this area must be minimum ${min} characters length.`},
    max: (max) => { type === "numeric" ? `You should pass maximum ${max} value to this area` : `Length of this area must be maximum ${max} characters length.`},
}



const loginValidationSchema = yup.object().shape({
    email: yup.string(ERRORS.string).email(ERRORS.email).required(ERRORS.required),
    password: yup.string(ERRORS.string).required(ERRORS.required),
});

const registerValidationSchema = yup.object().shape({
    nameSurname: yup.string(ERRORS.string).min(3,(min) => ERRORS.min("text",min)).max(45,(max) => ERRORS.max("text",max)).required(ERRORS.required),
    age: yup.number().typeError(ERRORS.numeric).min(18,(min) => ERRORS.min("numeric",min)).max(100,(max) => ERRORS.max("numeric",max)).required(ERRORS.required),
    email: yup.string().typeError(ERRORS.string).email(ERRORS.email).required(ERRORS.required),
    password: yup.string().typeError(ERRORS.string).required(ERRORS.required),
    passwordAgain: yup.string().typeError(ERRORS.string).oneOf([yup.ref('password'), null], 'Passwords must match.'),
})



export {loginValidationSchema,registerValidationSchema};