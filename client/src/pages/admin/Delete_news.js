import React from "react";
import DeleteNews from "../../components/admin/Delete_news.component";
import "../../styles/admin/Delete_news.css";

class Delete_news extends React.Component {
  render() {
    if (this.props.isAuthed) {
      return (
        <>
          <DeleteNews />
        </>
      );
    } else {
      return (
        <p className="noAccess">
          Musisz się zalogować, by korzystać z panelu administratora.
        </p>
      );
    }
  }
}
export default Delete_news;
