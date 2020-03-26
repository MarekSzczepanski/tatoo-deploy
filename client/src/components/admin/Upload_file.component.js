import React, { Fragment, useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/add_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {}
  };
  const showFileName = () => {
    document.querySelector(".fileName").style.display = "block";
  };
  const handleSubmit = () => {
    const imageLink = document.querySelector(".imageLinkInput").value;
    console.log(imageLink);
    const newImage = document.createElement("img");
    console.log(newImage);
    document
      .getElementById("manageImagesGalleryPageSection")
      .appendChild(newImage);
    newImage.src = imageLink;
    newImage.classList.add(".galleryImg");
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input type="text" className="imageLinkInput"></input>
      </form>
      <form onSubmit={onSubmit} className="uploadForm">
        <input
          type="file"
          className="uploadBrowseInput"
          id="customFile"
          onChange={onChange}
        />
        <label
          className="uploadBrowseLabel"
          htmlFor="customFile"
          onClick={showFileName}
        >
          wybierz zdjęcie
        </label>
        <p className="fileName">{filename}</p>
        <input type="submit" value="załaduj zdjęcie" className="uploadInput" />
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
};

export default UploadFile;
