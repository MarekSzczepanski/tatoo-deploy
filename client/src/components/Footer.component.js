import React from "react";
import "../styles/styles.scss";

const Footer = () => {
  return (
    <footer>
      <p className="footerText">
        © <span className="footerSpan">{new Date().getFullYear()}</span> Marek
        Szczepański
      </p>
    </footer>
  );
};

export default Footer;
