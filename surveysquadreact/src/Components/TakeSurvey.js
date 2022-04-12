import React, {useState,useEffect } from 'react';
import Nav from './Nav'
import {useParams,Link} from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database";



export default function TakeSurvey() {
   
   
    const {surveyName,handle} = useParams();

    const dbRef = ref(getDatabase());

    const [surveys,setSurveys] =useState([]);




    useEffect(() => {
   get(child(dbRef, `Users/` + handle + `/surveysCreated/${surveyName}/survey`)).then((snapshot) => {
    if (snapshot.exists()) {
     console.log(snapshot.val());
     setSurveys(snapshot.val());
  
    } else {
      console.log("No name exists");
    }
  }).catch((error) => {
    console.error(error);
  });
}, []);
   

  function renderSurvey() {
      
    //for (let index = 0; index < surveys.length; index++) {
         console.log(surveys);
        
    // }
  }
   
    return (
        <div>
            <div>
                <Nav/>
            </div>
            <div className= "surveybody">
            <h1 className="teacherthing">{surveyName}</h1> <br></br><br></br><br></br>
            {renderSurvey}

            {surveys.map((element,index)=>{
                if(surveys[index].quesType==="Yes/No"){
               return <div key={index+1} className="AppointmentBlock"><h2 className="apps">{index+1}. {surveys[index].questionContent}</h2>   <br></br> Yes <input type="checkbox"></input> <br></br> No <input type="checkbox"></input> </div>
                }
                else{
                    return <div key={index+1} className="AppointmentBlock"><h2 className="apps">{index+1}. {surveys[index].questionContent}</h2>   <br></br> <input type="text"></input> </div>
                }
                       })}

            </div>
            
        </div>
    )
}
