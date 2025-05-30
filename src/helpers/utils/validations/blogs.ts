import { object, string } from "yup";

export const validationBlogs = () => {
  return object().shape({
    fullName: string().trim().required("the input is required"),
    email: string().email().trim().required("the input is required"),
  });
};
