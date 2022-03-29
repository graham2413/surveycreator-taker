//Function for type select
function typeSelectOn(that) {
    if(that.value=="none"){
        alert("Select an option!");
    }
    else if(that.value=="multChoice"){
        document.getElementById("multChoices").style.display = "block";
        document.getElementById("selAllChoices").style.display = "none";
    }
    else if(that.value=="selAll"){
        document.getElementById("selAllChoices").style.display = "block";
        document.getElementById("multChoices").style.display = "none";
    }
    else{
        document.getElementById("multChoices").style.display = "none";
        document.getElementById("selAllChoices").style.display = "none";
    }
}

//Function for multiple choice choices select
function ChoiceSelectOn(that2){
    if(that2.value=="none"){
        document.getElementById("multChoiceNums").style.display = "none";
    }
    else{
        document.getElementById("multChoiceNums").style.display = "block";
    }
}
//Function for Select All That Apply option select
function ChoiceSelectOn(that3) {
    if(that3.value=="none"){
        document.getElementById("selAllNums").style.display = "none";
    }
    else{
        document.getElementById("selAllNums").style.display = "block";
    }
}


//Functions for opening and closing form
function openForm() {
    document.getElementById("surveyForm").style.display = "block";
}

function closeForm() {
    document.getElementById("surveyForm").style.display = "none";
}