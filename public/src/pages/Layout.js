import { AnchorButton, Button, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Popover2 as Popover } from "@blueprintjs/popover2";
import { Box, Flex } from "components/Grid";
import DevicesView from "./Devices";
import { forwardRef } from "react";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import View from "./View";
import { useClient } from "components/client";

const Layout = () => {
  const location = useLocation();
  const history = useHistory();
  const client = useClient();
  const onLogout = () => {
    client.doLogout().then(() => {
      history.push("/login");
    });
  }
  return (
    <Box height="100vh">
      <Box
        height={"100%"}
        pb={40}
      >
        <Switch>
          <Route path="/devices" component={DevicesView} />
          <Route path="/" component={View} />
        </Switch>
      </Box>
      <Box
        sx={{
          position: "fixed",
          right: 0,
          bottom: 0,
          left: 0,
          bg: "white",
          justifyContent: "center",
          borderTopWidth: 1,
          borderTopColor: "gray.3",
          borderTopStyle: "solid"
        }}
      >
        <Flex
          sx={{
            px: 3,
            height: 40,
            maxWidth: 360,
            mx: "auto",
            textAlign: "center"
          }}
        >
          <div>
            <Link to="/chart" component={forwardRef(({ href }, ref) => (
              <AnchorButton ref={ref} active={location.pathname === "/chart"} minimal large title="Chart" text="Chart" icon="chart" href={href} />
            ))} />
          </div>
          <div>
            <Link to="/table" component={forwardRef(({ href }, ref) => (
              <AnchorButton ref={ref} active={location.pathname === "/table"} minimal large title="Table" text="Table" icon="panel-table" href={href} />
            ))} />
          </div>
          <Box flexGrow={1} />
          <div>
            <Link to="/devices" component={forwardRef(({ href }, ref) => (
              <AnchorButton ref={ref} active={location.pathname === "/devices"} minimal large title="Devices" icon="layout-skew-grid" href={href} />
            ))} />
          </div>
          <div>
            <Popover
              placement="top-end"
              content={
                <Menu>
                  <MenuItem target="_blank" href="https://wa.me/085299482331?text=Tolong%20Aku" icon="lifesaver" text="Tanya ke Admin" />
                  <MenuDivider />
                  <MenuItem intent="danger" icon="log-out" text="Logout" onClick={onLogout} />
                </Menu>
              }
            >
              <Button minimal large title="Profile" icon="people" />
            </Popover>
          </div>
        </Flex>
      </Box>
    </Box >
  )
}

export default Layout;