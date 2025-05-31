import { type FC } from "react";
import { useCreateFaq } from "../../../services/hooks/faq";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { validationFaqs } from "../../../helpers/utils/validations/faqs";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const { mutate: createFaq } = useCreateFaq();
  const handleSubmit = (values: Faqs) => {
    createFaq(values, {
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
      title="Faq"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "frequently questions", link: "/faqs", type: "list" },
        { name: "frequently question", link: "", type: "add" },
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
          validations: validationFaqs,
          onSubmit: handleSubmit,
          loading: false,
        },
      }}
    />
  );
};
export default AddEdit;
