import React, { Fragment, useState } from "react";
import axios from "axios";

class UploadFile extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const imageLink = document.querySelector(".imageLinkInput").value;
    console.log(imageLink);
    axios
      .post("/api/manage_image/add_image", {
        link: imageLink
      })
      .then(console.log(555, this.props))
      .then(this.props.rerender());
    /* const imageLink = document.querySelector(".imageLinkInput").value;
    console.log(imageLink);
    const newImage = document.createElement("img");
    console.log(newImage);
    document
      .getElementById("manageImagesGalleryPageSection")
      .appendChild(newImage);
    newImage.src = imageLink;
    newImage.classList.add(".galleryImg"); */
  };
  render() {
    console.log(this.state.rerenderOnNumberChange);
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="imageLinkInput"></input>
        </form>
        <form className="uploadForm">
          <input type="file" className="uploadBrowseInput" id="customFile" />
          <label className="uploadBrowseLabel" htmlFor="customFile">
            wybierz zdjęcie
          </label>
          {/*           <p className="fileName">{filename}</p> */}
          <input
            type="submit"
            value="załaduj zdjęcie"
            className="uploadInput"
          />
        </form>
        {/*  {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <img
              className="imageToMove"
              style={{ display: "none" }}
              src={uploadedFile.filePath}
              alt=""
            />
          </div>
        </div>
      ) : null} */}
      </Fragment>
    );
  }
}

export default UploadFile;
