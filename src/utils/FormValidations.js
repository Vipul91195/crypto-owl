import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
    username: Yup.string()
        .email("Invalid email address.")
        .required("E-mail is Required."),
    password: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long.")
        .required("Password is Required."),
});

export const ForgotValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address.")
        .required("E-mail is Required."),
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
    point: Yup.string()
        .required("Points is required.")
        .matches(/^\d+$/, "Allow digits only."),
    awardPoints: Yup.string().required("Point type is required.").nullable(),
});

export const BusinessFormValidationSchema = Yup.object({
    business: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Name of the company is required.")
        .matches(/^\p{L}+$/u, "Special characters not allowed."),
    companyNumber: Yup.string()
        .trim()
        .max(10, "Maximum 10 char.")
        .required("Company' Number required."),
    ownerName: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Owner's Name required."),
    ownerEmail: Yup.string()
        .email("Invalid email address.")
        .required("E-mail is Required."),
    vatNumber: Yup.string()
        .trim()
        .max(20, "Maximum 9 char.")
        .required("VAT Number required.")
        .matches(/^\p{L}+$/u, "Special characters not allowed."),
    address: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Address is required.")
});


export const CustomerFormValidationSchema = Yup.object({
    Name: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Name is required.")
        .matches(/^\p{L}+$/u, "Special characters not allowed."),
    Email: Yup.string()
        .email("Invalid email address.")
        .required("E-mail is Required."),
    Phone: Yup.string()
        .trim()
        .max(10, "Maximum 10 char.")
        .required("Phone Number is required."),
    address: Yup.string()
        .trim()
        .min(2, "Must be 2 char long.")
        .max(20, "Maximum 20 char.")
        .required("Address is required.")
});