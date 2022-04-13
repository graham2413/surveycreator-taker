import React, {useState,useEffect,useContext } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import Nav from './Nav';
import { AuthContext } from "../Auth";
import { Link } from 'react-router-dom';


export default function MySurveyResults() {
    
    const dbRef = ref(getDatabase());
    const { currentUser } = useContext(AuthContext);

    const [surveyNames, setSurveyNames]=useState([]);



    useEffect(() => {
        get(child(dbRef, `Users/` + currentUser.uid + `/surveysCreated`)).then((snapshot) => {
         if (snapshot.exists()) {
        
          // console.log(snapshot.val());
          setSurveyNames(snapshot.val());
       
         } else {
           console.log("No results exist");
         }
       }).catch((error) => {
         console.error(error);
       });
     }, []);
    
     console.log(surveyNames);
    

    return (
        <div>
            <div><Nav/></div>
       {Object.keys(surveyNames).map((element)=>{
         return <div><Link to={`/surveyResults/${element}`}>{element}</Link> <br></br></div>
       })}
            
        </div>
    )
}
