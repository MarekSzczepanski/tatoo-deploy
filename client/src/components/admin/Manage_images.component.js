import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header.component";
import UploadFile from "../../components/admin/Upload_file.component";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ManageImages extends React.Component {
  resp;
  state = {
    imageToDelete: null,
    imagesLinks: []
  };
  deleteImage = e => {
    console.log("y");
    this.setState({
      imageToDelete: e.target.id
    });
    document.querySelector(".popupRootImages").style.display = "block";
    e.target.style.border = "7px solid #e95252";
    e.target.style.backgroundColor = "#e95252";
    e.target.classList.add("redBorder");
  };
  confirmDeletion = () => {
    const imageToDelete = document.getElementById(this.state.imageToDelete);
    imageToDelete.remove();
  };
  cancelDeletion = e => {
    const redBorder = document.querySelector(".redBorder");
    redBorder.style.borderStyle = "none";
    redBorder.style.backgroundColor = "transparent";
    document.querySelector(".popupRootImages").style.display = "none";
  };
  changeState = respo => {
    this.setState({
      imagesLinks: respo.reverse()
    });
  };
  componentDidMount() {
    console.log("this", this);
    const boundState = this.changeState.bind(this);
    axios
      .get("/api/images_list")
      .then(response => {
        boundState(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    const images = document.querySelectorAll(".manageImg");
    images.forEach(image => {
      image.addEventListener("click", this.deleteImage);
    });
  }
  render() {
    const style = "returnLink darkBackground";
    const state = this.state;
    const renderImages = this.state.imagesLinks.map(function(image, i) {
      return (
        <img
          className="manageImg"
          id={"galleryImage" + i}
          key={i}
          src={state.imagesLinks[i].src}
          alt="info"
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
          <UploadFile />
        </div>
        <h1 className="deleteImageH1">Kliknij na zdjecie by je usunąć</h1>
        <section
          className="galleryPageSection"
          style={{ backgroundColor: "#ccc" }}
          id="manageImagesGalleryPageSection"
        >
          <div className="imagesWrap">{renderImages}</div>
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
