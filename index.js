var firebaseConfig = {
  apiKey: "AIzaSyBlKIAjIoGXV8TCtlaQJ3SwstGnhnGF6FY",
  authDomain: "survey-squad-5f18b.firebaseapp.com",
  databaseURL: "https://survey-squad-5f18b-default-rtdb.firebaseio.com",
  projectId: "survey-squad-5f18b",
  storageBucket: "survey-squad-5f18b.appspot.com",
  messagingSenderId: "317612699265",
  appId: "1:317612699265:web:c72dd84c07fd00f1856780",
  measurementId: "G-N83H9DG6TH"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register () {
  // Get all our input fields
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const full_name = document.getElementById('full_name').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is not formatted correctly.')
    return
  }
  if (validate_field(full_name) == false) {
    alert('Fill out your full name please')
    return
  }

  auth.createUserWithEmailAndPassword(email, password).then(function(user) {
    var root = firebase.database().ref();

    var postData = {
       full_name: full_name,
       email: email,
       last_login : Date.now(),
       friendsList: 0,
       surveysCreated: 0
    };
    root.child("Users/creatersandtakers").child(auth.currentUser.uid).set(postData);
    alert("User Registered! Please sign in with these credentials")
 })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is not formatted correctly.')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('Users/creatersandtakers/' + user.uid).update(user_data)

    auth.signInWithEmailAndPassword(email, password).then(() => { location.href = 'home.html' })

    // Done
    alert('User Logged In! Loading home screen...')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

//logout
const logout = document.querySelector("#logout");
logout.addEventListener('click',(e)=>{
e.preventDefault();
auth.signOut().then(()=>{
  alert("user signed out");
  window.location='index.html';
})
})

// reset password
function resetPassword() { 
  const email = document.getElementById('email').value
  if(email != ""){
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
alert("Password reset email sent!")
  })
  .catch((error) => {
  alert(error);
  })
}
else{
  alert("Please enter your email first, then select \"Reset password\".")
}

}
