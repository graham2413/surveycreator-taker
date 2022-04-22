import React , {useState,useEffect }from 'react'
import Nav from './Nav'
import { Link } from "react-router-dom";
import "../CSS/index.css"
import { getDatabase, ref, child, get } from "firebase/database";




export default function AccountsPage() {
    

   //state variables, imports
    const [users, setUsers]=useState([]);
    const [searchTerm, setSearchTerm]=useState('');
    
    
    const dbRef = ref(getDatabase());

    // sets all users to be displayed on screen
    useEffect(() => {
    get(child(dbRef, `Users/`)).then((snapshot) => {
      if (snapshot.exists()) {
  
        setUsers(snapshot.val())
         console.log(snapshot.val());
      }
     else {
        console.log("No user exist");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])
  
    
    return (
      <div className="homer">
           <div>
               <Nav/>
           </div>

<div  className="allUsers">   <h1>All Users</h1></div>
        
        <div className="centeraligner">
        <input onChange={event => setSearchTerm(event.target.value)} className="searchbar" type="text" placeholder="Search users by UID..."/>
        </div>
          <ul>

       {Object.entries(users).filter((val)=>{
         if(searchTerm === ""){
        return val;
        
         }
         else if(val[0].toLowerCase().includes(searchTerm.toLowerCase())){
           return val;
         }
       }).map((value, index) => {

        return <Link to={`/userProfile/${value[0]}`} className="eachTeach" key={index}>{value[0]}</Link>
        })}
      </ul>




        </div>
    )
}
