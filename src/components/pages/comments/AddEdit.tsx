import type { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateComment,
  useUpdateComment,
  useGetCommentById,
} from "../../../services/hooks/comments";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { validationComments } from "../../../helpers/utils/validations/comments";

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
        { name: "comments", link: "/comments", type: "list" },
        { name: "comment", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={isLoading}
      inputs={{
        columnGridSize: 5.9,
        fields: [
          {
            type: "textfield",
            name: "userId",
            props: { customLabel: "user" },
          },
          {
            type: "textfield",
            name: "productId",
            props: { customLabel: "product" },
          },
          {
            type: "textfield",
            name: "rate",
            props: { customLabel: "rate" },
          },
          {
            type: "textfield",
            name: "title",
            props: { customLabel: "title" },
          },
          {
            type: "textfield",
            name: "comment",
            props: { customLabel: "Text" },
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
