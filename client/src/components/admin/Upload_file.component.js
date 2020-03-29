import React from "react";
import axios from "axios";

class UploadFile extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const boundThisProps = this.props;
    const imageLink = document.querySelector(".imageLinkInput").value;
    axios
      .post("/api/manage_image/add_image", {
        link: imageLink
      })
      .then(boundThisProps.rerender);
  };
  render() {
    return (
      <>
        <form
          onSubmit={this.handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="text"
            placeholder="wklej link do zdjęcia"
            className="imageLinkInput"
            style={{
              width: "80vw",
              height: "3rem",
              marginTop: "1.5rem",
              fontSize: "1.3rem"
            }}
          ></input>
          <input
            type="submit"
            value="załaduj zdjęcie"
            className="uploadInput"
          />
        </form>
      </>
    );
  }
}

export default UploadFile;
