import React, {useState } from 'react';
import {useParams,Link} from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database";
import Nav from './Nav';
import '../CSS/index.css'

///Purpose is for students to be able to see all teachers to choose from

function UserProfile() {

const [user,setUser] =useState(null);
const [surveys,setSurveys] =useState([]);

const {handle} = useParams();

const dbRef = ref(getDatabase());

const [searchTerm, setSearchTerm]=useState('');

//set user name for profile
get(child(dbRef, `Users/` + handle + `/full_name`)).then((snapshot) => {
  if (snapshot.exists()) {
    var tryMe = snapshot.val();
    setUser(tryMe);

  } else {
    console.log("No name exists");
  }
}).catch((error) => {
  console.error(error);
});

//set surveys created by the selected user
get(child(dbRef, `Users/` + handle + `/surveysCreated`)).then((snapshot) => {
    if (snapshot.exists()) {
        setSurveys(snapshot.val());
    } else {
      console.log("No name exists");
    }
  }).catch((error) => {
    console.error(error);
  });

  return(

      <div className="homer">
      
        <Nav/>
       
        <h1 className="teacherthing">{user}'s Profile</h1> <br></br><br></br><br></br>
    

        <h1 className="allUsers">All Surveys</h1>
        <input onChange={event => setSearchTerm(event.target.value)} className="searchbar" type="text" placeholder="Search surveys..."/>

        {Object.entries(surveys).filter((val)=>{
         if(searchTerm === ""){
        return val;
        
         }
         else if(val[0].toLowerCase().includes(searchTerm.toLowerCase())){
           return val;
         }
       }).map((value, index) => {

        return <Link to={`/takeSurvey/${value[0]}/${handle}`} className="eachTeach" key={index}>{value[0]}</Link>
        })}
       
      </div>

  );
};
export default UserProfile;