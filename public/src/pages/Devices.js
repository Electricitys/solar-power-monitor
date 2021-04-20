import { Button, Dialog, InputGroup } from "@blueprintjs/core";
import { useState } from "react";
import { Box, Flex } from "components/Grid";
import { AspectRatio } from "components/AspectRatio";
import { MapboxImageLink } from "components/mapboxImageLink";
import AddDevice from "./AddDevice";

const Item = ({ id, label, latLng }) => {
  return (
    <Box
      sx={{
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
      <Box p={2}>
        <Box
          sx={{
            mx: -1,
            mb: 2,
            "input": {
              fontFamily: "monospace !important"
            }
          }}
        >
          <InputGroup readOnly={true} small={true} leftIcon="key" defaultValue={id} />
        </Box>
        <Box fontWeight="bold" fontSize={2} color="gray.5" mb={1}>{label}</Box>
        <Box>
          <Box as="span">{latLng[0]}</Box>
          <span>, </span>
          <Box as="span">{latLng[1]}</Box>
        </Box>
      </Box>
    </Box>
  )
}

const DevicesView = () => {
  const [devices, setDevices] = useState([]);
  const [dialogOpen, setDialogOpen] = useState();
  return (
    <Box p={3}>
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
      <Box>
        <Item
          id={"asdasd"}
          latLng={[1.463888752006268, 124.8287421505452]}
          label={"askjansdk"}
        />
      </Box>
      <Dialog
        title="Register new Device"
        isOpen={dialogOpen === "add"}
        onClose={() => setDialogOpen(null)}
      >
        <AddDevice onClose={() => setDialogOpen(null)} />
      </Dialog>
    </Box>
  )
}

export default DevicesView;