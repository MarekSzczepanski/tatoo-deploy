import React, { Fragment, useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [heh, setHeh] = useState("");

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
  const hehe = () => {
    const heh = document.querySelector(".hehe").value;
    console.log(heh);
    const im = document.createElement("img");
    console.log(im);
    document.getElementById("manageImagesGalleryPageSection").appendChild(im);
    im.src = heh;
  };
  const hoho = () => {
    const heh = document.querySelector(".hehe").value;
    console.log("hehe", heh);
    setUploadedFile(heh);
  };
  return (
    <Fragment>
      <form onSubmit={hehe}>
        <input onChange={hoho} type="text" className="hehe"></input>
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
      {uploadedFile ? (
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
      ) : null}
    </Fragment>
  );
};

export default UploadFile;
