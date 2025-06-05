import { object, string } from "yup";

export const validationComments = () => {
  return object().shape({
    comment: string().trim().required("the input is required"),
    productId: string().trim().required("the input is required"),
    title: string().trim().required("the input is required"),
    userId: string().trim().required("the input is required"),
  });
};
