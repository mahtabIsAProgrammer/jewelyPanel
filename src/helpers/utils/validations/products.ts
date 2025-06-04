import { object, string } from "yup";

export const validationProducts = () => {
  return object().shape({
    name: string().trim().required("the input is required"),
    price: string().email().trim().required("the input is required"),
    // image: string().email().trim().required("the input is required"),
    categoryId: string().email().trim().required("the input is required"),
  });
};
