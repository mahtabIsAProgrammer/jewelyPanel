import { object, string } from "yup";

export const validationCategories = () => {
  return object().shape({
    name: string().trim().required("the input is required"),
    description: string().trim().required("the input is required"),
  });
};
