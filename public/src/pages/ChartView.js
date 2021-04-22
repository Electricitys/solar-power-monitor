import { Box } from "components/Grid";
import Card from "components/Card";
import { useMemo } from "react";
import Chart from "components/Chart";

const ChartView = ({ data }) => {
  const items = useMemo(() => {
    return new Array(10).fill(0).map((_, i) => ({
      a: i,
      b: Math.floor(Math.random() * 100)
    }))
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  const fields = [{
    label: "Power In",
    color: "red",
    data: items
  }, {
    label: "Power Out",
    color: "red",
    data: items
  }, {
    label: "Voltage In",
    color: "red",
    data: items
  }, {
    label: "Voltage Out",
    color: "red",
    data: items
  }, {
    label: "Current In",
    color: "red",
    data: items
  }, {
    label: "Current Out",
    color: "red",
    data: items
  }]
  return (
    <Box
      p={3}
      mx="auto"
      height="100%"
      width={360}
      overflowY="auto"
    >
      {fields.map((field, idx) => (
        <Box key={idx} mb={3}>
          <Card p={0}>
            <Chart
              ratio="16:9"
              color={field.color}
              data={field.data}
              label={field.label}
            />
          </Card>
        </Box>
      ))}
    </Box>
  )
}

export default ChartView;