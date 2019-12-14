import React, {useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

function NewUserForm({ values, errors, touched }) {

  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="text" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="Name" />
      </div>
      <label>
        <div>
          {errors.TOS && <p>{errors.TOS}</p>}
          <Field type="checkbox" name="TOS" checked={values.TOS} />
        </div>
      </label>
      <button type="submit" >Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, password, email, TOS }) {
    return {
      name: name || "",
      password: password || "",
      email: email || "",
      TOS: TOS || false,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required(),
    password: Yup.string()
      .min(6, "Password must be 6 character of longer")
      .required("Password is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    TOS: Yup.boolean()
      .oneOf([true], 'Must Accept Terms of Service to Continue')
    
  }),
  
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  }
})(NewUserForm);




export default FormikLoginForm;