import React from "react";
import AddNews from "../../components/admin/Add_news.component";
import "../../styles/admin/Add_news.css";

class Add_news extends React.Component {
  render() {
    if (this.props.isAuthed) {
      return <AddNews />;
    } else {
      return (
        <p className="noAccess">
          Musisz się zalogować, by korzystać z panelu administratora. 1111
        </p>
      );
    }
  }
}
export default Add_news;
