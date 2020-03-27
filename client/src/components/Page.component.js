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

import { Redirect } from "react-router-dom";

class Page extends React.Component {
  state = {
    auth: false
  };

  render() {
    console.log("page props", this.props.isAuthed);
    console.log("page state", this.state.auth);
    if (this.props.isAuthed && !this.state.auth) {
      this.setState({
        auth: true
      });
    }
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

/* componentWillMount() {
    axios.get("http://localhost:5000/api/admin/auth").then(response => {
      this.setState({
        auth: response.data.auth
      });
    });
  } */
/*   render() { */
/* axios.get("http://localhost:5000/api/admin/auth").then(response => {
      console.log(response.data.auth);
      if (response.data.auth) {
        console.log(this.state.auth);
        this.setState({
          auth: true
        });
      } else {
        console.log(this.state.auth);
      }
    }); */
/*     return (
      <>
        
      </>
    ); */
/*   }
} */

export default Page;
