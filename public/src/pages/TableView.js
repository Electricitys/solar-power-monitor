import { Box } from "components/Grid";
import { Cell, Column, Table } from "@blueprintjs/table";
import moment from "moment";

const TableView = ({ data }) => {
  const cellRenderer = (rowIndex, field) => {
    let ret = data[rowIndex][field];
    if(field === "timestamp")
      ret = moment(data[rowIndex]["createdAt"]).format("ddd, DD MMM YY");
    return <Cell>{ret}</Cell>
  }

  return (
    <Box
      height="100%"
      pt={2}
    >
      <Table
        numRows={data.length}
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