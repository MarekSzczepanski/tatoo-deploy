import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header.component";
import "../../styles/admin/Admin_dashboard.css";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddNews extends React.Component {
  resp;
  state = {
    title: "",
    text: "",
    newsList: [],
    isNewsAdded: false,
    isWordTooLong: false
  };
  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  addNews = e => {
    e.preventDefault();
    let isNewsAddedFlag = false;
    const boundNewsBool = this.changeNewsState.bind(this);
    const news = {
      title: this.state.title,
      text: this.state.text
    };
    let arrayFromTitleWords = news.title.split(/\s+/);
    let isWordTooLong = false;
    let isEmptySpace = false;
    if (!news.title || !news.text) {
      isEmptySpace = true;
    } else {
      arrayFromTitleWords.forEach(word => {
        if (word.length > 32) {
          isWordTooLong = true;
        }
      });
    }
    if (!isWordTooLong && !isEmptySpace) {
      axios
        .post("/api/add_news/add", news)
        .then(response => {
          if (response.data) {
            isNewsAddedFlag = true;
          }
        })
        .then(() => {
          if (isNewsAddedFlag) {
            boundNewsBool();
          }
        });
    } else if (isEmptySpace) {
      this.setState({
        isEmptySpace: true
      });
    } else {
      this.setState({
        isWordTooLong: true
      });
    }
  };
  changeNewsState = () => {
    this.setState({
      isNewsAdded: true
    });
  };
  handleButtonClick = () => {
    this.setState({
      isNewsAdded: false,
      isEmptySpace: false,
      isWordTooLong: false
    });
  };
  render() {
    const style = "returnLink darkBackground";
    let isHidden = "popupHidden";
    let text;
    let buttonColor;
    if (
      this.state.isNewsAdded ||
      this.state.isEmptySpace ||
      this.state.isWordTooLong
    ) {
      isHidden = "";
      if (this.state.isNewsAdded) {
        buttonColor = "popupButtonGreen";
        text = "Wiadomość została dodana!";
      }
      if (this.state.isEmptySpace) {
        buttonColor = "popupButtonRed";
        text = 'Pola "tytuł" i "treść" nie mogą być puste!';
      }
      if (this.state.isWordTooLong) {
        buttonColor = "popupButtonRed";
        text = 'Maksymalna długość słowa w polu "tytuł" to 32 znaki!';
      }
    }
    return (
      <>
        <Header />
        <nav>
          <ul className={"insidePageUl"}>
            <li className={style}>
              <Link to="/admin_dashboard">
                <FontAwesomeIcon
                  icon={faArrowAltCircleDown}
                  rotation={90}
                  style={{ color: "#c81529", marginRight: "1.5vw" }}
                />
                powrót do panelu
              </Link>
            </li>
          </ul>
        </nav>
        <div className="addNewsWrap">
          <h1 className="addNewsH1">Dodaj wiadomość</h1>
          <form onSubmit={this.addNews} className="addNewsForm">
            <label className="addNewsLabel">Tytuł wiadomości: </label>
            <input
              onChange={this.handleTitleChange}
              type="text"
              value={this.state.title}
              className="adminDashboardInput"
            ></input>
            <label className="addNewsLabel">Treść wiadomości: </label>
            <textarea
              onChange={this.handleTextChange}
              value={this.state.text}
              className="addNewsTextarea"
            ></textarea>
            <button className="addNewsButton">Dodaj wiadomość</button>
          </form>
        </div>
        <div id="popupRoot" className={isHidden}>
          <div id="popupWrap" className={isHidden}>
            <p id="popupMessage" className={isHidden}>
              {text}
            </p>
            <button
              id="popupButton"
              onClick={this.handleButtonClick}
              className={buttonColor}
            >
              ok
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default AddNews;
