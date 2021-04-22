import { Button, Dialog, InputGroup } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { Box, Flex } from "components/Grid";
import { AspectRatio } from "components/AspectRatio";
import { MapboxImageLink } from "components/mapboxImageLink";
import AddDevice from "./AddDevice";
import { useClient } from "components/client";
import moment from "moment";
import DeleteDevice from "./DeleteDevice";

const Item = ({ id, label, latLng, createdAt, onDeleted = () => { } }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Box
      sx={{
        mb: 3,
        borderWidth: 1,
        borderColor: "gray.2",
        borderStyle: "solid",
        borderRadius: 8,
        overflow: "hidden"
      }}
    >
      <Box
        as="a"
        target="_blank"
        href={`https://www.google.com/maps/search/?api=1&query=${latLng[0]},${latLng[1]}`}
      >
        <AspectRatio ratio="21:9">
          <Box
            as="img"
            src={MapboxImageLink({
              height: 360,
              width: 360,
              pins: [{
                latitude: latLng[0],
                longitude: latLng[1],
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
      <Box
        sx={{
          px: 2,
          pt: 2,
          mx: -1,
          mb: 2,
          "input": {
            fontFamily: "monospace !important"
          }
        }}
      >
        <InputGroup readOnly={true} small={true} leftIcon="key" defaultValue={id} />
      </Box>
      <Flex alignItems="center" px={2} pb={2}>
        <Box pr={2} flexGrow={1}>
          <Box mb={1}>
            <Box as="span" fontWeight="bold" fontSize={2} color="gray.5" >
              {label}
            </Box>
            <Box as="span" ml={1} fontSize={1} color="gray.4">
              {Number(latLng[0]).toPrecision(5)}, {Number(latLng[1]).toPrecision(5)}
            </Box>
          </Box>
          <Box>
            {moment(createdAt).format("dddd, DD MMMM YYYY")}
          </Box>
        </Box>
        <Box>
          <Dialog
            title="Delete device"
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
          >
            <DeleteDevice
              data={{ id, label }}
              onDeleted={onDeleted}
              onClose={() => setDialogOpen(false)}
            />
          </Dialog>
          <Button
            intent="danger"
            minimal={true}
            icon="trash"
            onClick={() => setDialogOpen(true)}
          />
        </Box>
      </Flex>
    </Box>
  )
}

const DevicesView = () => {
  const client = useClient();
  const [devices, setDevices] = useState([]);
  const [dialogOpen, setDialogOpen] = useState();

  const fetchDevice = async () => {
    try {
      const res = await client.devices.find({
        query: {
          $select: ["id", "label", "latitude", "longitude", "createdAt"]
        }
      });
      setDevices(res.data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchDevice();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box p={3} maxWidth={360} mx="auto">
      <Flex alignItems="center" mb={3}>
        <Box flexGrow={1}>
          Devices
        </Box>
        <Box>
          <Button
            minimal={true}
            icon="plus"
            text="Register new Device"
            onClick={() => setDialogOpen("add")}
          />
        </Box>
      </Flex>
      <Box mb="40px">
        {devices.map(({ id, label, latitude, longitude, createdAt }) => (
          <Item
            key={id}
            id={id}
            latLng={[latitude, longitude]}
            label={label}
            date={createdAt}
            onDeleted={fetchDevice}
          />
        ))}
      </Box>
      <Dialog
        title="Register new Device"
        isOpen={dialogOpen === "add"}
        onClose={() => setDialogOpen(null)}
      >
        <AddDevice
          onCreated={fetchDevice}
          onClose={() => setDialogOpen(null)}
        />
      </Dialog>
    </Box>
  )
}

export default DevicesView;