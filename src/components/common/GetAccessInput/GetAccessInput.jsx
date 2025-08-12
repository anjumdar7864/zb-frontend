import React from 'react'
import { Container, Input, Button } from './styles'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { commonAPICall } from '@/services/api/common';
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url';
import toast from 'react-hot-toast';

const EmailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});







export default function GetAccessInput() {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={EmailValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { data, isError, message, sessionExpired } = await commonAPICall(
            REQUEST_TYPES.POST,
            `${ENDPOINTS.REQUEST_DEMO}`,
            values
          );
          // console.log("check data log ", data);

          if (isError) {

            toast.error(message);
            return toast.error(message);
          }

          toast.success(data?.message);

        } catch (error) {

          toast.error(message);
          console.log(error);
        }
       
        // console.log("Submitted values:", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleChange, values, errors }) => (
        <Form>
          <Container>
            <Input onChange={handleChange} type="text" name='email' placeholder="Work Email" />
            <Button type="submit" disabled={isSubmitting || !!errors.email || !values.email}>Request Demo</Button>
          </Container>
        </Form>
      )}
    </Formik>
  )
}