import { Button, Classes, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useClient } from "components/client";

const Scheme = Yup.object().shape({
  'last-word': Yup.string()
    .oneOf(["CONFIRM"], 'Not match')
    .required('Field is required')
})

const DeleteDevice = ({
  data,
  onClose,
  onDeleted
}) => {
  const client = useClient();
  return (
    <Formik
      validationSchema={Scheme}
      initialValues={{
        "last-word": "",
      }}
      onSubmit={async (_values, { setErrors, setSubmitting }) => {
        try {
          await client.devices.remove(data.id);
          onClose();
          onDeleted();
        } catch (err) {
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={Classes.DIALOG_BODY}>
            <h5 className={Classes.HEADING}>You are about to delete this `{data.label}` device.</h5>
            <FormGroup
              label={(<>Please type <strong>CONFIRM</strong> to confirm</>)}
              intent={errors['last-word'] ? 'danger' : 'none'}
            >
              <InputGroup
                name="last-word"
                value={values["last-word"]}
                onChange={handleChange}
                placeholder="type here"
                intent={errors['last-word'] ? 'danger' : 'none'}
              />
            </FormGroup>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <Button
              text="I understand the consequences, delete this device"
              intent="danger"
              type="submit"
              fill={true}
              disabled={Object.entries(errors).length > 0}
            />
          </div>
        </form>
      )}
    </Formik>
  )
}

export default DeleteDevice;