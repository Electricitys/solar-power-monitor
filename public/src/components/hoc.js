import moment from "moment";
import { createContext, useContext, useState } from "react";

export const MainContext = createContext();

export const useMain = () => {
  const main = useContext(MainContext);
  return main;
}

export const MainProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState([moment(), moment()]);
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