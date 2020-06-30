  
import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Route } from 'react-router-dom';

import OrgChartPage from "./pages/OrgChartPage/OrgChartPage";
import AboutPage from "./pages/AboutPage/AboutPage"

import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

function App() {

  return (
    <Router>
      <Header />
      <Route
        exact
        path="/"
        render={
          (props) => (
            <OrgChartPage/>
          )
        }
      />
      <Route
        exact
        path="/about"
        render={
          (props) => (
            <AboutPage/>
          )
        }
      />
      <Footer/>
    </Router>
  );
}

export default App;