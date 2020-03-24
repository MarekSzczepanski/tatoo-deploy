import React from "react";
import AdminDashboard from "../../components/admin/Admin_dashboard.component";
import "../../styles/admin/Admin_dashboard.css";

class Admin_dashboard extends React.Component {
  render() {
    if (this.props.isAuthed) {
      return <AdminDashboard />;
    } else {
      return (
        <p className="noAccess">
          Nie masz uprawnień do przeglądania tej strony
        </p>
      );
    }
  }
}
export default Admin_dashboard;
