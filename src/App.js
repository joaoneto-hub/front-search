import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/global.js";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={3000} />

      <GlobalStyle />
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />

          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
