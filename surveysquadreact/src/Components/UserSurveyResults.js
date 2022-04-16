import React, {useState,useEffect,useContext } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import {useParams} from "react-router-dom"
import Nav from './Nav'
import { AuthContext } from '../Auth';

export default function UserSurveyResults() {

    const dbRef = ref(getDatabase());
    const { currentUser } = useContext(AuthContext);

    const {handle,another} = useParams();
console.log(handle);


    const [surveyAnsuhs, setSurveyAnsuhs]=useState([]);

    
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
    
    return (
        <div>
            <div><Nav/></div>

            <ol>
            {surveyAnsuhs.map((value, index) => {
                if(value===true){
                    return <li>True</li>
                }
               else if(value===false){
                    return <li>False</li>
                }
                else{
                return <li>{value}</li>}
                })}
            </ol>
        </div>
    )
}
