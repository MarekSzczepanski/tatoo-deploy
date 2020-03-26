import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header.component";
import UploadFile from "../../components/admin/Upload_file.component";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ManageImages extends React.Component {
  listOfImages;
  state = {
    imageToDelete: null
  };
  importAll(r) {
    return r.keys().map(r);
  }
  deleteImage = e => {
    document.querySelector(".popupRootImages").style.display = "block";
    e.target.style.border = "7px solid #e95252";
    e.target.style.backgroundColor = "#e95252";
    e.target.classList.add("redBorder");
    const fullPath = e.target.src;
    const fileName = fullPath.replace(/^.*[\\\/]/, "");
    const fileNameLength = fileName.length;
    let fileFormat;
    let fileNameNoHash;
    console.log(fileName.substring(fileNameLength - 4));
    if (fileName.substring(fileNameLength - 4, fileNameLength - 3) === ".") {
      fileFormat = fileName.substring(fileNameLength, fileNameLength - 4);
      fileNameNoHash = fileName.substring(0, fileNameLength - 13);
    } else if (fileName.substring(fileNameLength - 4) === "jpeg") {
      fileFormat = ".jpeg";
      fileNameNoHash = fileName.substring(0, fileNameLength - 14);
    }
    this.setState({
      imageToDelete: "../public/uploads/" + fileNameNoHash + fileFormat
    });
  };
  confirmDeletion = () => {
    axios
      .post("/api/images_list", {
        path: this.state.imageToDelete
      })
      .catch(error => {
        console.log(error);
      });
  };
  cancelDeletion = e => {
    const redBorder = document.querySelector(".redBorder");
    redBorder.style.borderStyle = "none";
    redBorder.style.backgroundColor = "transparent";
    document.querySelector(".popupRootImages").style.display = "none";
  };
  componentWillMount() {
    this.listOfImages = this.importAll(
      require.context("../../../public/uploads", false, /\.(png|jpe?g|svg)$/)
    );
  }

  render() {
    const style = "returnLink darkBackground";
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
        >
          {this.listOfImages.map((image, index) => (
            <img
              key={index}
              className={"galleryImg"}
              src={image}
              id={"galleryImage" + index}
              alt={"obrazek"}
              onClick={this.deleteImage}
            ></img>
          ))}
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
