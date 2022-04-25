import React , {useState,useEffect }from 'react'
import Nav from './Nav'
import { Link } from "react-router-dom";
import "../CSS/index.css"
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "../config"

export default function AccountsPage() {
    

   //state variables, imports
    const [users, setUsers]=useState([]);
    const [searchTerm, setSearchTerm]=useState('');
    
    
    const dbRef = ref(getDatabase());

    // sets all users to be displayed on screen
  //   useEffect(() => {
  //   get(child(dbRef, `Users/`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  
  //       setUsers(snapshot.val())
  //        console.log(snapshot.val());
  //     }
  //    else {
  //       console.log("No user exist");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }, [])
  function handleUser(name, uid) {

    setUsers(prevState => ({
   
          ...prevState,
          [name]: uid
     }));
  }


  useEffect(() => {
    firebase.database().ref('Users').once('value', function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
  
    
  handleUser(ChildSnapshot.val().full_name,ChildSnapshot.val().UID);
          //  teachHand(ChildSnapshot.val().full_name,ChildSnapshot.val().uid);
        
                }
            );
        });
              }, [])
  console.log(users);
    
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
        console.log(value)
        return <Link to={`/userProfile/${value[1]}`} className="eachTeach" key={index}>{value[0]}</Link>
        })}
      </ul>




        </div>
    )
}
