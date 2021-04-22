import { Button, Classes, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import { Box, Flex } from "components/Grid";
import { MapboxImageLink } from "components/mapboxImageLink";
import { AspectRatio } from "components/AspectRatio";
import { useClient } from "components/client";
import * as Yup from "yup";

const Scheme = Yup.object().shape({
  'label': Yup.string().required('Field is required'),
  'lat': Yup.string().required('Field is required'),
  'long': Yup.string().required('Field is required'),
})

const AddDevice = ({
  onClose,
  onCreated
}) => {
  const client = useClient();
  return (
    <Formik
      validationSchema={Scheme}
      initialValues={{
        "label": "",
        "lat": "1.4637814986614717",
        "long": "124.82880652355924"
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          await client.devices.create({
            "label": values["label"],
            "latitude": values["lat"],
            "longitude": values["long"]
          });
          onClose();
          onCreated();
        } catch (err) {
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Box
            as="a"
            target="_blank"
            href={`https://www.google.com/maps/search/?api=1&query=${values["lat"]},${values["long"]}`}
          >
            <AspectRatio ratio="16:9">
              <Box
                as="img"
                src={MapboxImageLink({
                  height: 360,
                  width: 360,
                  pins: [{
                    latitude: values["lat"],
                    longitude: values["long"],
                  }]
                })}
                sx={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </AspectRatio>
          </Box>
          <div className={Classes.DIALOG_BODY}>
            <Flex>
              <Box mr={1} flexGrow={1}>
                <FormGroup
                  label="Latitude"
                  labelInfo="(required)"
                  intent={errors['lat'] ? 'danger' : 'none'}
                  helperText={errors['lat']}
                >
                  <InputGroup
                    name="lat"
                    value={values["lat"]}
                    onChange={handleChange}
                    intent={errors['lat'] ? 'danger' : 'none'}
                  />
                </FormGroup>
              </Box>
              <Box ml={1} flexGrow={1}>
                <FormGroup
                  label="Longitude"
                  labelInfo="(required)"
                  intent={errors['long'] ? 'danger' : 'none'}
                  helperText={errors['long']}
                >
                  <InputGroup
                    name="long"
                    value={values["long"]}
                    onChange={handleChange}
                    intent={errors['long'] ? 'danger' : 'none'}
                  />
                </FormGroup>
              </Box>
            </Flex>
            <FormGroup
              label="Label"
              labelInfo="(required)"
              intent={errors['label'] ? 'danger' : 'none'}
              helperText={errors['label']}
            >
              <InputGroup
                name="label"
                value={values["label"]}
                onChange={handleChange}
                intent={errors['label'] ? 'danger' : 'none'}
              />
            </FormGroup>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button minimal intent="danger" text="Close" onClick={() => onClose()} />
              <Button
                intent="primary"
                type="submit"
                text="Simpan"
                loading={isSubmitting}
                disabled={Object.entries(errors).length > 0}
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default AddDevice;