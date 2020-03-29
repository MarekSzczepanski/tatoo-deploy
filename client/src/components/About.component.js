import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.scss";
import { faMapMarkerAlt, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class About extends React.Component {
  render() {
    return (
      <>
        <section className="aboutSection">
          <img
            src={
              "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/75210655_546739839225817_391108432167436288_o.jpg?_nc_cat=105&_nc_sid=e007fa&_nc_ohc=47pQTcFJnYYAX86c9oG&_nc_ht=scontent-waw1-1.xx&oh=ebf4003dacb1cf93dcdcf9fd13c64b5a&oe=5EA6BEE4"
            }
            className="aboutImg"
            alt="tatuaż-jeleń"
          />
          <img
            src={
              "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/p960x960/80553491_574281119805022_5701494340124147712_o.jpg?_nc_cat=111&_nc_sid=e007fa&_nc_ohc=IZmWvRQoqJoAX-8t6wN&_nc_ht=scontent-waw1-1.xx&_nc_tp=6&oh=b25958f2c0a31f1aa7494e8049abc38c&oe=5EA70E59"
            }
            className="aboutImg"
            alt="tatuaż-sztylet"
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          />
          <button className="aboutButton">
            <Link to="/galleryPage">zobacz galerię</Link>
          </button>
          <button className="aboutButton2">
            <Link to="/galleryPage">zobacz galerię</Link>
          </button>
          <h2 className="aboutH2">twój pomysł ma dla nas znaczenie!</h2>
          <ul className="aboutUl">
            <li className="aboutLi">
              <span className="aboutLiSpan">▪</span> Projekt według Twojego
              pomysłu
            </li>
            <li className="aboutLi">
              <span className="aboutLiSpan">▪</span> Kreatywni tauatorzy
              pracujący w różnych stylach
            </li>
            <li className="aboutLi">
              <span className="aboutLiSpan">▪</span> Przyjazna atmosfera
              tworzona przez pasjonatów
            </li>
            <li className="aboutLi">
              <span className="aboutLiSpan">▪</span> Udzielimy Ci bezpłatnych
              konsultacji i pomożemy w razie wszelkich wątpliwości!
            </li>
          </ul>
          <div className="shine"></div>
        </section>
        <section className="aboutBottom">
          <div className="aboutBottomInsideWrap">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="aboutIcon" />
            <p className="aboutBottomText">odwiedź nas</p>
            <p className="aboutBottomText"> ul. czarnieckiego 5/10</p>
            <p className="aboutBottomText">ostróda</p>
          </div>
          <div className="aboutBottomInsideWrap">
            <FontAwesomeIcon
              icon={faMobileAlt}
              className="aboutIcon"
              id="phoneIcon"
            />
            <p className="aboutBottomText">umów się na wizytę</p>
            <p className="aboutBottomText">+48 730 000 804</p>
            <p className="aboutBottomText">zajawatattoo@gmail.com</p>
          </div>
          <div className="aboutBottomInsideWrap">
            <FontAwesomeIcon
              icon={faClock}
              className="aboutIcon"
              id="clockIcon"
            />
            <p className="aboutBottomText" id="aboutHoursText">
              godziny otwarcia
            </p>
            <p className="aboutBottomText" id="aboutHoursText">
              pn. - pt: 10:00 - 18:00
            </p>
            <p className="aboutBottomText" id="aboutHoursText">
              sb: 10:00 - 16:00
            </p>
          </div>
        </section>
      </>
    );
  }
}

export default About;
