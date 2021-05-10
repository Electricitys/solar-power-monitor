import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import { useClient } from "components/client";
import { Box } from "components/Grid";
import { Formik } from "formik";
import { useHistory } from "react-router";

const Login = () => {
  const client = useClient();
  const history = useHistory();
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await client.doAuthenticate({
        strategy: "local",
        email: values["email"],
        password: values["password"]
      })
      history.push("/");
    } catch (err) {
      console.error(err);
      setErrors({
        "submit": err.message
      });
      setSubmitting(false);
    }
  }

  return (
    <Box mt={4} px={3} maxWidth={360} mx="auto">
      <Formik
        initialValues={{
          "email": "",
          "password": ""
        }}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleSubmit, handleChange, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            {errors["submit"] &&
              <Box mb={3}>
                <Callout intent="warning">
                  {errors["submit"]}
                </Callout>
              </Box>}
            <FormGroup
              label="Email"
              labelFor="f-email"
            >
              <InputGroup
                id="f-email"
                name="email"
                type="text"
                value={values["email"]}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup
              label="Password"
              labelFor="f-password"
            >
              <InputGroup
                id="f-password"
                name="password"
                type="password"
                value={values["password"]}
                onChange={handleChange}
              />
            </FormGroup>
            <Button
              fill={true}
              large={true}
              intent="primary"
              text="Login"
              type="submit"
              disabled={!!errors["submit"]}
              loading={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </Box >
  )
}

export default Login;