//Function for type select
let incNum = 1;


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
function ChoiceSelectOn(that){
    var type = document.getElementById("qType").value;

    if((type == "multChoice") && (that.value != "none")){
        document.getElementById("multChoiceNums").style.display = "block";
    }
    else{
        document.getElementById("multChoiceNums").style.display = "none";
    }

}

//Function for Select All That Apply option select
function OptionSelectOn(that) {
    var type = document.getElementById("qType").value;

    if((type == "selAll") && (that.value != "none")){
        document.getElementById("selAllNums").style.display = "block";
    }
    else{
        document.getElementById("selAllNums").style.display = "none";
    }
}


//Functions for opening and closing form
function createSingleQuestion() {
 
    document.getElementById("questionNum").textContent = "Question " + incNum;  
    document.getElementById("surveyForm").style.display = "block";


}

function closeForm() {
    document.getElementById("surveyForm").style.display = "none";
}

//function for adding questions to the question box list WIP
function addQuestion(){
    document.getElementById("label1").textContent = "Question";

    var node = document.createElement("li");
    var text = document.getElementById("question").value;
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("questionList").appendChild(node);

    incNum++;

    var type = document.getElementById("qType").value;
    
    console.log(text);
    console.log(type);
    //Pass this data as well as the data of who is making (userID)
    createSingleQuestion();

}
