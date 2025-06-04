import type { FC } from "react";
import { AddEditProvider } from "../../advance/AddEditProvider";
import {
  useCreateUser,
  useGetUserById,
  useUpdateUser,
} from "../../../services/hooks/users";
import { errorAlert, successAlert } from "../../../helpers/utils/messege";
import { validationUsers } from "../../../helpers/utils/validations/users";
import { useNavigate, useParams } from "react-router-dom";

const AddEdit: FC<IAddEditPage> = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userGetById, isLoading } = useGetUserById(id);

  const { lastName, email, firstName, gender, imageUrl, userName } =
    (userGetById as unknown as { data: Users })?.data ?? {};

  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser(id || "");

  return (
    <AddEditProvider
      title="User"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "users", link: "/users", type: "list" },
        { name: "users", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={isLoading}
      inputs={{
        // columnGridSize: 5.9,
        fields: [
          {
            type: "textfield",
            name: "firstName",
            props: { customLabel: "First Name" },
          },
          {
            type: "textfield",
            name: "lastName",
            props: { customLabel: "Last Name" },
          },
          {
            type: "textfield",
            name: "userName",
            props: { customLabel: "User Name" },
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
          uploader: {
            name: "imageUrl",
            props: {
              type: "profile",
              customLabel: "Upload Profile",
            },
          },
        },
        form: {
          initialValues: {
            password: "",
            userName: userName || null,
            email: email || null,
            gender: gender || null,
            firstName: firstName || null,
            lastName: lastName || null,
            imageUrl: imageUrl || null,
          },
          validations: validationUsers,
          onSubmit: (values: Users) => {
            const finalValues = { ...values };
            finalValues.userName = finalValues.userName || "";
            finalValues.email = finalValues.email || "";
            finalValues.gender = finalValues.gender || 0;
            finalValues.firstName = finalValues.firstName || "";
            finalValues.lastName = finalValues.lastName || "";
            finalValues.imageUrl = finalValues.imageUrl || null;

            if (isEdit)
              updateUser(finalValues, {
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
              createUser(finalValues, {
                onSuccess: () => {
                  successAlert({
                    title: "Successfully Added!",
                  });
                },
                onError: () => {
                  errorAlert({
                    title: "Problem has occurred on the server side!",
                  });
                },
              });
            navigate("/users");
          },
          loading: false,
        },
      }}
    />
  );
};

export default AddEdit;
