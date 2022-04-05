

//Function for type select
var incNum=0;

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
function createSingleQuestion() {
    
    incNum++;

    var quesNum = document.createElement('h2');   
    quesNum.textContent = "Question " + incNum;  
    document.body.appendChild(quesNum); 

    var h2 = document.createElement('h2');   
    h2.textContent = "What is question?";  
    document.body.appendChild(h2); 

}

function closeForm() {
    document.getElementById("surveyForm").style.display = "none";
}


//function for decreasing question number count WIP
function qDecrement(){

}

//function for adding questions to the question box list WIP
function addQuestion(){
    console.log("here");
    var node = document.createElement("Li");
    var text = document.getElementById("question").value;
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("questionList").appendChild(node);

    var totalNum = 0;


    closeForm();

}
/*

<h1>Question 1</h1>
        
        <!--USER TYPES IN QUESTION HERE-->
        <label for="question"><b>What is the Question?</b></label>
        <input type="text" placeholder="Enter Question" name="question" id="question" required>
    
        <!--TYPE OF QUESTION BEING MADE-->
        <label for="qType"><b>What Type of Question is This?</b></label>
        <select name="qType" id="qType" onchange="typeSelectOn(this)">
            <option value="none" selected disabled hidden>Select an Option</option>
            <option value="freeResponse">Free Response</option>
            <option value="multChoice">Multiple Choice</option>
            <option value="aggDisagg">Agree/Disagree</option>
            <option value="yesNo">Yes/No</option>
            <option value="oneToFive">1-5 (Number Scale)</option>
            <option value="selAll">Select All That Apply</option>
        </select>

        <!--WILL ONLY SHOW WHEN MULTIPLE CHOICE OPTION SELECTED-->
        <div id="multChoices" style="display: none">
            <label for="numOfChoices"><b>How many choices? (Must be at least 2)</b></label>
            <select name="numOfChoices" id="numOfChoices" onchange="ChoiceSelectOn(this2)">
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="twoQ">2</option>
                <option value="threeQ">3</option>
                <option value="fourQ">4</option>
            </select>
        </div>

        <!--SHOULD APPEAR AFTER NUMBER OF CHOICES SELECTED-->
        <div id="multChoiceNums" style="display: none">
            <label for="choiceNum"><b>Choice: </b></label>
            <input type="text" placeholder="Enter Choice" name="choiceNum" id="choiceNum">
        </div>

        <!--WILL ONLY SHOW WHEN SELECT ALL THAT APPLY OPTION SELECTED-->
        <div id="selAllChoices" style="display: none">
            <label for="selAllChoice"><b>How many options? (Must be at least 2)</b></label>
            <select name="selAllChoice" id="selAllChoice" onchange="OptionSelectOn(this3)">
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="twoQu">2</option>
                <option value="threeQu">3</option>
                <option value="fourQu">4</option>
                <option value="fiveQu">5</option>
            </select>
        </div>

        <!--SHOULD APPEAR AFTER NUMBER OF OPTIONS SELECTED-->
        <div id="selAllNums" style="display: none">
            <label for="optionNum"><b>Option: </b></label>
            <input type="text" placeholder="Enter Choice" name="optionNum" id="optionNum">
        </div>



        <!--Button to add question to total-->
        <button type="button" id ="add" class="btn" onclick="addQuestion()">Add Question</button>
        <button type="button" class="btn cancel" onclick="closeForm()">Cancel</button>*/