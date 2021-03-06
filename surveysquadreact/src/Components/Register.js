import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../config";
import { Link } from "react-router-dom";
import "../CSS/login.css"

//register user functionality
const Register = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();

    const {full_name, email, password } = event.target.elements;

    const database = firebase.database()
    const auth = firebase.auth()

   
    try {
//creates user in auth
   await auth
        .createUserWithEmailAndPassword(email.value, password.value)
         history.push("/")

          var user = auth.currentUser
          var database_ref = database.ref()

          var userData = {
            full_name: full_name.value,
            email: email.value,
            surveysCreated: 0,
            UID: auth.currentUser.uid
        }         
            //pushes user to realtime db
          database_ref.child('Users/' + user.uid).set(userData)  

    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <body className="loginbody">
    <div className="central-box">
      <h1>Sign up</h1>
      <h2 className="signuptext">Signup below</h2>
      <form onSubmit={handleSignUp}>
      <label>
          <input name="full_name" type="text" placeholder="Full name" />
        </label>
        <br></br>    <br></br>
        <label>
          <input name="email" type="email" placeholder="email@email.com" />
        </label>
        <br></br>    <br></br>
        <label>
          <input name="password" type="password" placeholder="password123" />
        </label>
        <br></br>
        <button className="signintopage-registerintopage-buttons" type="submit">Sign Up</button>
      </form>
      <div>
        <Link to="/Login" className="register-signin-links">
          I already have an account. Take me to login!
        </Link>
      </div>
    </div>
    </body>
  );
};

export default withRouter(Register);