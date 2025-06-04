import type { FC } from "react";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { AddEditProvider } from "../../advance/AddEditProvider";
import {
  useCreateComment,
  useGetCommentById,
  useUpdateComment,
} from "../../../services/hooks/comments";
import { validationComments } from "../../../helpers/utils/validations/comments";
import { useNavigate, useParams } from "react-router-dom";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: createComment } = useCreateComment();
  const { mutate: UpdateComment } = useUpdateComment(id || "");

  const { data: getCommentById, isLoading } = useGetCommentById(id);

  const { comment, isAccepted, productId, title, userId, rate } =
    (getCommentById as unknown as { data: Comments })?.data ?? {};

  const handleSubmit = (values: Comments) => {
    const finalValues = { ...values };
    finalValues.comment = finalValues.comment || "";
    finalValues.isAccepted = finalValues.isAccepted || false;
    finalValues.productId = finalValues.productId || "";
    finalValues.title = finalValues.title || "";
    finalValues.userId = finalValues.userId || "";
    finalValues.rate = finalValues.rate || 0;

    if (isEdit)
      UpdateComment(finalValues, {
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
      createComment(values, {
        onSuccess: () => {
          successAlert({
            title: "Successfully Added!",
          });
        },
        onError: () => {
          errorAlert({ title: "Problem has occurred on the server side!" });
        },
      });
    navigate("/comments");
  };

  return (
    <AddEditProvider
      title="Comment"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "products", link: "/products", type: "list" },
        { name: "products", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={isLoading}
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
            comment: comment || null,
            isAccepted: isAccepted || null,
            productId: productId || null,
            title: title || null,
            userId: userId || null,
            rate: rate || null,
          },
          validations: validationComments,
          onSubmit: handleSubmit,
          loading: false,
        },
      }}
    />
  );
};

export default AddEdit;
