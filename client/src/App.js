import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Page from "./components/Page.component";
import "./styles/App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Page />
        </div>
      </Router>
    );
  }
}

export default App;
