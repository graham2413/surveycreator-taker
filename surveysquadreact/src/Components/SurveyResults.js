import React, {useState,useEffect,useContext } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import {useParams,Link} from "react-router-dom"
import Nav from './Nav'
import { AuthContext } from '../Auth';

export default function SurveyResults() {

    const dbRef = ref(getDatabase());
    const { currentUser } = useContext(AuthContext);

    const {handle} = useParams();

    const [surveyResults, setSurveyResults]=useState([]);

    
    useEffect(() => {
        get(child(dbRef, `Users/` + currentUser.uid + `/surveysCreated/` + handle + `/surveyResults`)).then((snapshot) => {
         if (snapshot.exists()) {
        
           console.log(snapshot.val());
           setSurveyResults(snapshot.val());
       
         } else {
           console.log("No results exist");
         }
       }).catch((error) => {
         console.error(error);
       });
     }, []);


     

    return (
        <div>
            <div><Nav/></div>
            <h1>Users who have taken your survey are below, choose a user to see their answers.</h1>
            {Object.keys(surveyResults).map((element)=>{
         return <div> <Link to={`/userSurveyResults/${element}/${handle}`}>{element} </Link><br></br></div>
       })}
        </div>
    )
}
