import React from "react";
import Header from "../components/Header.component";
import About from "../components/About.component";
import News from "../components/News.component";
import Gallery from "../components/Gallery.component";
import Rules from "../components/Rules.component";
import Footer from "../components/Footer.component";
import gsap from "gsap";
import { TweenLite } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleDoubleDown,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
class Home extends React.Component {
  componentDidMount() {
    const menuItems = document.querySelectorAll(".menuItem");
    const scrollArrow = document.querySelector(".fa-angle-double-down");
    const header = document.querySelector(".header");
    const aboutBottom = document.querySelector(".aboutSection");
    const gallerySection = document.querySelector(".gallerySection");
    const rulesWrap = document.querySelector(".rulesWrap");
    let currentColor = "#FED230";

    this.scrollArrowColorAnimation("#FED230");
    window.addEventListener("scroll", () => {
      if (
        window.pageYOffset === header.offsetTop &&
        currentColor !== "#FED230"
      ) {
        this.scrollArrowColorAnimation("#FED230");
        currentColor = "#FED230";
      }

      if (
        (window.pageYOffset > header.offsetTop &&
          window.pageYOffset < aboutBottom.offsetTop &&
          currentColor !== "#FED230")/*  ||
        (window.pageYOffset > gallerySection.offsetTop - 500 &&
          currentColor !== "#FED230") */
      ) {
        this.scrollArrowColorAnimation("#FED230");
        currentColor = "#FED230";
      }

      if (
        window.pageYOffset > aboutBottom.offsetTop &&
        window.pageYOffset < gallerySection.offsetTop - 500 &&
        currentColor !== "#A92CA6"
      ) {
        this.scrollArrowColorAnimation("#A92CA6");
        currentColor = "#A92CA6";
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
