import React, {useState,useEffect,useContext } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import {useParams,Link} from "react-router-dom"
import Nav from './Nav'
import { AuthContext } from '../Auth';
import firebase from "../config";
import GenericPdfDownloader from "./GenericPdfDownloader";


export default function SurveyResults() {

    const dbRef = ref(getDatabase());
    const { currentUser } = useContext(AuthContext);

    const {handle} = useParams();

    const [surveyResults, setSurveyResults]=useState([]);

    const [thaTrue, setThaTrue]=useState(null);

    const [resultsresults, setResultsResults]=useState([]);


    const resHandler=(theInfo)=>{

      setResultsResults(state => [...state,
        theInfo
      ]);
    }
    

    
    useEffect(() => {
        get(child(dbRef, `Users/` + currentUser.uid + `/surveysCreated/` + handle + `/surveyResults`)).then((snapshot) => {
         if (snapshot.exists()) {
        
          //  console.log(snapshot.val());
           setSurveyResults(snapshot.val());
       
         } else {
           console.log("No results exist");
         }
       }).catch((error) => {
         console.error(error);
       });
     }, []);


     useEffect(() => {
      get(child(dbRef, `Users/` + currentUser.uid + `/surveysCreated/${handle}`)).then((snapshot) => {
       if (snapshot.exists()) {
      
        console.log();
        if(snapshot.val().open==="true" || snapshot.val().open===true){
          setThaTrue(true);
        }
        else{
          setThaTrue(false);
        }
      
     
       } else {
         console.log("No name exists");
       }
     }).catch((error) => {
       console.error(error);
     });
   }, []);


   useEffect(() => {
     firebase.database().ref(`Users/${currentUser.uid}/surveysCreated/${handle}/surveyResults`).once('value', function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
              //  console.log(ChildSnapshot.val().form);
      resHandler(ChildSnapshot.val().form);
    
                }
            );
        });
              }, [])



   function closeSurv() {
    var db = firebase.database();
    db.ref(`Users/` + currentUser.uid + `/surveysCreated/${handle}/open`).set("false");
    document.location.reload();
   }

   function openSurv() {
    var db = firebase.database();
    db.ref(`Users/` + currentUser.uid + `/surveysCreated/${handle}/open`).set("true");
    document.location.reload();
  }

console.log(thaTrue);

function disResults() {

  return  resultsresults.map(function (nested) {
      return nested.map(function (element,index) {
          // console.log(element.answer);
          if(element.answer==="breakpoint"){
            index++;
            return "End of user results"
          }
          
       return <li key={index}>{element.answer}</li>
    });
  }); 
}


    return (
        <div>
            <div><Nav/></div>
            
            <h1>All of the survey: {handle}'s results are below</h1><br></br> <br></br>
            
            {thaTrue === true? (

              <button onClick={closeSurv}>Make survey closed</button> 
              ): 
              
            (  

          <button onClick={openSurv}>Make survey open</button>           
              )}
              <br></br> <br></br>
              

              <GenericPdfDownloader 
          downloadFileName="CustomPdf" 
          rootElementId="testId" 
        />
         <div id="testId"> 
            <ol>
            {/* {Object.keys(surveyResults).map((element)=>{
         return <div> <Link to={`/userSurveyResults/${element}/${handle}`}>{element} </Link><br></br></div>
       })} */}
                    {/* { resultsresults.map((element,index)=>{
            return <li key={index}>{element[index].answer}</li>
  })}   */}{disResults()}
    </ol> 
         </div>
 
      
        </div>
    )
}
