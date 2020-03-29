import React from "react";
import { Link } from "react-router-dom";
import GalleryPageFooter from "../components/GalleryPageFooter.component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
class GalleryPage extends React.Component {
  state = {
    imagesLinks: []
  };

  componentDidMount() {
    this.addListeners();
    const boundChangeImagesLinksInState = this.changeImagesLinksInState.bind(
      this
    );
    axios
      .get("/api/images_list")
      .then(response => {
        boundChangeImagesLinksInState(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    /* if (window.innerWidth > 1023) {
      const images = document.querySelector(".galleryPageSection").childNodes;
      images.forEach(image => {
        image.addEventListener("click", this.handleImageClick);
      });
    } else {
      const allImages = document.querySelectorAll(".galleryImg");
      allImages.forEach(image => {
        image.style.display = "none";
      });
    } */
  }
  handleImageClick = e => {
    console.log(e.target);
    const images = document.querySelectorAll(".galleryImg");
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
  addListeners = () => {
    const images = document.querySelectorAll(".galleryImg");
    images.forEach(image => {
      image.addEventListener("click", this.handleImageClick);
    });
  };
  changeImagesLinksInState = respo => {
    this.setState({
      imagesLinks: respo.reverse()
    });
  };
  render() {
    const state = this.state;
    const renderImages = this.state.imagesLinks.map(function(image, i) {
      return (
        <img
          className="galleryImg"
          id={"galleryImage" + i}
          key={i}
          src={state.imagesLinks[i].src}
          alt="info"
        />
      );
    });
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
          {renderImages}
        </section>
        <GalleryPageFooter />
      </>
    );
  }
}
export default GalleryPage;
