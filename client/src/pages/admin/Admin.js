import React from "react";
import axios from "axios";
import Header from "../../components/admin/Header.component";
import "../../styles/admin/Admin.css";

class Admin extends React.Component {
  listOfImages;
  state = {
    username: "",
    password: "",
    isErrorHidden: false,
    imagesList: []
  };
  componentWillMount() {
    axios.post("/api/admin_dashboard/auth", {
      auth: true
    });
  }
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
  handleSubmit = e => {
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
        if (response === "ok") {
          axios.post("/api/admin_dashboard/auth", {
            auth: true
          });
          /* .then(() => {
                window.location = "/#/admin_dashboard";
              }); */
          window.location = "/#/admin_dashboard";
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
    let isHiddenClass;
    if (!this.state.isErrorHidden) {
      isHiddenClass = "popupHidden";
    } else {
      isHiddenClass = "";
    }

    return (
      <>
        <Header />
        <div className="adminLoginWrap">
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
            <button className="adminSubmit">zaloguj</button>
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
      </>
    );
  }
}
export default Admin;
