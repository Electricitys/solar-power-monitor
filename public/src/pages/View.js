import { useEffect, useState } from "react";
import moment from "moment";
import { Route, Switch } from "react-router-dom";
import { Button, Icon, NonIdealState } from "@blueprintjs/core";
import { Popover2 as Popover } from "@blueprintjs/popover2";
import { DatePicker } from "@blueprintjs/datetime";
import { Box, Flex } from "components/Grid";
import ChartView from "./ChartView";
import TableView from "./TableView";
import Select from "components/Select";
import { useClient } from "components/client";

const View = () => {
  const client = useClient();
  const [dateRange, setDateRange] = useState([
    moment().startOf("month").toDate(),
    moment().endOf("month").toDate()
  ]);
  const [loading, setLoading] = useState({
    data: false,
    device: false
  })
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [paging, setPaging] = useState({
    limit: 0,
    skip: 0,
    total: 0
  });
  const [data, setData] = useState([]);

  const fetchDevice = async () => {
    if (devices.length > 0) return;
    setLoading(loading => ({ ...loading, device: true }));
    try {
      const { data } = await client.devices.find({
        query: {
          $limit: 1000,
          $select: ["id", "label"]
        }
      });
      console.log(data);
      setDevices(data.map(({ id, label }) => ({
        label: label,
        value: id
      })))
      setLoading(loading => ({ ...loading, device: false }));
    } catch (err) {
      console.error(err);
    }
  }

  const fetchData = async ({
    range,
    deviceId
  }) => {
    console.log(deviceId);
    try {
      const res = await client.dataLake.find({
        query: {
          $limit: 1000,
          $select: ["createdAt", "currentIn", "currentOut", "powerIn", "powerOut", "voltageIn", "voltageOut", "id"],
          deviceId: deviceId,
          createdAt: {
            $gte: moment(range[0]).toISOString(),
            $lte: moment(range[1]).toISOString()
          }
        }
      });
      console.log(res);
      await setData(res.data);
      await setPaging({
        limit: res.limit,
        skip: res.skip,
        total: res.total
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (selectedDevice === null) return;
    fetchData({
      range: dateRange,
      deviceId: selectedDevice,
    });
  }, [selectedDevice, dateRange]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onCreated = ({ deviceId, ...res }) => {
      if (selectedDevice !== deviceId) return;
      setData(data => [...data, res]);
    }
    client.dataLake.on("created", onCreated);
    return ()=> {
      client.dataLake.removeListener("created", onCreated);
    }
  }, [selectedDevice, client]);

  return (
    <Flex
      flexDirection="column"
      height="100%"
    >
      <Box pt={3} textAlign="center">
        <Box mb={2}>
          <Select
            small={true}
            options={devices}
            placeholder="Select Device"
            value={selectedDevice}
            onOpening={fetchDevice}
            loading={loading["device"]}
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
        {selectedDevice === null && (
          <NonIdealState
            icon="select"
            description="Please select one Device first."
          />
        )}
        {selectedDevice !== null && (
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
              <Route path="/table" render={props => <TableView {...props} data={data} paging={paging} />} />
            </Switch>
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default View;