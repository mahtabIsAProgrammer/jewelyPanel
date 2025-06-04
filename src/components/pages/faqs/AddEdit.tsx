import { type FC } from "react";
import {
  useCreateFaq,
  useGetFaqById,
  useUpdateFaq,
} from "../../../services/hooks/faq";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { validationFaqs } from "../../../helpers/utils/validations/faqs";
import { useNavigate, useParams } from "react-router-dom";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: createFaq } = useCreateFaq();
  const { mutate: UpdateFaq } = useUpdateFaq(id || "");

  const { data: getProductById, isLoading } = useGetFaqById(id);

  const { description, title } =
    (getProductById as unknown as { data: Faqs })?.data ?? {};

  const handleSubmit = (values: Faqs) => {
    const finalValues = { ...values };
    finalValues.title = finalValues.title || "";
    finalValues.description = finalValues.description || "";

    if (isEdit)
      UpdateFaq(finalValues, {
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
    navigate("/faqs");
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
      isLoading={isLoading}
      inputs={{
        columnGridSize: 12,
        fields: [
          {
            type: "textfield",
            name: "title",
            props: { customLabel: "title" },
          },
          {
            type: "textfield",
            name: "description",
            props: { customLabel: "description" },
          },
        ],
        form: {
          initialValues: {
            description: description || null,
            title: title || null,
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
