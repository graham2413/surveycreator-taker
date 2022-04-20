import { Link } from 'react-router-dom';
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect,useContext } from 'react';
import { AuthContext } from "../Auth";
import Nav from './Nav';
import "../CSS/index.css"


function Home() {
  
  //state variables, imports

  const dbRef = ref(getDatabase());

  const [userNamename, setuserNamename]=useState(null);
  const { currentUser } = useContext(AuthContext);
  
    // sets current users name
  useEffect(() => {
    get(child(dbRef, `Users/` + currentUser.uid + "/full_name")).then((snapshot) => {
      if (snapshot.exists()) {
        setuserNamename(snapshot.val());
      } else {
        console.log("No fullName exists");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);


  return (

    <div className="home">
     <Nav/>
        <div>
        
          <br></br>
          <h1 className="welcomeCSS">Welcome to Survey Squad Home, {userNamename}</h1>
          <div className="homebody">
          <Link to={`/surveyCreator`} className="appointmentLB">Create Survey</Link>
            </div>


        </div>
      
      
     
    </div>

  );
}
export default Home;
