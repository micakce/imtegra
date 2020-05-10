import { createContext } from "react";

export const AuthContext = createContext({
  authenticated: false, // to check if authenticated or not
  user: {}, // store all the user details
  accessToken: "", // accessToken of user for Auth0
  initiateLogin: () => {}, // to start the login process
  logout: () => {} // logout the user
});

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
