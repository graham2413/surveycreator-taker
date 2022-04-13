import React, {useState,useEffect,useContext } from 'react';
import Nav from './Nav'
import {useParams,Link,useHistory} from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database";
import { AuthContext } from "../Auth";
import firebase from "../config";


export default function TakeSurvey() {
   
   
    const {surveyName,handle} = useParams();

    const dbRef = ref(getDatabase());

    const db = firebase.database();


    const [surveys,setSurveys] =useState([]);

    const [form, setForm]=useState([]);

    const history = useHistory();

    const { currentUser } = useContext(AuthContext);

    const routeChange = () =>{ 
      let path = `/`; 
      history.push(path);
    }



    useEffect(() => {
   get(child(dbRef, `Users/` + handle + `/surveysCreated/${surveyName}/survey`)).then((snapshot) => {
    if (snapshot.exists()) {
    //  console.log(snapshot.val());
     setSurveys(snapshot.val());
  
    } else {
      console.log("No name exists");
    }
  }).catch((error) => {
    console.error(error);
  });
}, []);

   
const dataHandler = (event) => {
  event.preventDefault();

  if(form[0]===""){
    form.splice(0, 1);
  }

  console.log(form)   

  var postData={

    form
  }
   try{

  var updates = {};
  updates[`Users/` + handle + `/surveysCreated/${surveyName}/surveyResults/${currentUser.uid}`] = postData;
 firebase.database().ref().update(updates);
   }catch(error){console.log(error);}

 

  routeChange();
}

function lol(){
  console.log("lol");
}
   
    return (
        <div>
            <div>
                <Nav/>
            </div>
            <div className= "surveybody">
            <h1 className="teacherthing">{surveyName}</h1> <br></br><br></br><br></br>
         
         <form onSubmit={dataHandler}>

            {surveys.map((element,index)=>{
                if(surveys[index].quesType==="Yes/No"){
               return <div key={index+1} className="AppointmentBlock"><h2 className="apps">{index+1}. {surveys[index].questionContent}</h2>   <br></br> Yes <input  name="checkboxyesno"  onChange={(e)=>setForm(prev=>[...prev,true])} type="checkbox"></input> <br></br> No <input onChange={(e)=>setForm(prev=>[...prev,false])} type="checkbox"></input> </div>
                }
                else if(surveys[index].quesType==="freeResponse"){
                    return <div key={index+1} className="AppointmentBlock"><h2 className="apps">{index+1}. {surveys[index].questionContent}</h2>   <br></br> <input name="texttype" onBlur={(e)=>setForm(prev=>[...prev,e.target.value])} type="text" autoFocus></input> </div>
                }
              //   else if(surveys[index].quesType==="Scale"){
              //     return <div key={index+1} className="AppointmentBlock"><h2 className="apps">{index+1}. {surveys[index].questionContent}</h2>   <br></br> <input id="range" onBlur={(e)=>setForm(prev=>[...prev,e.target.value])} type="range" min="0" max="5"  autoFocus></input> </div>
              // }
                       })}

                <input type="submit" />
         </form>
            </div>
            
        </div>
    )
}
