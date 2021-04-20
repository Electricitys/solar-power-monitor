import {
  HashRouter,
  Route,
  Switch
} from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { MainProvider } from "components/hoc";
import Layout from "pages/Layout";
import Login from "pages/Login";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <MainProvider>
            <Route path="/" component={Layout} />
          </MainProvider>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
