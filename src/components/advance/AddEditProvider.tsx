import { Box, Grid } from "@mui/material";
import { addEditPrivderSX } from "../../helpers/styles/advance";
import { HeaderPage } from "../common/HeaderPage";
import type { FC } from "react";
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
      onSubmit: (values: Record<string, TAny>) => void;
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
      <Box p={4}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={5}>
            loading...
          </Box>
        ) : inputs ? (
          <Box component="form" method="post" onSubmit={formIK.handleSubmit}>
            {" "}
            <Grid>
              <Box display="flex" flexDirection="column" gap={3}>
                {inputs.fields.map((field, index) => {
                  const error =
                    formIK.touched[field.name] && formIK.errors[field.name];
                  switch (field.type) {
                    case "textfield":
                      return (
                        <CustomTextfield
                          key={index}
                          fullWidth
                          name={field.name}
                          error={Boolean(error)}
                          errorMessege={{ text: error as string }}
                          onChange={formIK.handleChange}
                          value={formIK.values[field.name]}
                          {...field.props}
                        />
                      );
                    case "autocomplete":
                      return (
                        <CustomAutoComplete
                          key={index}
                          errorMessege={{ text: error as string }}
                          {...field.props}
                          onChange={(_, newValue) => {
                            const values = isArray(newValue)
                              ? newValue?.map((item: TAny) =>
                                  typeof item === "string" ? item : item.value
                                )
                              : newValue;
                            formIK.setFieldValue("categories", values);
                          }}
                          value={formIK.values[field.name]}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </Box>

              <Box mt={4} display="flex" gap={2}>
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
