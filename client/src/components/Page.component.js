import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "../pages/Home";
import GalleryPage from "../pages/GalleryPage";
import Admin from "../pages/admin/Admin";
import AdminDashboard from "../pages/admin/Admin_dashboard";
import AddNews from "../pages/admin/Add_news";
import DeleteNews from "../pages/admin/Delete_news";
import ManageImages from "../pages/admin/Manage_images";
import ErrorPage from "../pages/Error_page";

class Page extends React.Component {
  state = {
    auth: true
  };

  componentWillMount() {
    fetch("/api/admin/auth").then(response => {
      this.setState({
        auth: response.data.auth
      });
      console.log("get", response.data);
      console.log(this.state.auth);
    });
    /* axios.get("/auth").then(response => {
      console.log("get", response.data);
      this.setState({
        auth: response.data.auth
      });
    }); */
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/galleryPage" component={GalleryPage} />
          <Route path="/admin" component={Admin} />
          <Route
            exact
            path="/admin_dashboard"
            render={props => (
              <AdminDashboard {...props} isAuthed={this.state.auth} />
            )}
          />
          <Route
            exact
            path="/admin_dashboard/add_news"
            render={props => <AddNews {...props} isAuthed={this.state.auth} />}
          />
          <Route
            exact
            path="/admin_dashboard/delete_news"
            render={props => (
              <DeleteNews {...props} isAuthed={this.state.auth} />
            )}
          />
          <Route
            exact
            path="/admin_dashboard/manage_images"
            render={props => (
              <ManageImages {...props} isAuthed={this.state.auth} />
            )}
          />
          <Route component={ErrorPage} />
        </Switch>
      </>
    );
  }
}

export default Page;
