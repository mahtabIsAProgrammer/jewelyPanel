import { type FC } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

import { useLogin } from "../../services/hooks/auth";
import { CustomButton } from "../controllers/CustomButton";
import { loginSX } from "../../helpers/styles/pages/login";
import { CustomTextfield } from "../controllers/CustomTextfield";
import { errorAlert, successAlert } from "../../helpers/utils/messege";
import { LoginValidation } from "../../helpers/utils/validations/login";

const Login: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: loginUser, isPending } = useLogin();

  const formIK = useFormik({
    initialValues: { email: "", password: "" },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: LoginValidation(),
    onSubmit: async (values) => {
      loginUser(values, {
        onSuccess: () => {
          successAlert({
            title: "Login was Successful",
          });
          console.log("Login successful, navigating...");
          localStorage.setItem("isLoggedIn", "true");
        },
        onError: () => {
          errorAlert({ title: "Problem has occurred on the server side!" });
        },
      });
    },
  });

  return (
    <Grid container sx={loginSX}>
      <Grid container size={{ xs: 12, md: 5.5 }} className="container">
        <Grid className="inputs-wrapper">
          <Grid className="title-wrapper">
            <Typography className="title">Login</Typography>
            <Typography className="subtitle"></Typography>
          </Grid>
          <Box component="form" onSubmit={formIK.handleSubmit}>
            <Grid className="inputs">
              <CustomTextfield
                className="input"
                customLabel="Email"
                name="email"
                placeholder="xxxx@xxx.xx"
                value={formIK.values.email}
                onChange={formIK.handleChange}
                errorMessage={
                  formIK.errors.email
                    ? {
                        text: formIK.errors.email,
                        type: "error",
                      }
                    : undefined
                }
              />
              <CustomTextfield
                type="password"
                name="password"
                className="input"
                variant="outlined"
                placeholder="3092mk20"
                customLabel="Password"
                value={formIK.values.password}
                onChange={formIK.handleChange}
                errorMessage={
                  formIK.errors.password
                    ? {
                        text: formIK.errors.password,
                        type: "error",
                      }
                    : undefined
                }
              />
            </Grid>
            <Grid className="buttons-wrapper">
              <CustomButton
                disabled={isPending}
                type="submit"
                className="button"
                variant="contained"
                text="Login"
                onClick={() => navigate("/")}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
