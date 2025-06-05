import { object, string } from "yup";

export const validationBlogs = () => {
  return object().shape({
    title: string().trim().required("the input is required"),
  });
};
