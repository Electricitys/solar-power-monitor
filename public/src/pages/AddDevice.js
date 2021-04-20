import { Button, Classes, FormGroup, InputGroup } from "@blueprintjs/core";
import { Formik } from "formik";
import { Box, Flex } from "components/Grid";
import { MapboxImageLink } from "components/mapboxImageLink";
import { AspectRatio } from "components/AspectRatio";

const AddDevice = ({
  onClose,
}) => {
  return (
    <Formik
      initialValues={{
        "label": "",
        "lat": "1.4637814986614717",
        "long": "124.82880652355924"
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
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
            <FormGroup
              label="Label"
              labelInfo="(required)"
            >
              <InputGroup
                name="label"
                value={values["label"]}
                onChange={handleChange}
              />
            </FormGroup>
            <Flex>
              <Box mr={1}>
                <FormGroup
                  label="Latitude"
                  labelInfo="(required)"
                >
                  <InputGroup
                    name="lat"
                    value={values["lat"]}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Box>
              <Box ml={1}>
                <FormGroup
                  label="Longitude"
                  labelInfo="(required)"
                >
                  <InputGroup
                    name="long"
                    value={values["long"]}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Box>
            </Flex>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button minimal intent="danger" text="Close" onClick={() => onClose()} />
              <Button intent="primary" type="submit" text="Simpan" />
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default AddDevice;