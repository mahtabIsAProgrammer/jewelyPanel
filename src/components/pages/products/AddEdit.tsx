import { type FC } from "react";
import { useCreateProduct } from "../../../services/hooks/products";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { validationProducts } from "../../../helpers/utils/validations/products";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const { mutate: createProduct } = useCreateProduct();
  const handleSubmit = (values: Products) => {
    createProduct(values, {
      onSuccess: () => {
        successAlert({
          title: "Successfully Added!",
        });
      },
      onError: () => {
        errorAlert({ title: "Problem has occurred on the server side!" });
      },
    });
  };
  return (
    <AddEditProvider
      title="Product"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "products", link: "/products", type: "list" },
        { name: "products", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={false}
      inputs={{
        columnGridSize: 5.9,
        fields: [
          {
            type: "textfield",
            name: "name",
            props: { label: "Name" },
          },
          { type: "textfield", name: "brand", props: { label: "Brand" } },
          { type: "textfield", name: "price", props: { label: "price" } },
          { type: "textfield", name: "color", props: { label: "color" } },
          { type: "textfield", name: "style", props: { label: "style" } },
          { type: "textfield", name: "size", props: { label: "size" } },
          { type: "textfield", name: "detial", props: { label: "detial" } },
          { type: "textfield", name: "material", props: { label: "material" } },
          {
            type: "textfield",
            name: "categoryId",
            props: { label: "Categories" },
          },
        ],
        form: {
          initialValues: {
            email: "",
            gender: "",
            password: "",
            fullName: "",
            imageUrl: "",
          },
          validations: validationProducts,
          onSubmit: handleSubmit,
          loading: false,
        },
      }}
    />
  );
};

export default AddEdit;
