import { Card as BPCard } from "@blueprintjs/core";
import { Box } from "./Grid";

const Card = ({ children, ...props }) => {
  return (
    <Box as={BPCard} p={2} {...props}>
      {children}
    </Box>
  )
}

export default Card;