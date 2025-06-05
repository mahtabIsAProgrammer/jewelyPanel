import { object, string } from "yup";

export const validationProducts = () => {
  return object().shape({
    name: string().trim().required("the input is required"),
    price: string().trim().required("the input is required"),
    // image: string().trim().required("the input is required"),
    categoryId: string().trim().required("the input is required"),
  });
};
