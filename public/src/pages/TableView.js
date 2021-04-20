import { Box } from "components/Grid";
import { useMemo } from "react";
import { Cell, Column, Table } from "@blueprintjs/table";

const TableView = ({ data }) => {
  const items = useMemo(() => {
    return [];
  }, [data]);

  const cellRenderer = (rowIndex) => {
    return <Cell>{`${rowIndex}`}</Cell>
  }

  return (
    <Box
      height="100%"
      pt={2}
    >
      <Table
        numRows={100}
        defaultColumnWidth={100}
        maxColumnWidth={250}
      >
        <Column
          name="Voltage In"
          cellRenderer={cellRenderer}
        />
        <Column
          name="Current In"
          cellRenderer={cellRenderer}
        />
        <Column
          name="Power In"
          cellRenderer={cellRenderer}
        />
        <Column
          name="Voltage Out"
          cellRenderer={cellRenderer}
        />
        <Column
          name="Current Out"
          cellRenderer={cellRenderer}
        />
        <Column
          name="Power Out"
          cellRenderer={cellRenderer}
        />
      </Table>
    </Box>
  )
}

export default TableView;