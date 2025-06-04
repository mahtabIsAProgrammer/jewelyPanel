import { type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateFaq,
  useUpdateFaq,
  useGetFaqById,
} from "../../../services/hooks/faq";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { validationFaqs } from "../../../helpers/utils/validations/faqs";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: createFaq } = useCreateFaq();
  const { mutate: UpdateFaq } = useUpdateFaq(id || "");

  const { data: geFaqById, isLoading } = useGetFaqById(id);

  const { description, title } =
    (geFaqById as unknown as { data: Faqs })?.data ?? {};

  const handleSubmit = (values: Faqs) => {
    const finalValues = { ...values };
    finalValues.title = finalValues.title || "";
    finalValues.description = finalValues.description || "";
    console.log("🚀 ~ handleSubmit ~ finalValues:", finalValues);

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
        { name: "faqs", link: "/faqs", type: "list" },
        { name: "faq", link: "", type: "add" },
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
            type: "textfield",
            name: "description",
            isFullWidth: true,
            props: {
              customLabel: "description",
              isTextarea: true,
              required: true,
            },
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
