import { object, string } from "yup";

export const validationFaqs = () => {
  return object().shape({
    title: string().trim().required("the input is required"),
    description: string().trim().required("the input is required"),
  });
};
