import type { FC } from "react";
import { map } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateComment,
  useUpdateComment,
  useGetCommentById,
} from "../../../services/hooks/comments";
import { useUserSearch } from "../../../services/hooks/users";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { useProductSearch } from "../../../services/hooks/products";
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

  const { data: userSearch } = useUserSearch();

  const { data: productSearch } = useProductSearch();

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
            name: "title",
            props: { customLabel: "title" },
          },
          {
            type: "select",
            name: "rate",
            props: {
              customLabel: "rate",
              items: [
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
              ],
            },
          },
          {
            type: "autocomplete",
            name: "userId",
            props: {
              customLabel: "user",
              options: map(userSearch, ({ firstName, lastName, id }) => ({
                value: id,
                label: firstName + " " + lastName,
              })),
            },
          },
          {
            type: "autocomplete",
            name: "productId",
            props: {
              customLabel: "product",
              options: map(productSearch, ({ name, id }) => ({
                value: id,
                label: name,
              })),
            },
          },
          {
            type: "textfield",
            name: "comment",
            isFullWidth: true,
            props: { customLabel: "Text", isTextarea: true },
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
