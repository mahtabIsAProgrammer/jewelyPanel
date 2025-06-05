import { type FC } from "react";
import { map } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateProduct,
  useGetProductById,
  useUpdateProduct,
} from "../../../services/hooks/products";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { useCategoriesSearch } from "../../../services/hooks/categories";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { validationProducts } from "../../../helpers/utils/validations/products";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: UpdateProduct } = useUpdateProduct(id || "");

  const { data: getProductById, isLoading } = useGetProductById(id);

  const {
    brand,
    categoryId,
    color,
    image,
    material,
    name,
    price,
    size,
    style,
  } = (getProductById as unknown as { data: Products })?.data ?? {};

  const { data: categorySearch } = useCategoriesSearch();

  const handleSubmit = (values: Products) => {
    const finalValues = { ...values };
    finalValues.brand = finalValues.brand || "";
    finalValues.categoryId = finalValues.categoryId || "";
    finalValues.color = finalValues.color || "";
    finalValues.image = finalValues.image || "";
    finalValues.material = finalValues.material || "";
    finalValues.name = finalValues.name || null;
    finalValues.price = finalValues.price || null;
    finalValues.size = finalValues.size || null;
    finalValues.style = finalValues.style || null;

    if (isEdit)
      UpdateProduct(finalValues, {
        onSuccess: () => {
          successAlert({
            title: "Successfully Updated!",
          });
        },
        onError: () => {
          errorAlert({
            title: "Problem has occurred on the server side!",
          });
        },
      });
    else
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
    navigate("/products");
  };

  return (
    <AddEditProvider
      title="Product"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "products", link: "/products", type: "list" },
        { name: "product", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={isLoading}
      inputs={{
        columnGridSize: 5.9,
        fields: [
          {
            type: "textfield",
            name: "name",
            props: { customLabel: "Name", required: true },
          },
          {
            type: "textfield",
            name: "price",
            props: { customLabel: "price", required: true, isPrice: true },
          },
          {
            type: "autocomplete",
            name: "categoryId",
            props: {
              required: true,
              customLabel: "Categories",
              options: map(categorySearch, ({ id, name }) => ({
                value: id,
                label: name,
              })),
            },
          },
          { type: "textfield", name: "brand", props: { customLabel: "Brand" } },
          { type: "textfield", name: "color", props: { customLabel: "color" } },
          { type: "textfield", name: "style", props: { customLabel: "style" } },
          {
            type: "textfield",
            name: "size",
            props: { customLabel: "size", type: "number" },
          },
          {
            type: "textfield",
            name: "material",
            props: { customLabel: "material" },
          },
        ],
        side: {
          uploader: {
            name: "image",
            props: { type: "file", customLabel: "Image", model: "products" },
          },
        },
        form: {
          initialValues: {
            brand: brand || null,
            categoryId: categoryId || null,
            color: color || null,
            image: image || null,
            material: material || null,
            name: name || null,
            price: price || null,
            size: size || null,
            style: style || null,
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
