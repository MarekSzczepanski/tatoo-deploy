import React from "react";
import axios from "axios";
import gsap from "gsap";
import { TweenLite } from "gsap";
import Header from "../components/Header.component";
import About from "../components/About.component";
import News from "../components/News.component";
import Gallery from "../components/Gallery.component";
import Rules from "../components/Rules.component";
import Footer from "../components/Footer.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleDoubleDown,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
  componentDidMount() {
    axios.post("/api/admin_dashboard/auth", {
      auth: true
    });
  }
  scrollToSection = e => {
    document
      .querySelector("." + e.target.id.slice(4).toLowerCase() + "Section")
      .scrollIntoView({ behavior: "smooth" });
  };

  scrollArrowColorAnimation = color => {
    const tl = gsap.timeline();
    const scrollArrow = document.querySelector(".fa-angle-double-down");
    tl.fromTo(
      scrollArrow,
      2,
      { color: "white" },
      { repeat: -1, yoyo: true, color: color }
    );
  };
  handleBurgerClick = e => {
    const burger = document.querySelector(".fa-bars");
    const close = document.querySelector(".fa-times");
    const menu = document.querySelector(".menu");
    const menuBurger = document.querySelector(".menuBurger");
    const menuItems = document.querySelectorAll(".menuItem");

    console.log(e.target);
    if (e.target === burger || e.target.parentNode === burger) {
      burger.style.display = "none";
      close.style.display = "block";
      menu.classList.remove("menu");
      menu.classList.add("menuBurger");
      const menuBurgerWidth = document.querySelector(".menuBurger").offsetWidth;
      close.style.left = menuBurgerWidth - 25 + "px";
      menuItems.forEach(item => {
        item.style.borderBottom = "solid 1px white";
      });
      document.getElementById("menuAbout").style.width = "70%";
    } else {
      burger.style.display = "block";
      close.style.display = "none";
      menuBurger.classList.add("menu");
      menuBurger.classList.remove("menuBurger");
      menuItems.forEach(item => {
        item.style.borderStyle = "none";
      });
      document.getElementById("menuAbout").style.width = "auto";
      if (window.innerWidth > 1023) {
        burger.style.display = "none";
      }
    }
  };
  componentDidMount() {
    const menuItems = document.querySelectorAll(".menuItem");
    const scrollArrow = document.querySelector(".fa-angle-double-down");
    const header = document.querySelector(".header");
    const aboutBottom = document.querySelector(".aboutSection");
    const gallerySection = document.querySelector(".gallerySection");
    const rulesWrap = document.querySelector(".rulesWrap");
    let currentColor = "#FBFE5D";

    this.scrollArrowColorAnimation("#FBFE5D");
    window.addEventListener("scroll", () => {
      if (
        window.pageYOffset === header.offsetTop &&
        currentColor !== "#FBFE5D"
      ) {
        this.scrollArrowColorAnimation("#FBFE5D");
        currentColor = "#FBFE5D";
        console.log(currentColor);
      }

      if (
        (window.pageYOffset > header.offsetTop &&
          window.pageYOffset < aboutBottom.offsetTop &&
          currentColor !== "#E95252") ||
        (window.pageYOffset > gallerySection.offsetTop - 500 &&
          currentColor !== "#E95252")
      ) {
        this.scrollArrowColorAnimation("#E95252");
        currentColor = "#E95252";
        console.log(currentColor);
      }

      if (
        window.pageYOffset > aboutBottom.offsetTop &&
        window.pageYOffset < gallerySection.offsetTop - 500 &&
        currentColor !== "#3FB96C"
      ) {
        this.scrollArrowColorAnimation("#3FB96C");
        currentColor = "#3FB96C";
      }

      if (window.pageYOffset > rulesWrap.offsetTop - 250) {
        scrollArrow.style.display = "none";
      } else if (
        scrollArrow.style.display === "none" &&
        window.pageYOffset < rulesWrap.offsetTop - 250
      ) {
        scrollArrow.style.display = "block";
      }
    });
    TweenLite.to(scrollArrow, {
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      fontSize: "2.3rem",
      ease: "linear"
    });

    menuItems.forEach(item => {
      item.addEventListener("click", this.scrollToSection);
    });
  }
  render() {
    return (
      <>
        <Header />
        <About />
        <News />
        <Gallery />
        <Rules />
        <Footer />
        <FontAwesomeIcon icon={faBars} onClick={this.handleBurgerClick} />
        <FontAwesomeIcon icon={faTimes} onClick={this.handleBurgerClick} />
        <div className="menu">
          <p className="menuItem" id="menuAbout">
            O nas
          </p>
          <p className="menuItem" id="menuNews">
            Co nowego
          </p>
          <p className="menuItem" id="menuGallery">
            Galeria
          </p>
          <p className="menuItem" id="menuRules">
            Nasze zasady
          </p>
        </div>
        <FontAwesomeIcon icon={faAngleDoubleDown} className="scroll" />
      </>
    );
  }
}
export default Home;
