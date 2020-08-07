import React from "react";
import "../styles/styles.scss";
import gsap from "gsap";
import { TweenLite } from "gsap";
class Header extends React.Component {
  headerText = null;
  allStars = [];
  componentDidMount() {
    this.allStars.push(document.querySelectorAll(".star"));
    this.headerText = document.querySelector(".headerText");
    const tl = gsap.timeline();
    for (let i = 0; i < 10; i++) {
      tl.from(
        document.getElementById(i),
        {
          x: 0,
          y: 0,
          delay: 1,
          duration: 0.8,
        },
        0
      );
    }
    tl.from(this.allStars, {
      duration: 1,
      delay: 1,
      ease: "linear",
      color: "#A92CA6",
    });
    tl.to(this.allStars, {
      delay: 1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "Bounce.easeIn",
      color: "white",
    });
    TweenLite.to(this.headerText, { delay: 1.5, duration: 2, opacity: 1 });
  }
  render() {
    return (
      <>
        <header className="header">
          <h3 className="artistName">M. Jarmoluk</h3>
          <div className="headerWrap">
            <h2 className="headerH2">Golden Rose</h2>
            <h1 className="headerH1">tatoo</h1>

            <p className="headerText">
              U nas przemienisz swój pomysł w wymarzony tatuaż.
            </p>
            <div className="starWrap">
              <p id="0" className="star">
                ★
              </p>
              <p id="1" className="star">
                ★
              </p>
              <p id="2" className="star">
                ★
              </p>
              <p id="3" className="star">
                ★
              </p>
              <p id="4" className="star">
                ★
              </p>
              <p id="5" className="star">
                ★
              </p>
              <p id="6" className="star">
                ★
              </p>
              <p id="7" className="star">
                ★
              </p>
              <p id="8" className="star">
                ★
              </p>
              <p id="9" className="star">
                ★
              </p>
            </div>
          </div>
        </header>
      </>
    );
  }
}
export default Header;
