//Function for type select
let incNum = 1;
var tryer = 0;

let choiceIncrement = 1;

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
// function ChoiceSelectOn(that){
//     var type = document.getElementById("qType").value;

//     if((type == "multChoice") && (that.value != "none")){
//         document.getElementById("multChoiceNums").style.display = "block";
//     }
//     else{
//         document.getElementById("multChoiceNums").style.display = "none";
//     }

// }

//Function for Select All That Apply option select
// function OptionSelectOn(that) {
//     var type = document.getElementById("qType").value;

//     if((type == "selAll") && (that.value != "none")){
//         document.getElementById("selAllNums").style.display = "block";
//     }
//     else{
//         document.getElementById("selAllNums").style.display = "none";
//     }
// }


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

function choiceBlank(){
    var choiceLabel = document.createElement("label");
    choiceLabel.setAttribute = ("id", "choiceLabel");
    choiceLabel.setAttribute = ("for", "choiceLabel");
    document.getElementById("choiceLabel").value = "Choice " + choiceIncrement;

    var actualChoice = document.createElement("input");
    actualChoice.setAttribute("id", "choiceNum");
    actualChoice.setAttribute("type", "text");
    actualChoice.setAttribute("placeholder", "Type Choice");
    actualChoice.setAttribute("name", "")
}

function callChoice(){
    
        
    if(tryer != 0){
        deleteOther();
    }

    
    var e = document.getElementsByName("numOfChoices")[0];
    var numNeeded= e.value;


    for (let index = 0; index <numNeeded; index++) {
       
        // var choiceLabel = document.createElement("label");
        // choiceLabel.setAttribute = ("id", "choiceLabel");
        // choiceLabel.setAttribute = ("for", "choiceLabel");
        // document.getElementById("choiceLabel").value = "Choice " + choiceIncrement;
    
        var divToAddMult = document.getElementById("multChoices");
        

        var actualChoice = document.createElement("input");
        actualChoice.setAttribute("id", "choiceNum");
        actualChoice.setAttribute("type", "text");
        actualChoice.setAttribute("placeholder", "Type Choice");
        
        divToAddMult.appendChild(actualChoice);


    
        
    }

    tryer = numNeeded;
    // for (let index = 0; index < numNeeded; index++) {
    //     tryer++;
        
    // }
}


function deleteOther(){

    var exists = !!document.getElementById("choiceNum");
    var other = document.getElementById("choiceNum");

    if(exists){
        // for (let index = 0; index < tryer; index) {
        //     other.remove();
        //     tryer--;
            
        // }
        while(tryer > 0){
            console.log(tryer);
            other.remove();
            tryer--;
            console.log("Gaming");
        }

    }


}