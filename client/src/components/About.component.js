import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.scss";
import { faMapMarkerAlt, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tatoo1 from "../img/tatoo1.jpg";
import Tatoo2 from "../img/tatoo2.jpg";

class About extends React.Component {
  render() {
    return (
      <>
        <section className="aboutSection">
          <img
            src={
              Tatoo1
            }
            className="aboutImg"
            alt="tatoo-man"
          />
          <img
            src={
             Tatoo2
            }
            className="aboutImg"
            alt="tatoo-tiger"
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
            <p className="aboutBottomText"> ul. czarnieckiego 10/20</p>
            <p className="aboutBottomText">ostróda</p>
          </div>
          <div className="aboutBottomInsideWrap">
            <FontAwesomeIcon
              icon={faMobileAlt}
              className="aboutIcon"
              id="phoneIcon"
            />
            <p className="aboutBottomText">umów się na wizytę</p>
            <p className="aboutBottomText">+48 730 000 000</p>
            <p className="aboutBottomText">adres.emailowy@gmail.com</p>
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
