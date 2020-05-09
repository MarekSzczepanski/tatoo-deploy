import React from "react";
import "../styles/styles.scss";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faBiohazard,
  faDonate,
  faFillDrip
} from "@fortawesome/free-solid-svg-icons";
class Rules extends React.Component {
  state = {
    wasAnimation: false
  };
  componentDidMount() {
    window.addEventListener("scroll", this.toggleShadowAnimation);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleShadowAnimation);
  }
  shadowAnimationTemplate = (target, property, delay) => {
    const tl = gsap.timeline();
    tl.to(
      document.getElementById(target),
      {
        boxShadow: property,
        duration: 0.1,
        delay
      },
      0
    );
  };
  shadowAnimation = (target, property1, property2) => {
    this.shadowAnimationTemplate(target, property1, 1.5);
    this.shadowAnimationTemplate(target, property2, 1.9);
    this.shadowAnimationTemplate(target, property1, 2.1);
    this.shadowAnimationTemplate(target, property2, 2.3);
    this.shadowAnimationTemplate(target, property1, 2.6);
    this.shadowAnimationTemplate(target, property2, 2.7);
    this.shadowAnimationTemplate(target, property1, 2.8);
    this.shadowAnimationTemplate(target, property2, 2.9);
    this.shadowAnimationTemplate(target, property2, 2.3);
    this.shadowAnimationTemplate(target, property1, 3);
  };

  toggleShadowAnimation = () => {
    const rulesWrap = document.querySelector(".rulesWrap");
    if (
      window.pageYOffset > rulesWrap.offsetTop - 250 &&
      !this.state.wasAnimation
    ) {
      this.shadowAnimation(
        "rule1",
        "0px 41px 68px -41px white",
        "0px 41px 68px -41px rgba(254, 96, 96, 0)"
      );
      this.shadowAnimation(
        "rule2",
        "0px 41px 68px -41px #FED230",
        "0px 41px 68px -41px rgba(235, 224, 0, 0)"
      );
      this.shadowAnimation(
        "rule3",
        "0px 41px 68px -41px white",
        "0px 41px 68px -41px rgba(51, 195, 108, 0)"
      );
      this.shadowAnimation(
        "rule4",
        "0px 41px 68px -41px #FED230",
        "0px 41px 68px -41px rgba(255, 255, 255, 0)"
      );
      this.setState({
        wasAnimation: true
      });
    }
  };
  render() {
    return (
      <section className="rulesSection">
        <div className="rulesWrap">
          <div className="rule" id="rule1">
            <FontAwesomeIcon
              icon={faBiohazard}
              className="ruleIcon"
              id="ruleIcon1"
            />
            <h3 className="ruleH3" id="ruleH3-1">
              Sterylność
            </h3>
            <p className="ruleText">
              Bezwzględnie przestrzegamy standardów sterylizacji w trosce o
              Twoje bezpieczeństwo.
            </p>
          </div>
          <div className="rule" id="rule2">
            <FontAwesomeIcon
              icon={faDonate}
              className="ruleIcon"
              id="ruleIcon2"
            />
            <h3 className="ruleH3" id="ruleH3-2">
              Ceny
            </h3>
            <p className="ruleText">
              Tatuowanie jest naszą wielką pasją i sprawia nam przyjemność,
              dlatego ceny są u nas atrakcyjne.
            </p>
          </div>
          <div className="rule" id="rule3">
            <FontAwesomeIcon
              icon={faComment}
              className="ruleIcon"
              id="ruleIcon3"
            />
            <h3 className="ruleH3" id="ruleH3-3">
              Porady
            </h3>
            <p className="ruleText">
              Udzielimy Ci wsparcia na każdym etapie wyboru tatuażu oraz
              obchodzenia się z nim po jego wykonaniu.
            </p>
          </div>
          <div className="rule" id="rule4">
            <FontAwesomeIcon
              icon={faFillDrip}
              className="ruleIcon"
              id="ruleIcon4"
            />
            <h3 className="ruleH3" id="ruleH3-4">
              Jakość
            </h3>
            <p className="ruleText">
              Korzystamy wyłącznie z najwyższej jakości pigmentów, co gwarantuje
              trwałość tatuażu.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
export default Rules;
