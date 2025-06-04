import { type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateCategory,
  useUpdateCategory,
  useGetCategoryById,
} from "../../../services/hooks/categories";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { validationCategories } from "../../../helpers/utils/validations/categories";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory(id || "");

  const { data: getCategoryById, isLoading } = useGetCategoryById(id);

  const { name, imageUrl, description } =
    (getCategoryById as unknown as { data: Categories })?.data ?? {};

  const handleSubmit = (values: Categories) => {
    const finalValues = { ...values };
    finalValues.name = finalValues.name || "";
    finalValues.imageUrl = finalValues.imageUrl || "";
    finalValues.description = finalValues.description || "";

    if (isEdit)
      updateCategory(finalValues, {
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
      createCategory(values, {
        onSuccess: () => {
          successAlert({
            title: "Successfully Added!",
          });
        },
        onError: () => {
          errorAlert({ title: "Problem has occurred on the server side!" });
        },
      });
    navigate("/categories");
  };

  return (
    <AddEditProvider
      title="Category"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "categories", link: "/categories", type: "list" },
        { name: "category", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={isLoading}
      inputs={{
        columnGridSize: 5.9,
        fields: [
          {
            type: "textfield",
            name: "name",
            props: { customLabel: "Name" },
          },
          {
            type: "textfield",
            name: "descriptions",
            isFullWidth: true,
            props: { customLabel: "descriptions", isTextarea: true },
          },
        ],
        side: {
          uploader: {
            name: "imageUrl",
            props: { customLabel: "image", type: "file" },
          },
        },
        form: {
          initialValues: {
            name: name || null,
            imageUrl: imageUrl || null,
            description: description || null,
          },
          validations: validationCategories,
          onSubmit: handleSubmit,
          loading: false,
        },
      }}
    />
  );
};

export default AddEdit;
