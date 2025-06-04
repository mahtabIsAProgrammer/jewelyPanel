import type { FC } from "react";
import {
  useCreateBlog,
  useGetBlogById,
  useUpdateBlog,
} from "../../../services/hooks/blogs";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { validationBlogs } from "../../../helpers/utils/validations/blogs";
import { useNavigate, useParams } from "react-router-dom";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: createBlog } = useCreateBlog();
  const { mutate: updateBlog } = useUpdateBlog(id || "");

  const { data: getBlogById, isLoading } = useGetBlogById(id);

  const { authorId, authorName, commentsCount, published, thumbnail, title } =
    (getBlogById as unknown as { data: Blogs })?.data ?? {};

  const handleSubmit = (values: Blogs) => {
    const finalValues = { ...values };
    finalValues.authorId = finalValues.authorId || "";
    finalValues.authorName = finalValues.authorName || "";
    finalValues.commentsCount = finalValues.commentsCount || 0;
    finalValues.published = finalValues.published || "";
    finalValues.thumbnail = finalValues.thumbnail || "";
    finalValues.title = finalValues.title || "";

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
            name: "title",
            props: { customLabel: "title" },
          },
          {
            type: "autocomplete",
            name: "authorId",
            props: { customLabel: "author", options: [] },
          },
        ],
        side: {
          uploader: {
            name: "thumbnail",
            props: { customLabel: "image", type: "file" },
          },
        },
        form: {
          initialValues: {
            authorId: authorId || null,
            authorName: authorName || null,
            commentsCount: commentsCount || null,
            published: published || null,
            thumbnail: thumbnail || null,
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
