import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.component";
import "../../styles/admin/Admin_dashboard.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
class DeleteNews extends React.Component {
  state = {
    title: "",
    newsList: [],
    inputValue: "",
    inputKey: null,
    isDeleteConfirm: false,
    listenerFlag: false,
    newsUpdate: false
  };
  componentDidMount() {
    axios
      .get("/api/news_list")
      .then(response => {
        this.setState({
          newsList: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidUpdate() {
    const boundButtonListeners = this.buttonListeners.bind(this);
    const boundUpdateNewsList = this.updateNewsList.bind(this);
    if (this.state.newsUpdate) {
      boundUpdateNewsList();
    }
    if (!this.state.listenerFlag) {
      boundButtonListeners();
    }
  }
  buttonListeners = () => {
    const boundDeleteConfirm = this.deleteConfirm.bind(this);
    let deleteButtons = document.querySelectorAll(".deleteNews");
    deleteButtons.forEach(button => {
      button.addEventListener("click", e => {
        boundDeleteConfirm(e.target);
      });
    });
    this.setState({
      listenerFlag: true
    });
  };
  updateNewsList = () => {
    const boundUpdateNewsList = this.updateNewsList.bind(this);
    const boundNewsListUpdated = this.newsListUpdated.bind(this);
    axios
      .get("/api/news_list")
      .then(response => {
        if (this.state.newsList.length === response.data.length) {
          // check if database has refreshed
          boundUpdateNewsList(); // do news list update again if it didn't (new get request)
        } else {
          boundNewsListUpdated(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  newsListUpdated = response => {
    this.setState({
      newsList: response,
      newsUpdate: false
    });
  };
  deleteConfirm(news) {
    this.setState({
      isDeleteConfirm: true
    });
    const oldConfirm = document.querySelector(".delete");
    const newConfirm = oldConfirm.cloneNode(true);
    const oldCancel = document.querySelector(".cancel");
    const newCancel = oldCancel.cloneNode(true);
    oldConfirm.parentNode.replaceChild(newConfirm, oldConfirm);
    oldCancel.parentNode.replaceChild(newCancel, oldCancel);

    newConfirm.addEventListener("click", e => {
      this.deleteConfirmClick(e.target, news);
    });
    newCancel.addEventListener("click", e => {
      this.deleteConfirmClick(e.target, news);
    });
  }
  deleteConfirmClick = (isDeleteConfirmed, news) => {
    if (isDeleteConfirmed.classList.contains("delete")) {
      axios.post("/api/delete_news/" + news.id);
    }
    this.setState({
      newsUpdate: true,
      isDeleteConfirm: false
    });
  };
  searchNews = () => {
    const allNews = document.querySelectorAll(".deleteNewsSingleNews");
    const input = document.querySelector(".searchNews");
    const inputAsArray = [...input.value];
    allNews.forEach(news => {
      news.style.display = "flex";
      for (let i = 0; i < inputAsArray.length; i++) {
        if (
          inputAsArray[i] !== news.childNodes[1].textContent[i].toLowerCase()
        ) {
          news.childNodes[2].parentNode.style.display = "none";
        }
      }
    });
  };
  handleBackspace = e => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      this.setState({
        inputValue: e.target.value,
        inputKey: e.keyCode
      });
      this.searchNews();
    }
  };
  render() {
    const style = "returnLink darkBackground";
    let isDeleteConfirm;
    if (!this.state.isDeleteConfirm) {
      isDeleteConfirm = "deleteConfirmHidden";
    } else {
      isDeleteConfirm = "";
    }
    const renderNews = this.state.newsList.map(function(news, i) {
      const deleteButtonClasses = `deleteNews ${i}`;
      return (
        <div key={i} id={i} className="deleteNewsSingleNews">
          <div className="deleteNewsDateWrap">
            <div className="deleteNewsDate">{news.date}</div>
          </div>
          <div className="deleteNewsTitleWrap">
            <h2 className="deleteNewsTitle">{news.title}</h2>
          </div>
          <button className={deleteButtonClasses} id={news._id}>
            Usuń wiadomość
          </button>
        </div>
      );
    });
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
        <div className="removeNewsWrap">
          <div className="searchNewsWrap">
            <input
              onChange={this.searchNews}
              onKeyUp={this.handleBackspace}
              className="searchNews"
              placeholder="znajdź wiadomość"
            ></input>
          </div>
          <h1 className="removeNewsH1">Usuń wiadomość</h1>
          <div className="news">{renderNews}</div>
        </div>
        <div id="popupRoot" className={isDeleteConfirm}>
          <div id="popupWrapDelete" className={isDeleteConfirm}>
            <p id="popupMessageDelete" className={isDeleteConfirm}>
              Czy na pewno chcesz usunąć tę wiadomość?
            </p>
            <div className="popupButtonsWrap">
              <button
                id="popupButtonDelete"
                className={isDeleteConfirm + "delete"}
              >
                Usuń
              </button>
              <button
                id="popupButtonDelete"
                className={isDeleteConfirm + "cancel"}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default DeleteNews;
