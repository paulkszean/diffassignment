import { TextField } from "@material-ui/core";
import { ErrorMessage, FieldProps } from "formik";
import React from "react";
import "./FormControl.css";

interface FormTextFieldInterface extends FieldProps {
  label?: string;
  additionalInputProps?: any;
  noPaddingMargin?: boolean;
  isRequired?: boolean;
  multiline?: false;
  rows?: number;
}

const FormTextField: React.FC<FormTextFieldInterface> = ({
  field,
  form: { touched, errors },
  label,
  additionalInputProps,
  noPaddingMargin = false,
  isRequired = false,
  multiline = false,
  rows,
  ...props
}) => {
  const showError = touched[field.name] && errors[field.name] !== undefined;

  return (
    <>
      <TextField
        label={label}
        id={field.name}
        {...field}
        {...props}
        autoComplete="false"
        InputProps={{
          disableUnderline: true,
          "data-testid": "cmptTestId-ApiInputForm-TextField",
          ...additionalInputProps,
        }}
        margin="none"
        fullWidth={true}
      />
      {showError && (
        <ErrorMessage
          component="div"
          name={field.name}
          className="errorMessage"
        />
      )}
    </>
  );
};

export default FormTextField;
