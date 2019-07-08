import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Inputform(props) {
  const submitFn = props.onSubmitFn;
  return (
    <div>
      <h1>Add coffee batch:</h1>
      <Formik
        initialValues={{
          ERC20TokenContractAddress: ""
        }}
        validate={values => {
          let errors = {};
          if (!values.ERC20TokenContractAddress) {
            errors.ERC20TokenContractAddress = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          submitFn(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="text"
              name="ERC20TokenContractAddress"
              placeholder="ERC20 Token Contract Address"
            />
            <ErrorMessage name="ERC20TokenContractAddress" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function AdminForm(props) {
  return <Inputform onSubmitFn={props.onSetERC20Address} />;
}

export default AdminForm;
