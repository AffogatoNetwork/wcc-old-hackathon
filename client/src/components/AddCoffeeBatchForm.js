import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Inputform(props) {
  const submitFn =  props.onSubmitFn;
  return (
    <div>
      <h1>Add coffee batch:</h1>
      <Formik
        initialValues={{
          producer: "",
          address: "",
          amount: 0,
          description: ""
        }}
        validate={values => {
          let errors = {};
          if (!values.address) {
            errors.address = "Required";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          if (!values.amount || values.amount < 0) {
            errors.amunt = "Must be a positive value";
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
            <Field type="text" name="producer" placeholder=" Producer Name" />
            <ErrorMessage name="producer" component="div"  />
            <Field type="text" name="address" placeholder="Producer Address" />
            <ErrorMessage name="address" component="div" />
            <Field type="text" name="amount" placeholder="Amount" />
            <ErrorMessage name="amount" component="div" />
            <Field type="text" name="description" placeholder="Coffee Description" />
            <ErrorMessage name="description" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function AddCoffeeBatchForm(props) {
  return <Inputform onSubmitFn={props.onCoffeeBatchAdd} />;
}

export default AddCoffeeBatchForm;
