import React from "react";
import Header from "../../components/admin/Header.component";
import "../../styles/admin/Admin.css";

class Admin extends React.Component {
  componentDidMount() {
    document.querySelector(".adminLoginWrap").style.display = "flex";
  }
  componentWillUnmount() {
    document.querySelector(".adminLoginWrap").style.display = "none";
  }
  render() {
    return <Header />;
  }
}
export default Admin;
