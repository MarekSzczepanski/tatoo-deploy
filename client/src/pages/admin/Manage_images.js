import React from "react";
import ManageImages from "../../components/admin/Manage_images.component";
import "../../styles/admin/Manage_images.css";

class Manage_images extends React.Component {
  render() {
    if (this.props.isAuthed) {
      return (
        <>
          <ManageImages />
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
export default Manage_images;
