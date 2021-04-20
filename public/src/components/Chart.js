import { Line, LineChart, XAxis } from "recharts";
import ResizeSensor from "components/ResizeSensor";
import { AspectRatio } from "components/AspectRatio";
import { Box } from "./Grid";

const Chart = ({ ratio, label, data }) => {
  return (
    <ResizeSensor>
      {({ width, height }) => (
        <div>
          <AspectRatio ratio={ratio}>
            <LineChart height={height} width={width} data={data}>
              <Line
                label={label}
                dataKey="b"
              />
              <XAxis
                mirror
                dataKey="a"
                type="number"
              />
            </LineChart>
            <Box
              sx={{
                py: 1,
                px: 2,
                bg: "rgb(255 255 255 / 75%)",
                position: "absolute",
                top: 0,
                left: 0
              }}
            >
              {label}
            </Box>
          </AspectRatio>
        </div>
      )}
    </ResizeSensor>
  )
}

export default Chart;