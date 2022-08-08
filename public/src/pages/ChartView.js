import { Box } from "components/Grid";
import Card from "components/Card";
import { useMemo } from "react";
import Chart from "components/Chart";
import _l from "lodash";
import moment from "moment";

const ChartView = ({ data }) => {
  const items = useMemo(() => {
    const ret = _l.chain(data)
      .map(({ createdAt, ...value }) => {
        value.timestamp = moment(createdAt).unix();
        return value;
      })
      .sortBy(({ timestamp }) => timestamp)
      .value()
      ;
    return ret;
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  const fields = [{
    label: "Power In",
    color: "red",
    data: items,
    dataKey: "powerIn"
  }, {
    label: "Power Out",
    color: "red",
    data: items,
    dataKey: "powerOut"
  }, {
    label: "Voltage In",
    color: "red",
    data: items,
    dataKey: "voltageIn"
  }, {
    label: "Voltage Out",
    color: "red",
    data: items,
    dataKey: "voltageOut"
  }, {
    label: "Current In",
    color: "red",
    data: items,
    dataKey: "currentIn"
  }, {
    label: "Current Out",
    color: "red",
    data: items,
    dataKey: "currentOut"
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
              axisDataKey="timestamp"
              valueDataKey={field.dataKey}
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