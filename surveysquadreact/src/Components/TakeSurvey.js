import React, {useState,useEffect,useContext } from 'react';
import Nav from './Nav'
import {useParams,useHistory} from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database";
import { AuthContext } from "../Auth";
import firebase from "../config";


export default function TakeSurvey() {
   
   var   tryer=0;
    const {surveyName,handle} = useParams();

    const dbRef = ref(getDatabase());

    const [thaTrue, setThaTrue]=useState(null);

    const [surveys,setSurveys] =useState([]);

    const [notTakey,setNoTakey] =useState(false);

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


useEffect(() => {

firebase.database().ref(`Users/` + handle + `/surveysCreated/${surveyName}/surveyResults`).on('value', (snapData) => {

   for (let index = 0; index < snapData.numChildren(); index++) {
     
    var key = Object.keys(snapData.val())[index];
 
    if(key === currentUser.uid){
      setNoTakey(true);
    }
   }
})

}, []);


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

   

useEffect(() => {
  get(child(dbRef, `Users/` + handle + `/surveysCreated/${surveyName}/`)).then((snapshot) => {
   if (snapshot.exists()) {

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



const onchange=(index,event)=>{
  // console.log(form);
  event.preventDefault();
  event.persist();

  setForm(prev=>[...prev,null])

  for (let index = 0; index < form.length; index++) {


 if(form[index]===null){
  form.splice(index,1)
 }

  }

  setForm(prev=>{
   return prev.map((item,i)=>{
   
  if (i!==index){
    return item;
  } 
  return{
  ...item,
  [event.target.name]:event.target.value,
  }
    });
  
  });console.log(form);
  };



  const dataHandler = (event) => {
    
    event.preventDefault();

    // need to add breakpoint to end of form here

  
    for (let index = 0; index < form.length; index++) {

      if(form[index]===null){
       form.splice(index,1)
      }
       }

    var postData={
      form
    }
     try{
  
    var updates = {};
    updates[`Users/` + handle + `/surveysCreated/${surveyName}/surveyResults/${currentUser.uid}`] = postData;
   firebase.database().ref().update(updates);
     }catch(error){console.log(error);}
  
  //  alert(`Thank you for taking ${handle}'s survey! Your response has been recorded`);
  //   routeChange();
  }

  function radioFunc(index,event) {
     
  event.preventDefault();
  event.persist();

  setForm(prev=>[...prev,null])

  for (let index = 0; index < form.length; index++) {

 if(form[index]===null){
  form.splice(index,1)
 }
  }

  setForm(prev=>{
   return prev.map((item,i)=>{
   
  if (i!==index){
    return item;
  } 
  return{
  ...item,
  [event.target.name]:event.target.value,
  }
    });
  
  });  
  event.preventDefault();
  event.persist();

  setForm(prev=>[...prev,null])

  for (let index = 0; index < form.length; index++) {

 if(form[index]===null){
  form.splice(index,1)
 }
  }

  setForm(prev=>{
   return prev.map((item,i)=>{
   
  if (i!==index){
    return item;
  } 
  return{
  ...item,
  [event.target.name]:event.target.value,
  }
    });
  
  });console.log(form);
  };
    
  function saveData(params) {
    setForm(oldArray => [...oldArray,{answer:"breakpoint"}] );
    console.log(form);
  }

    return (
        <div>
            <div>
                <Nav/>
            </div>
                     
                         {notTakey === true || thaTrue === false? (
                   <div className="canttake">You have either already taken this survey, or it has has been closed.</div>

              ): 
              
              (  
             
            <div className= "surveybody">
            <h1 className="teacherthing">{surveyName}</h1> <br></br><br></br><br></br>
           
         
         <form onSubmit={dataHandler}>

            {surveys.map((element,index)=>{
                if(surveys[index].responses==="Yes/No"){
               return <div key={index+1} className="AppointmentBlock"><h2 className="apps">{index+1}. {surveys[index].questionContent}</h2>   <br></br> <div onChange={(e)=>radioFunc(index,e)}> <input type="radio" value="Yes" name="answer" /> Yes  <input type="radio" value="No" name="answer" /> No</div></div>
                }
                else if(surveys[index].responses==="freeResponse"){
                    return <div key={index+1} className="AppointmentBlock"><h2 className="apps">{index+1}. {surveys[index].questionContent}</h2>   <br></br> <input name="answer" onChange={(e)=>onchange(index,e)} type="text" autoFocus></input> </div>
                }
                else if(surveys[index].responses==="Scale"){
                  return <div key={index+1} className="AppointmentBlock"><h2 className="apps">{index+1}. {surveys[index].questionContent}</h2>   <br></br> <input id="range" name="answer" onChange={(e)=>onchange(index,e)} type="range" min="0" max="5"  autoFocus></input> <br></br><output></output></div>
              }
                       })}

                <button onClick={saveData}>Submit Survey</button> <br></br><br></br><br></br>
         </form>
            </div>
            
            )} </div>
    )
}