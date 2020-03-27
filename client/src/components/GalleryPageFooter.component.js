import React from "react";
import "../styles/styles.scss";

const GalleryPageFooter = () => {
  return (
    <footer>
      <p className="footerText" id="galleryPageFooter">
        © <span className="footerSpan">{new Date().getFullYear()}</span> Marek
        Szczepański
      </p>
    </footer>
  );
};

export default GalleryPageFooter;
