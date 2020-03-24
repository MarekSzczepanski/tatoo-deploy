import React from "react";
import { Link } from "react-router-dom";
import "../styles/Error_page.css";

const Error_page = () => {
  return (
    <>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Strona nie istnieje</h2>
          <p>
            Przepraszamy, ale strona, na którą próbujesz się dostać nie istnieje
          </p>
          <Link to="/">Wróć na stronę główną</Link>
        </div>
      </div>
    </>
  );
};

export default Error_page;
