import { Button, Grid, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { encode64 } from "../../helpers/dataHelper";
import { getApiV1Url, jsonHeader } from "../../helpers/urlHelper";
import {
  dbDataObjectInterface,
  formValueInterface,
} from "../../interfaces/interfaces";
import FormTextField from "../FormControl/FormTextField";
import "./Form.css";

interface ApiInputFormInterface {}

const initValues = {
  dateTimeCreated: "",
  usage: "",
  textValue: "",
};

const valueSchema = yup.object().shape({
  textValue: yup.string().required("This is a required field"),
});

const ApiInputForm: React.FC<ApiInputFormInterface> = () => {
  const [message, setMessage] = useState("");

  const onSubmitForm = (
    values: formValueInterface,
    { setSubmitting, resetForm }: FormikHelpers<formValueInterface>
  ) => {
    setTimeout(() => {
      // Determine url to call
      let urlToCall =
        values.usage === "left"
          ? `${getApiV1Url}/diff/left`
          : `${getApiV1Url}/diff/right`;

      // Convert the json string to base64 binary data,
      // only converts the text value field as the other fields in the json string are dynamic value,
      // the other fields in the json string will generate diff base64 binary data
      const dataEncodedString = encode64(JSON.stringify(values.textValue));

      // Create the typed object
      const data: dbDataObjectInterface = {
        formValues: values,
        data: JSON.stringify(values.textValue),
        dataEncodedString,
      };

      // Encode the entire typed object to base64 as the api endpoint only accepts base64 binary data,
      const encodedPayload = encode64(JSON.stringify(data));

      // Use promise to create post task
      const promise1 = axios.post(
        urlToCall,
        { data: encodedPayload },
        jsonHeader
      );
      
      // Catch promise response
      Promise.all([promise1]).then((values: any) => {
        // Only expects 1 data created successfully
        if (values && values.length === 1 && values[0].status === 201) {
          setMessage("Successfully created data");
          setTimeout(() => {
            setMessage("");
          }, 4500);
          resetForm();
        }
      });

      setSubmitting(false);
    }, 500);
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={valueSchema}
      onSubmit={onSubmitForm}
    >
      {(formikProps) => (
        <Form data-testid="cmptTestId-ApiInputForm">
          <Paper className="paperDiv">
            <Grid
              container
              justifyContent="center"
              alignItems="stretch"
              style={{ margin: 20 }}
            >
              <Grid item xs={6}>
                <Field
                  label={`Enter some value here`}
                  name="textValue"
                  variant="filled"
                  component={FormTextField}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="stretch"
              spacing={1}
            >
              <Grid item xs={6}>
                <Button
                  data-testid="cmptTestId-ApiInputForm-LeftButton"
                  name="left"
                  className="button"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    formikProps.values.dateTimeCreated =
                      new Date().toISOString();
                    formikProps.values.usage = "left";
                    formikProps.submitForm();
                  }}
                >
                  Create left data
                </Button>
                <Button
                  data-testid="cmptTestId-ApiInputForm-RightButton"
                  name="right"
                  onClick={() => {
                    formikProps.values.dateTimeCreated =
                      new Date().toISOString();
                    formikProps.values.usage = "right";
                    formikProps.submitForm();
                  }}
                  className="button"
                  variant="contained"
                  color="primary"
                >
                  Create right data
                </Button>
              </Grid>
            </Grid>
            {message && <Typography color="primary">{message}</Typography>}
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default ApiInputForm;
