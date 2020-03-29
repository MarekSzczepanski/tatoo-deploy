import React from "react";
import "../styles/styles.scss";
import axios from "axios";
import { TweenLite } from "gsap";
class News extends React.Component {
  resp;
  state = {
    newsList: []
  };
  componentDidMount() {
    axios
      .get("/api/news_list")
      .then(response => {
        this.resp = response.data;
        this.setState({
          newsList: this.resp.reverse()
        });
      })
      .catch(error => {
        console.log(error);
      });
    if (window.innerWidth > 1300) {
      window.addEventListener("scroll", this.showNewsByScrolling);
    }
  }
  componentDidUpdate() {
    let newsHeight = document.querySelector(".newsSection").offsetHeight;
    document.querySelector(".newsSideLine").style.height = newsHeight + "px";
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.showNewsByScrolling);
  }
  showNewsByScrolling = () => {
    const heading = document.querySelector(".newsH2");
    const news = document.querySelectorAll(".homeNewsWrap");
    if (window.pageYOffset > heading.offsetTop - 300) {
      TweenLite.to(heading, {
        x: 0,
        duration: 0.8
      });
    }
    for (let i = 0; i < news.length; i++) {
      if (window.pageYOffset > news[i].offsetTop - 200) {
        TweenLite.to(news[i], {
          duration: 1.1,
          css: { scaleX: 1, scaleY: 1 }
        });
      }
    }
  };
  render() {
    const renderNews = this.state.newsList.map(function(news, i) {
      return (
        <div className="homeNewsWrap" key={i}>
          <div className="homeNewsTitle">
            <h3 className="homeNewsTitleTitle">{news.title}</h3>
            <p className="homeNewsTitleDate">{news.date}</p>
          </div>
          <div className="homeNewsText">
            <p className="homeNewsTextText">{news.text}</p>
          </div>
        </div>
      );
    });
    return (
      <>
        <div className="newsMainWrap">
          <div className="newsSideLine">
            <p className="newsSideLineText">dlaczego nie?</p>
            <div className="newsSideLineLock"></div>
          </div>
          <section className="newsSection">
            <h2 className="newsH2">co nowego</h2>
            <div className="newsWrap">{renderNews}</div>
          </section>
        </div>
      </>
    );
  }
}
export default News;
