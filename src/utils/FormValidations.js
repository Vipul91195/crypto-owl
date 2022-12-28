import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
    username: Yup.string()
        // .email("Invalid email address.")
        .min(3, "Must be 3 char long.")
        .required("E-mail is required."),
    password: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long.")
        .required("Password is Required."),
});

export const ForgotValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address.")
        .required("E-mail is required."),
});

export const ResetPasswordValidationSchema = Yup.object({
    password: Yup.string().required('Password is required.')
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long.")
        .required("Password is Required.")
    ,
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
        .trim()
        .min(8, "Must be 8 char long.")
        .required("Password is Required."),
});


export const AwardPointValidationSchema = Yup.object({
    amount: Yup.number()
        .required("Points are required."),
    reward_type: Yup.string().required("Point type is required.").nullable(),
});

export const BusinessFormValidationSchema = Yup.object({
    business_name: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Name of the company is required.")
        .matches(/^\p{L}+$/u, "Special characters not allowed."),
    company_no: Yup.string()
        .trim()
        .max(10, "Maximum 10 char.")
        .required("Company's Number required."),
    owner_name: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Owner's Name required."),
    owner_email: Yup.string()
        .email("Invalid email address.")
        .required("E-mail is required."),
    vat_no: Yup.string()
        .trim()
        .max(20, "Maximum 9 char.")
        .required("VAT Number required.")
        .matches(/^\w+$/u, "Special characters not allowed."),
    address: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Address is required.")
});


export const CustomerFormValidationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Name is required.")
        .matches(/^\p{L}+$/u, "Special characters not allowed."),
    email: Yup.string()
        .email("Invalid email address.")
        .required("E-mail is required."),
    phone_no: Yup.string()
        .trim()
        .max(10, "Maximum 10 char.")
        .required("Phone Number is required."),
    address: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .required("Address is required.")
});

export const MessageFormValidationSchema = Yup.object({
    subject: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .required("Subject is required."),
    message: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .required("Message is required.")
});

