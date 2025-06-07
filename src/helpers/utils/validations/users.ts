import { object, string } from "yup";

export const validationUsers = () => {
  return object().shape({
    email: string().email().trim().required("the input is required"),
    firstName: string().trim().required("the input is required"),
    lastName: string().trim().required("the input is required"),
    userName: string().trim().required("the input is required"),
    password: string().trim().required("the input is required"),
  });
};
