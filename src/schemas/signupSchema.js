import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
});

export default signupSchema;
