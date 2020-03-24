import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.component";
import "../../styles/admin/Admin_dashboard.css";

const AdminDashboard = () => {
  const classNames = [
    "adminDashboardLink greenBackground",
    "adminDashboardLink redBackground",
    "adminDashboardLink blueBackground",
    "adminDashboardLink darkBackground"
  ];
  return (
    <>
      <Header />
      <nav>
        <ul className="adminDashboardLinkWrap">
          <li className={classNames[0]}>
            <Link to="/admin_dashboard/add_news">dodaj wiadomość</Link>
          </li>
          <li className={classNames[1]}>
            <Link to="/admin_dashboard/delete_news">usuń wiadomość</Link>
          </li>
          <li className={classNames[2]}>
            <Link to="/admin_dashboard/manage_images">zarządzaj zdjęciami</Link>
          </li>
          <li className={classNames[3]}>
            <Link to="/">strona główna</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default AdminDashboard;
