import React, { useState, useContext} from 'react';
import firebase from "../config";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../Auth";
import "../CSS/index.css"
import Nav from './Nav';


function SurveyCreator() {

    //state variables, imports, and routechanges
  const history = useHistory();
  const [surveyName, setSurveyName]=useState("");
  
  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  }

  // sets survey name
  function surveyNamer(event) {
    setSurveyName(event.target.value);
    
  }

    //state variables, imports
  const { currentUser } = useContext(AuthContext);

  const db = firebase.database();

 const [form, setForm]=useState([]);
 
// saves survey creation data nd submits to db
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
console.log(form);
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
      <h1 className="SurveyCreator">Survey Creator</h1> <br></br><br></br>
 </div>
  
<form onSubmit={dataHandler}>

<div className="surveynamecont">
<input onChange={surveyNamer} name="surveyname" id="surveyname" placeholder="Survey Name"></input> <br></br><br></br>
</div>
<div className="addQ" >
<button onClick={handleAddSlot}>Add Question</button>   <br></br>  <br></br>
</div>
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
  <div className="subDiv">
  <input className="subber" type="submit" />
  </div>
</form>

</div>
  );
}
export default SurveyCreator;