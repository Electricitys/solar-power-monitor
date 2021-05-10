import { Line, LineChart, XAxis } from "recharts";
import ResizeSensor from "components/ResizeSensor";
import { AspectRatio } from "components/AspectRatio";
import { Box } from "./Grid";
import moment from "moment";

const Chart = ({ ratio, label, data, valueDataKey, axisDataKey }) => {
  return (
    <ResizeSensor>
      {({ width, height }) => (
        <div>
          <AspectRatio ratio={ratio}>
            <LineChart height={height} width={width} data={data}>
              <Line
                label={label}
                dataKey={valueDataKey}
              />
              <XAxis
                mirror
                dataKey={axisDataKey}
                type="number"
                scale="time"
                tickFormatter={(tick) => {
                  return moment.unix(tick).format("HH:mm:ss");
                  // return moment.unix(tick).format("ddd");
                }}
                domain={['dataMin', 'dataMax']}
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