import React from "react";
import Page from "./components/Page.component";
import "./styles/App.css";
import { HashRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Page />
        </div>
      </HashRouter>
    );
  }
}

export default App;
