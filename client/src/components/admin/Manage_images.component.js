import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.component";
import UploadFile from "../../components/admin/Upload_file.component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

class ManageImages extends React.Component {
  state = {
    imageToDelete: null,
    imagesLinks: [],
    rerender: false
  };
  componentDidMount() {
    const boundChangeImagesLinksInState = this.changeImagesLinksInState.bind(
      this
    );
    const boundAddListeners = this.addListeners.bind(this);
    axios
      .get("/api/images_list")
      .then(response => {
        boundChangeImagesLinksInState(response.data);
      })
      .then(boundAddListeners)
      .catch(error => {
        console.log(error);
      });
  }
  componentWillUnmount() {
    const images = document.querySelector(".galleryPageSection").childNodes;
    images.forEach(image => {
      image.removeEventListener("click", this.deleteImage);
    });
  }
  deleteImage = e => {
    this.setState({
      imageToDelete: e.target.id
    });
    document.querySelector(".popupRootImages").style.display = "block";
    e.target.style.border = "7px solid #FED230";
    e.target.style.backgroundColor = "#FED230";
    e.target.classList.add("redBorder");
  };
  confirmDeletion = () => {
    const imageToDelete = document.getElementById(this.state.imageToDelete);
    imageToDelete.remove();
    document.querySelector(".popupRootImages").style.display = "none";
    axios.post(
      "/api/manage_image/" +
        this.state.imagesLinks[imageToDelete.id.slice(12)]._id
    );
  };
  cancelDeletion = e => {
    const redBorder = document.querySelector(".redBorder");
    redBorder.style.borderStyle = "none";
    redBorder.style.backgroundColor = "transparent";
    document.querySelector(".popupRootImages").style.display = "none";
  };
  addListeners = () => {
    const images = document.querySelectorAll(".galleryImg");
    const boundDelete = this.deleteImage.bind(this);
    images.forEach(image => {
      image.addEventListener("click", boundDelete);
    });
  };
  changeImagesLinksInState = response => {
    this.setState({
      imagesLinks: response.reverse(),
      rerender: false
    });
  };
  rerenderComponent = () => {
    this.setState({
      rerender: true
    });
  };
  render() {
    if (this.state.rerender) {
      const boundChangeImagesLinksInState = this.changeImagesLinksInState.bind(
        this
      );
      const boundAddListeners = this.addListeners.bind(this);

      axios
        .get("/api/images_list")
        .then(response => {
          boundChangeImagesLinksInState(response.data);
        })
        .then(boundAddListeners)
        .catch(error => {
          console.log(error);
        });
    }

    const style = "returnLink darkBackground";
    const state = this.state;
    const renderImages = this.state.imagesLinks.map(function(image, i) {
      return (
        <img
          key={i}
          className="galleryImg"
          id={"galleryImage" + i}
          src={state.imagesLinks[i].src}
          alt="obrazek"
        />
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
        <div className="imageUploadContainer">
          <h1 className="uploadH1">Dodaj zdjęcie</h1>
          <div className="imagesContainer"></div>
          <UploadFile rerender={this.rerenderComponent} />
        </div>
        <h1 className="deleteImageH1">Kliknij na zdjecie by je usunąć</h1>
        <section
          className="galleryPageSection"
          style={{ backgroundColor: "#ccc" }}
          id="galleryPageSection"
        >
          {renderImages}
          <div id="popupRoot" className="popupRootImages">
            <div id="popupWrapDelete">
              <p id="popupMessageDelete">
                Czy na pewno chcesz usunąć to zdjęcie?
              </p>
              <div className="popupButtonsWrap">
                <button id="popupButtonDelete" onClick={this.confirmDeletion}>
                  Usuń
                </button>
                <button id="popupButtonDelete" onClick={this.cancelDeletion}>
                  Anuluj
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default ManageImages;
