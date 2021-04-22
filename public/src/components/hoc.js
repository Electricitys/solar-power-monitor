import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useClient } from "./client";

export const MainContext = createContext();

export const useMain = () => {
  const main = useContext(MainContext);
  return main;
}

export const MainProvider = ({ children }) => {
  const client = useClient();
  const history = useHistory();
  const [dateRange, setDateRange] = useState([moment(), moment()]);

  useEffect(() => {
    if (client.account) return;
    client.doReAuthenticate().then(() => {
    }).catch(() => {
      history.push("/login");
    });
  }, [client.account]); // eslint-disable-line react-hooks/exhaustive-deps

  const ret = {
    dateRange,
    setDateRange
  }
  return (
    <MainContext.Provider value={ret}>
      {children}
    </MainContext.Provider>
  )
}