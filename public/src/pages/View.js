import { useEffect, useState } from "react";
import moment from "moment";
import { Route, Switch } from "react-router-dom";
import { Button, Icon } from "@blueprintjs/core";
import { Popover2 as Popover } from "@blueprintjs/popover2";
import { DatePicker } from "@blueprintjs/datetime";
import { Box, Flex } from "components/Grid";
import ChartView from "./ChartView";
import TableView from "./TableView";
import Select from "components/Select";

const View = () => {
  const [dateRange, setDateRange] = useState([
    moment().startOf("month").toDate(),
    moment().endOf("month").toDate()
  ]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [data, setData] = useState([]);

  const fetchDevice = async () => {
    try {
      setDevices([{
        label: "Bunaken",
        value: 1
      }])
    } catch (err) {
      console.error(err);
    }
  }

  const fetchData = async () => {
    try {
      setData([{
        id: 1,
        value: 2
      }])
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex
      flexDirection="column"
      height="100%"
    // pb="40px"
    >
      <Box pt={3} textAlign="center">
        <Box mb={2}>
          <Select
            small={true}
            options={devices}
            placeholder="Select Device"
            value={selectedDevice}
            onOpening={fetchDevice}
            onChange={(option) => {
              setSelectedDevice(option.value);
            }}
          />
        </Box>
        <Popover
          placement="bottom-start"
          content={
            <DatePicker
              maxDate={dateRange[1]}
              onChange={(selectedDate) => setDateRange(date => [selectedDate, date[1]])}
              value={dateRange[0]}
            />
          }
        >
          <Button small outlined text={moment(dateRange[0]).format("ddd, DD MMM yyyy")} />
        </Popover>
        <Box as="span" mx={2}>
          <Icon icon="arrow-right" />
        </Box>
        <Popover
          placement="bottom-end"
          content={
            <DatePicker
              minDate={dateRange[0]}
              onChange={(selectedDate) => setDateRange(date => [date[0], selectedDate])}
              value={dateRange[1]}
            />
          }
        >
          <Button small outlined text={moment(dateRange[1]).format("ddd, DD MMM yyyy")} />
        </Popover>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          position: "relative"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }}
        >
          <Switch>
            <Route path="/chart" render={props => <ChartView {...props} data={data} />} />
            <Route path="/table" render={props => <TableView {...props} data={data} />} />
          </Switch>
        </Box>
      </Box>
    </Flex>
  )
}

export default View;