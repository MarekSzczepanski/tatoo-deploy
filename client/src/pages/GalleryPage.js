import React from "react";
import { Link } from "react-router-dom";
import GalleryPageFooter from "../components/GalleryPageFooter.component";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GalleryPage extends React.Component {
  listOfImages;
  importAll(r) {
    return r.keys().map(r);
  }
  handleImageClick = e => {
    const images = document.querySelectorAll("img");
    const xButton = document.querySelector(".galleryPageX");
    images.forEach(image => {
      image.style.display = "none";
      image.removeEventListener("click", this.handleImageClick);
    });
    if (e.target.classList.contains("galleryImg")) {
      e.target.style.display = "block";
      e.target.style.position = "absolute";
      e.target.classList.add("clickedImage");
      if (window.innerHeight > window.innerWidth) {
        e.target.style.width = "99.9vw";
        e.target.style.height = "99.9vw";
      } else {
        e.target.style.width = "99.9vh";
        e.target.style.height = "99.9vh";
        const width = window.innerWidth;
        const imageWidth = e.target.offsetWidth;
        e.target.style.left = (width - imageWidth) / 2 + "px";
        document.querySelector(".galleryPageSection").style.height =
          e.target.offsetHeight + 10 + "px";
      }
    }
    xButton.style.display = "block";
    xButton.addEventListener("click", this.handleXButtonClick);
  };
  handleXButtonClick = () => {
    const images = document.querySelectorAll("img");
    const clickedImage = document.querySelector(".clickedImage");
    console.log(clickedImage);
    clickedImage.style.width = "24.9vw";
    clickedImage.style.height = "24.9vw";
    clickedImage.style.position = "static";
    clickedImage.classList.remove("clickedImage");
    images.forEach(image => {
      image.style.display = "block";
      image.addEventListener("click", this.handleImageClick);
    });
    document.querySelector(".galleryPageSection").style.height = "auto";
    document.querySelector(".galleryPageX").style.display = "none";
  };
  componentWillMount() {
    this.listOfImages = this.importAll(
      require.context("../../public/uploads", false, /\.(png|jpe?g|svg)$/)
    );
  }
  componentDidMount() {
    if (window.innerWidth > 1023) {
      const images = document.querySelector(".galleryPageSection").childNodes;
      images.forEach(image => {
        image.addEventListener("click", this.handleImageClick);
      });
    } else {
      const allImages = document.querySelectorAll(".galleryImg");
      allImages.forEach(image => {
        image.style.display = "none";
      });
    }
  }
  render() {
    return (
      <>
        <section className="galleryPageSection">
          <button className="galleryPageButton">
            <Link to="/">powrót</Link>
          </button>
          <FontAwesomeIcon
            icon={faWindowClose}
            className="galleryPageX"
            onClick={this.xClick}
          />
          {this.listOfImages.map((image, index) => (
            <img
              key={index}
              className={"galleryImg"}
              src={image}
              id={"galleryImage" + index}
              alt="info"
            ></img>
          ))}
        </section>
        <GalleryPageFooter />
      </>
    );
  }
}
export default GalleryPage;
