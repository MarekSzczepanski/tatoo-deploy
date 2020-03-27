import React, { Fragment, useState } from "react";
import axios from "axios";

class UploadFile extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const boundThisProps = this.props;
    const imageLink = document.querySelector(".imageLinkInput").value;
    console.log(imageLink);
    axios
      .post("/api/manage_image/add_image", {
        link: imageLink
      })
      .then(console.log(555, boundThisProps))
      .then(boundThisProps.rerender);
  };
  render() {
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
          <input
            type="submit"
            value="załaduj zdjęcie"
            className="uploadInput"
          />
        </form>
      </Fragment>
    );
  }
}

export default UploadFile;
