import { Box, Grid } from "@mui/material";
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
import { CustomSelect, type ICustomSelect } from "../controllers/CustomSelect";
import {
  ProfileUploader,
  type IFileUploader,
  type IProfileUploader,
} from "../common/Uploader";

interface IInputs {
  columnGridSize?: TColumnGridSize;
  side?: {
    profileUploader?: {
      name: string;
      props: IProfileUploader;
    };
    fileUploader?: {
      name: string;
      props: IFileUploader;
    };
    columnGridSize?: TColumnGridSize;
  };
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
    | {
        type: "select";
        props: ICustomSelect;
        name: string;
      }
  >;
  form: {
    validations: TEmptyFunctionVoid;
    initialValues: Record<string, TAny>;
    onSubmit: (values: TAny) => void;
    onCancel?: () => void;
    loading?: boolean;
  };
}

interface IAddEditProvider {
  title: string;
  breadcrumbs: IBreadcrumbsItems[];
  isEdit?: boolean;
  isLoading: boolean;
  inputs?: IInputs;
}

export const AddEditProvider: FC<IAddEditProvider> = ({
  breadcrumbs,
  // isLoading,
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
      <Box className="page-container">
        {inputs ? (
          <Box
            className="form-container"
            component="form"
            method="post"
            onSubmit={formIK.handleSubmit}
          >
            <Grid container className="grid-container">
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

            {inputs?.side?.profileUploader && (
              <ProfileUploader
                value={formIK.values[inputs?.side?.profileUploader.name]}
                onChange={(file) =>
                  formIK.setFieldValue(inputs?.side?.profileUploader.name, file)
                }
                errorMessage={
                  inputs?.side?.profileUploader.name &&
                  formIK.errors[inputs?.side?.profileUploader.name]
                    ? {
                        text: formIK.errors[
                          inputs?.side?.profileUploader.name
                        ] as string,
                        type: "error",
                      }
                    : inputs?.side?.profileUploader?.props?.errorMessage
                }
                {...inputs?.side?.profileUploader["props"]}
              />
            )}
          </Box>
        ) : null}
      </Box>
    </Grid>
  );
};

const InputItems = ({ type, props, name, formIK, columnGridSize }: TAny) => {
  let result;

  switch (type) {
    case "textfield":
      result = (
        <CustomTextfield
          fullWidth
          name={name}
          errorMessage={{ text: formIK && formIK.errors[name] }}
          onChange={formIK.handleChange}
          value={formIK.values[name]}
          {...props}
        />
      );
      break;

    case "autocomplete":
      result = (
        <CustomAutoComplete
          onChange={(_, newValue) => {
            const values = isArray(newValue)
              ? newValue?.map((item: TAny) =>
                  typeof item === "string" ? item : item.value
                )
              : newValue;
            formIK.setFieldValue(name, values);
          }}
          value={formIK.values[name]}
          errorMessage={
            formIK && formIK.errors[name]
              ? {
                  text: formIK && formIK.errors[name],
                }
              : props?.errorMessage
          }
          {...(props ?? { options: [] })}
        />
      );
      break;

    case "select":
      result = (
        <CustomSelect
          name={name}
          value={(formIK && formIK.values[name]) ?? ""}
          onChange={formIK && formIK.handleChange}
          errorMessage={
            formIK && formIK.errors[name]
              ? {
                  text: formIK && formIK.errors[name],
                }
              : props?.errorMessage
          }
          {...(props ?? { items: [] })}
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
