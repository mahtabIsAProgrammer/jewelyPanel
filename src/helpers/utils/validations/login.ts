import { object, string } from "yup";

export const LoginValidation = () => {
  return object().shape({
    email: string().trim().email().required("the input is required"),
    password: string().trim().required("the input is required"),
  });
};
