//Function for type select
let incNum = 1;

let choiceIncrement = 1;

function typeSelectOn(that) {

    if(that.value=="none"){
        alert("Select an option!");
    }
    else if(that.value=="multChoice"){
        document.getElementById("multChoices").style.display = "block";
        document.getElementById("selAll").style.display = "none";
        document.getElementById("oneToFive").style.display = "none";
        document.getElementById("yesNo").style.display = "none";
    }
    else if(that.value=="selAll"){
        document.getElementById("selAll").style.display = "block";
        document.getElementById("multChoices").style.display = "none";
        document.getElementById("oneToFive").style.display = "none";
        document.getElementById("yesNo").style.display = "none";
    }
    else if(that.value=="oneToFive"){
        document.getElementById("oneToFive").style.display = "block";
        document.getElementById("multChoices").style.display = "none";
        document.getElementById("selAll").style.display = "none";
        document.getElementById("yesNo").style.display = "none";
    }
    else{
        document.getElementById("yesNo").style.display = "block";
        document.getElementById("multChoices").style.display = "none";
        document.getElementById("selAll").style.display = "none";
        document.getElementById("oneToFive").style.display = "none";
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

    //Question text below
    var text = document.getElementById("question").value;
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    console.log(text);

  //type of question below
    var type = document.getElementById("qType").value;
    console.log(type);


    document.getElementById("questionList").appendChild(node);

    incNum++;

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


function addFields(){
    // Generate a dynamic number of inputs
    var number = document.getElementById("member").value;
    // Get the element where the inputs will be added to
    var container = document.getElementById("container");
    // Remove every children it had before
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<number;i++){
        // Append a node with a random text
        container.appendChild(document.createTextNode("Choice " + (i+1)));
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.setAttribute("placeholder", "Type Choice");
        input.type = "text";
        input.name = "member" + i;
        container.appendChild(input);
        // Append a line break 
        container.appendChild(document.createElement("br"));
    }
    
    
} 

function addSelFields(){
    // Generate a dynamic number of inputs
    var number = document.getElementById("selNum").value;
    // Get the element where the inputs will be added to
    var container = document.getElementById("Selcontainer");
    // Remove every children it had before
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<number;i++){
        // Append a node with a random text
        container.appendChild(document.createTextNode("Choice " + (i+1)));
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.setAttribute("placeholder", "Type Option");
        input.type = "text";
        input.name = "member" + i;
        container.appendChild(input);
        // Append a line break 
        container.appendChild(document.createElement("br"));
    }
} 

// function addCheckBox(){
    
//     // Generate a dynamic number of inputs
//     var number = document.getElementById("selNum").value;
//     console.log(number);
//     // Get the element where the inputs will be added to
//     var container = document.getElementById("Selcontainer");
//     // Remove every children it had before
//     while (container.hasChildNodes()) {
//         container.removeChild(container.lastChild);
//     }
//     for (i=0;i<number;i++){
        
//         // Append a node with a random text
//         container.appendChild(document.createTextNode("Choice " + (i+1)));
//         // Create an <input> element, set its type and name attributes
//         var input = document.createElement("INPUT");
//         input.setAttribute("type", "checkbox");
//         container.appendChild(input);
//         // Append a line break 
//         container.appendChild(document.createElement("br"));
//     }
// } 

//databse stuff with data
function subFunc(){

 var form  = document.getElementById('formform');

console.log(form.elements)


}