import { Box } from "components/Grid";
import { Cell, Column, Table } from "@blueprintjs/table";
import moment from "moment";
import { useMemo } from "react";
import _l from "lodash";

const TableView = ({ data }) => {

  const _data = useMemo(()=>{
    return _l.chain(data)
    .sortBy(({ createdAt }) => moment(createdAt).unix())
    .value()
    ;
  }, [data]);

  const cellRenderer = (rowIndex, field) => {
    let ret = _data[rowIndex][field];
    if (field === "timestamp") {
      ret = moment(_data[rowIndex]["createdAt"]).format("ddd, DD MMM YY [at] hh:mm A");
    }
    else {
      ret = Math.abs(ret);
    }
    return <Cell>{ret}</Cell>
  }

  return (
    <Box
      height="100%"
      pt={2}
    >
      <Table
        numRows={_data.length}
        defaultColumnWidth={100}
        maxColumnWidth={250}
      >
        <Column
          name="Timestamp"
          cellRenderer={(idx) => cellRenderer(idx, "timestamp")}
        />
        <Column
          name="Voltage In"
          cellRenderer={(idx) => cellRenderer(idx, "voltageIn")}
        />
        <Column
          name="Current In"
          cellRenderer={(idx) => cellRenderer(idx, "currentIn")}
        />
        <Column
          name="Power In"
          cellRenderer={(idx) => cellRenderer(idx, "powerIn")}
        />
        <Column
          name="Voltage Out"
          cellRenderer={(idx) => cellRenderer(idx, "voltageOut")}
        />
        <Column
          name="Current Out"
          cellRenderer={(idx) => cellRenderer(idx, "currentOut")}
        />
        <Column
          name="Power Out"
          cellRenderer={(idx) => cellRenderer(idx, "powerOut")}
        />
      </Table>
    </Box>
  )
}

export default TableView;