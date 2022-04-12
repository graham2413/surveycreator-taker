//Below is my office hours input information component
// import React, { useState, useEffect } from 'react';
// import firebase from "./config";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import SurveyCreator from "./Components/SurveyCreator"
import AccountsPage from './Components/AccountsPage';
import UserProfile from './Components/UserProfile';
import TakeSurvey from './Components/TakeSurvey';

function App() {

  return(
    <AuthProvider>
    <Router>
      <div>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <PrivateRoute exact path="/surveyCreator" component={SurveyCreator}/>
          <PrivateRoute exact path="/accountsPage" component={AccountsPage}/>
          <PrivateRoute exact path="/userProfile/:handle" component={UserProfile}/>
          <PrivateRoute exact path="/takeSurvey/:surveyName/:handle" component={TakeSurvey}/>


      </div>
    </Router>
    </AuthProvider>
  
  );
};


export default App;