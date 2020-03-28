import React from "react";
import { HashRouter } from "react-router-dom";
import Page from "./components/Page.component";
import "./styles/App.css";
import axios from "axios";

import { Link } from "react-router-dom";

class App extends React.Component {
  state = {
    auth: false,
    username: "",
    password: "",
    isErrorHidden: false
  };

  /* componentWillMount() {
    axios.post("http://localhost:5000/api/admin_dashboard/auth", {
      auth: true
    });
  } */
  componentDidUpdate() {
    if (this.state.isErrorHidden) {
      document.getElementById("popupRoot").classList.add("popupHidden");
    }
  }
  handleUsernameChange = e => {
    this.setState({
      username: e.target.value
    });
  };
  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };
  changeThis = () => {
    console.log(2);
    this.setState({
      auth: true
    });
  };
  handleSubmit = e => {
    console.log(5);
    const boundThis = this.changeThis.bind(this);
    if (e) {
      e.preventDefault();
    }
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("/api/admin/login", user)
      .then(function(response) {
        if (response.data === "ok") {
          boundThis();
          /* DAC FORMULARZ I PRZYCISK DO PAGE, DAC IM POSITION ABSOLUTE I DISPLAY BLOCK GDY
          WINDOW LOCATION = /ADMIN I WTEDY MOZNA ZMIENIC STATE W PAGE BEZ POSTA W AXIOSIE */
          /* axios
            .post("http://localhost:5000/api/admin_dashboard/auth", {
              auth: true
            })
            .then(() => {
              window.location = "/admin_dashboard";
            }); */
          /* window.location = "/admin_dashboard"; */
          /*  renderRedirect = () => {
            if (this.state.redirect) {
              return 
            }
          } */
        } else {
          const popupHiddenClass = document.querySelectorAll(".popupHidden");
          popupHiddenClass.forEach(item => {
            item.classList.remove("popupHidden");
          });
        }
      })
      .catch(function(error) {
        window.location = "/#/admin";
        console.log(error);
      });
  };
  handleErrorButtonClick = e => {
    this.setState({
      isErrorHidden: true
    });
  };
  render() {
    console.log("app state", this.state.auth);
    const a = this.state.auth;
    let isHiddenClass;
    if (!this.state.isErrorHidden) {
      isHiddenClass = "popupHidden";
    } else {
      isHiddenClass = "";
    }
    return (
      <>
        <HashRouter>
          <div className="app">
            <Page isAuthed={a} />
          </div>
          <div className="adminLoginWrap" style={{ display: "none" }}>
            <h1 className="adminLoginH1">Podaj dane logowania</h1>
            <form onSubmit={this.handleSubmit} className="adminLoginForm">
              <input
                onChange={this.handleUsernameChange}
                type="text"
                value={this.state.value}
                placeholder="nazwa użytkownika"
                className="adminLoginInput"
              ></input>
              <input
                onChange={this.handlePasswordChange}
                type="password"
                placeholder="hasło"
                className="adminLoginInput"
              ></input>
              <ul>
                <li onClick={this.handleSubmit}>
                  <Link to="/admin_dashboard">zo</Link>
                </li>
              </ul>
              {/* <button className="adminSubmit">zaloguj</button> */}
            </form>
          </div>
          <div id="popupRoot" className={isHiddenClass}>
            <div id="popupWrap" className={isHiddenClass}>
              <p id="popupMessage" className={isHiddenClass}>
                Dane logowania nieprawidłowe
              </p>
              <button
                id="popupButton"
                onClick={this.handleErrorButtonClick}
                className={isHiddenClass}
              >
                ok
              </button>
            </div>
          </div>
        </HashRouter>
      </>
    );
  }
}

export default App;
