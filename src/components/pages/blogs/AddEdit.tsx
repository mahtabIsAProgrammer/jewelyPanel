import { map } from "lodash";
import type { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateBlog,
  useGetBlogById,
  useUpdateBlog,
} from "../../../services/hooks/blogs";
import { useUserSearch } from "../../../services/hooks/users";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { validationBlogs } from "../../../helpers/utils/validations/blogs";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: createBlog } = useCreateBlog();
  const { mutate: updateBlog } = useUpdateBlog(id || "");

  const { data: getBlogById, isLoading } = useGetBlogById(id);

  const { data: userSearch } = useUserSearch();

  const { authorId, published, imageUrl, title, details } =
    (getBlogById as unknown as { data: Blogs })?.data ?? {};

  const handleSubmit = (values: Blogs) => {
    const finalValues = { ...values };
    finalValues.title = finalValues.title || "";
    finalValues.details = finalValues.details || "";
    finalValues.authorId = finalValues.authorId || "";
    finalValues.published = finalValues.published || "";
    finalValues.imageUrl = finalValues.imageUrl || "";

    if (isEdit)
      updateBlog(finalValues, {
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
      createBlog(values, {
        onSuccess: () => {
          successAlert({
            title: "Successfully Added!",
          });
        },
        onError: () => {
          errorAlert({ title: "Problem has occurred on the server side!" });
        },
      });
    navigate("/blogs");
  };

  return (
    <AddEditProvider
      title="Blog"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "blogs", link: "/blogs", type: "list" },
        { name: "blog", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={isLoading}
      inputs={{
        columnGridSize: 5.9,
        fields: [
          {
            type: "textfield",
            name: "title",
            props: { customLabel: "title", required: true },
          },
          {
            type: "autocomplete",
            name: "authorId",
            props: {
              required: true,
              customLabel: "author",
              options: map(userSearch, ({ firstName, lastName, id }) => ({
                value: id,
                label: firstName + " " + lastName,
              })),
            },
          },
          {
            type: "editorQuill",
            name: "details",
            isFullWidth: true,
            props: { customLabel: "details" },
          },
        ],
        side: {
          uploader: {
            name: "imageUrl",
            props: { customLabel: "image", type: "file", model: "blogs" },
          },
        },
        form: {
          initialValues: {
            authorId: authorId || null,
            published: published || null,
            details: details || null,
            imageUrl: imageUrl || null,
            title: title || null,
          },
          validations: validationBlogs,
          onSubmit: handleSubmit,
          loading: false,
        },
      }}
    />
  );
};

export default AddEdit;
