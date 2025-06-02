import type { FC } from "react";
import { AddEditProvider } from "../../advance/AddEditProvider";
import { useCreateUser } from "../../../services/hooks/users";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { validationUsers } from "../../../helpers/utils/validations/users";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const { mutate: createUser } = useCreateUser();
  const handleSubmit = (values: Users) => {
    createUser(values, {
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
      title="User"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "users", link: "/users", type: "list" },
        { name: "users", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={false}
      inputs={{
        // columnGridSize: 5.9,
        fields: [
          {
            type: "textfield",
            name: "fullName",
            props: { customLabel: "Full Name" },
          },
          { type: "textfield", name: "email", props: { customLabel: "Email" } },
          {
            type: "select",
            name: "gender",
            props: {
              customLabel: "Gender",
              items: [
                { label: "female", value: 1 },
                { label: "male", value: 2 },
                { label: "other", value: 3 },
              ],
            },
          },
          {
            type: "textfield",
            name: "password",
            props: { customLabel: "Password", type: "password" },
          },
        ],
        side: {
          profileUploader: {
            name: "imageUrl",
            props: {
              customLabel: "Upload Profile",
            },
          },
        },
        form: {
          initialValues: {
            email: "",
            gender: "",
            password: "",
            fullName: "",
            imageUrl: "",
          },
          validations: validationUsers,
          onSubmit: handleSubmit,
          loading: false,
        },
      }}
    />
  );
};

export default AddEdit;
