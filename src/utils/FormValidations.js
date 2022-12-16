import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
    username: Yup.string()
        .email("Invalid email address")
        .required("E-mail is Required"),
    password: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long")
        .required("Password is Required"),
});

export const ForgotValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("E-mail is Required"),
});

export const ResetPasswordValidationSchema = Yup.object({
    password: Yup.string().required('Password is required')
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long")
        .required("Password is Required")
    ,
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .trim()
        .min(8, "Must be 8 char long")
        .required("Password is Required"),
});