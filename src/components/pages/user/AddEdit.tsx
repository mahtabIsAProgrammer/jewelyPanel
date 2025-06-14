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

  const { lastName, email, firstName, gender, imageUrl, userName, password } =
    (userGetById as unknown as { data: Users & { password: string } })?.data ??
    {};

  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser(id || "");

  return (
    <AddEditProvider
      title="User"
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "users", link: "/users", type: "list" },
        { name: "user", link: "", type: "add" },
      ]}
      isEdit={isEdit}
      isLoading={isLoading}
      inputs={{
        // columnGridSize: 5.9,
        fields: [
          {
            type: "textfield",
            name: "firstName",
            props: { customLabel: "First Name", required: true },
          },
          {
            type: "textfield",
            name: "lastName",
            props: { customLabel: "Last Name", required: true },
          },
          {
            type: "textfield",
            name: "userName",
            props: { customLabel: "User Name", required: true },
          },
          {
            type: "textfield",
            name: "email",
            props: { customLabel: "Email", required: true },
          },
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
            props: {
              customLabel: "Password",
              type: "password",
              disabled: isEdit,
              required: !isEdit,
            },
          },
        ],
        side: {
          uploader: {
            name: "imageUrl",
            props: {
              model: "users",
              type: "profile",
              customLabel: "Upload Profile",
            },
          },
        },
        form: {
          initialValues: {
            password: password || "",
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
