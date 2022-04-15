//Below is my office hours input information component
import React, { useState, useContext} from 'react';
import firebase from "../config";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../Auth";
import "../CSS/index.css"
import Nav from './Nav';


function SurveyCreator() {

  const history = useHistory();
  const [surveyName, setSurveyName]=useState("");
  
  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  }

  function surveyNamer(event) {
    setSurveyName(event.target.value);
    
  }

  const { currentUser } = useContext(AuthContext);

  const db = firebase.database();

 const [form, setForm]=useState([]);
 

 const dataHandler = (event) => {
    event.preventDefault();
    console.log("Info as follows:",form)   
     

    var postData = {
      survey: form,
      open:true
 
    };
   
    var newPostKey = db.ref("Users/").child(surveyName).key;
    var updates = {};
    updates["Users/" + currentUser.uid+'/surveysCreated/' + newPostKey] = postData;
   firebase.database().ref().update(updates);

    routeChange();
  }


  
  function handleAddSlot(e){
    e.preventDefault();
      const inputState={

    };

  setForm(prev=>[...prev,inputState])
};

const onChange=(index,event)=>{

event.preventDefault();
event.persist();

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
};

const handleRemove=(e,index)=>{
  e.preventDefault();

  setForm(prev=>prev.filter((item)=>item!==prev[index]));
}




  return (
<div>
<Nav/>
  <br></br>
  <div className="firsttextcont">
      <h1>Survey Creator</h1>
      <h2>Format question type as follows -- </h2>
      <h3>Available question types are (CASE SENSITIVE): Yes/No, freeResponse, and Scale (1-5 scale)</h3>
 </div>
  
<form onSubmit={dataHandler}>

<div className="surveynamecont">
<input onChange={surveyNamer} name="surveyname" id="surveyname" placeholder="Survey Name"></input> <br></br><br></br>
</div>

<button onClick={handleAddSlot}>Add Question</button>   <br></br>  <br></br>
{
  form.map((item,index)=>(
 
 <div key={`item-${index}`}>
     <br></br> 
    <div>
        <select  onChange={(e)=>onChange(index,e)} name="responses" id="responses">
        <option value="n/a">Choose Question Type:</option>
      <option value="Yes/No">Yes/No</option>
      <option value="freeResponse">Free Response</option>
      <option value="Scale">Scale</option>
         </select>

    </div>
    <div>
        <input 
        type="text" 
        name="questionContent" 
        placeholder="Question Content"
         value={item.end}
          onChange={(e)=>onChange(index,e)}
          />
     <div>
    </div>
    </div>
    

    <button onClick={(e)=>handleRemove(e,index)}>Remove Question</button>
    </div>

  ))}

  <br></br>
  <input type="submit" />

</form>


</div>
  );
}
export default SurveyCreator;