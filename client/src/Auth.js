import React, {Component} from "react";
import {AuthProvider} from "./authContext";
import {withRouter} from "react-router-dom";
import utilStorage from './helpers/utilStorage';
import {axiosInstance, setTokenInAxios} from "./helpers/axios";

class Auth extends Component {

  state = {
    authenticated: utilStorage.tokenExists(),
    user: {
      role: utilStorage.roleExists() ? utilStorage.getRole() : "visitor"
    },
    accessToken: ""
  };

  initiateLogin = async ({ e, email, password, alertFunction}) => {
    e.preventDefault();
    let response;
    try {
      response = await axiosInstance.post('/signin', {email, password})
      console.log(response);
    } catch (err) {
      console.error(err.response);
      response = err.response;
    } finally {

      const {auth, role, token, message} = response.data;
      response = null

      if (!auth) {
        console.log(message);
        alertFunction(message)
        return
      }

      this.setState({
        authenticated: auth,
        user: {
          role: role,
        },
        accessToken: token
      });

      localStorage.setItem('imtegra-jwt', token)
      localStorage.setItem('imtegra-role', role)
      setTokenInAxios(token)
      this.props.history.push(this.props.location.pathname)
    }
  };

  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor"
      },
      accessToken: ""
    });
    localStorage.clear()
  };



  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default withRouter(Auth);
