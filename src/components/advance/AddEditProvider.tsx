import { Box, Grid, Paper } from "@mui/material";
import { addEditPrivderSX } from "../../helpers/styles/advance";
import { HeaderPage } from "../common/HeaderPage";
import { type FC } from "react";
import {
  CustomTextfield,
  type TCustomTextfield,
} from "../controllers/CustomTextfield";
import {
  CustomAutoComplete,
  type ICustomAutoComplete,
} from "../controllers/CustomAutoComplete";
import { useFormik } from "formik";
import { CustomButton } from "../controllers/CustomButton";
import { isArray } from "lodash";

interface IAddEditProvider {
  title: string;
  breadcrumbs: IBreadcrumbsItems[];
  isEdit?: boolean;
  isLoading: boolean;
  inputs?: {
    columnGridSize: TColumnGridSize;
    fields: Array<
      | {
          type: "textfield";
          props: TCustomTextfield;
          name: string;
        }
      | {
          type: "autocomplete";
          props: ICustomAutoComplete;
          name: string;
        }
    >;

    side?: string;
    form: {
      validations: TEmptyFunctionVoid;
      initialValues: Record<string, TAny>;
      onSubmit: (values: TAny) => void;
      onCancel?: () => void;
      loading?: boolean;
    };
  };
}

export const AddEditProvider: FC<IAddEditProvider> = ({
  breadcrumbs,
  isLoading,
  title,
  inputs,
  isEdit,
}) => {
  const formIK = useFormik({
    initialValues: inputs?.form.initialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: inputs?.form.validations
      ? inputs?.form.validations()
      : undefined,
    onSubmit: (values: TAny) => {
      return inputs?.form.onSubmit(values);
    },
  });

  return (
    <Grid sx={addEditPrivderSX}>
      <HeaderPage
        title={isEdit ? "Edit" : "Add " + title}
        breadcrumbData={breadcrumbs}
      />
      <Box component={Paper} className="page-container">
        {isLoading ? (
          <Box>loading...</Box>
        ) : inputs ? (
          <Box
            className="form"
            component="form"
            method="post"
            onSubmit={formIK.handleSubmit}
          >
            {" "}
            <Grid className="grid-container">
              <Grid container className="inputs-wrapper">
                {inputs.fields.map((field, index) => {
                  return (
                    <InputItems
                      key={index}
                      type={field.type}
                      props={field.props}
                      name={field.name}
                      formIK={formIK}
                      columnGridSize={inputs.columnGridSize}
                    />
                  );
                })}
              </Grid>

              <Box className="buttons-wrapper">
                <CustomButton
                  type="submit"
                  variant="contained"
                  disabled={inputs.form.loading}
                  text="Submit"
                />

                {inputs.form.onCancel && (
                  <CustomButton
                    text="cancel"
                    variant="outlined"
                    onClick={inputs.form.onCancel}
                  />
                )}
              </Box>
            </Grid>
          </Box>
        ) : null}
      </Box>
    </Grid>
  );
};

const InputItems = ({ type, props, name, formIK, columnGridSize }) => {
  let result;

  switch (type) {
    case "textfield":
      result = (
        <CustomTextfield
          fullWidth
          name={name}
          errorMessege={{ text: formIK && formIK.errors[name] }}
          onChange={formIK.handleChange}
          value={formIK.values[name]}
          {...props}
        />
      );
      break;

    case "autocomplete":
      result = (
        <CustomAutoComplete
          errorMessege={{ text: formIK && formIK.errors[name] }}
          {...props}
          onChange={(_, newValue) => {
            const values = isArray(newValue)
              ? newValue?.map((item: TAny) =>
                  typeof item === "string" ? item : item.value
                )
              : newValue;
            formIK.setFieldValue("categories", values);
          }}
          value={formIK.values[name]}
        />
      );
      break;
    default:
      break;
  }
  return (
    <>
      <Grid
        size={{
          md: columnGridSize ?? 5.9,
          lg: columnGridSize ?? 5.9,
          sm: 12,
          xs: 12,
        }}
      >
        {result}
      </Grid>
    </>
  );
};
