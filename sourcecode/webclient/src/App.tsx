import { Grid } from "@material-ui/core";
import React from "react";
import "./App.css";
import ApiInputPage from "./components/Form/ApiInputPage";
import SummaryPage from "./components/Result/SummaryPage";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Grid container>
        <Grid item xs={12}>
          <ApiInputPage />
        </Grid>
        <Grid item xs={12}>
          <SummaryPage />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
