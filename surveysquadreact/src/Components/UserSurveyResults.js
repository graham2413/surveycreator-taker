import React, {useState,useEffect,useContext } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import {useParams} from "react-router-dom"
import Nav from './Nav'
import { AuthContext } from '../Auth';

export default function UserSurveyResults() {

    const dbRef = ref(getDatabase());
    const { currentUser } = useContext(AuthContext);

    const {handle,another} = useParams();

    const [surveyAnsuhs, setSurveyAnsuhs]=useState([]);

    const [namer, setNamer]=useState();

    useEffect(() => {
        get(child(dbRef, `Users/` + currentUser.uid + `/surveysCreated/`  + another + `/surveyResults`)).then((snapshot) => {
         if (snapshot.exists()) {
        
        //    console.log(snapshot.val()[handle].form);
            setSurveyAnsuhs(snapshot.val()[handle].form);
       
         } else {
           console.log("No results exist");
         }
       }).catch((error) => {
         console.error(error);
       });
     }, []);


     useEffect(() => {
        get(child(dbRef, `Users/${handle}`)).then((snapshot) => {
         if (snapshot.exists()) {
        
            setNamer(snapshot.val().full_name);
            // setSurveyAnsuhs(snapshot.val()[handle].form);
       
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
           <h2 className="namer"> {namer}'s' Results</h2>
            <ol className="surveyAnsuhs">
            {Object.values(surveyAnsuhs).map((value, index) => {
        return <li key={index}>{value.answer}</li>
        })}
            </ol>
        </div>
    )
}
