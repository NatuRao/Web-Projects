const inputBox = document.getElementById("input-box");
const ul = document.getElementsByClassName('pending-list')

const month = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

let INPUT_VALUE = ""

let count = 1;

// Date will be replaced with No tasks if nothing is there
check_tasks();
function check_tasks() {
    const ul_size = document.querySelector(".pending-list").innerHTML.trim().length;

    if(ul_size <= 0) {
        document.getElementById('task-date').innerHTML = "No tasks to show";
    }
}


// Function for adding tasks
function addTheTasks() {

    // Creating li
    let li = document.createElement("li");

    // Create Input
    let input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("id", `tsk${count}`)
    input.setAttribute("onclick","completed_task(this)")

    // Creating Label
    let label = document.createElement("label");
    label.innerHTML = inputBox.value;
    label.setAttribute("for", `tsk${count}`)
    label.setAttribute("onclick", "completed_task(this)")

    // Creating task-options
    let div_taskOptions = document.createElement("div");
    div_taskOptions.setAttribute("class", "task-options")

    div_taskOptions.innerHTML += '<i class="fa-regular fa-pen-to-square" onclick="editTask(this)"></i>'
    div_taskOptions.innerHTML += '<i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>'

    // Creating task-options
    let div_editable = document.createElement("div");
    div_editable.setAttribute("class", "editable")

    div_editable.innerHTML += '<i class="fa-solid fa-xmark" onclick="crossTask(this)"></i>';
    div_editable.innerHTML += '<i class="fa-solid fa-check" onclick="checkTask(this)"></i>';


    // Adding Elements
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(div_taskOptions);
    li.appendChild(div_editable);
    ul[0].appendChild(li);

    // Increasing count because the next added task id
    count ++;
}


// Function for adding task
function addTask() {

    if (inputBox.value === "") {
        alert("You must write something, in order to add task!");
    }

    else {
        
        // Adding tasks
        addTheTasks();

        // Set Date
        let current_date = new Date().getDate();
        current_date = suffix(current_date);
        let current_month = new Date().getMonth();
        let current_year = new Date().getFullYear();

        let fullDate = `${month[current_month]} ${current_date} ${current_year}`;
        console.log(fullDate);
        document.getElementById("task-date").innerHTML = fullDate;
    }

    inputBox.value = "";
}

function deleteTask(identifier) {
    console.log(identifier);
    let li = identifier.parentElement.parentElement;
    console.log(li);
    li.remove();
    check_tasks();
} 


// Function to edit
function editTask(identifier) {
    identifier.parentElement.style.display = "none";
    identifier.parentElement.nextElementSibling.style.cssText = "display: flex; align-items: center";

    // Converting label element to input text element
    const labelElement = identifier.parentElement.previousElementSibling;
    const labelID = labelElement.getAttribute("for");

    const inputElement = document.createElement('input');
    inputElement.type = "text";
    inputElement.id = labelID + "-input";
    INPUT_VALUE = labelElement.innerText;
    inputElement.value = labelElement.innerText;
    labelElement.replaceWith(inputElement);
}

// Function to return to edit button after clicking check button
function crossTask(identifier) {
    identifier.parentElement.style.display = "none";
    identifier.parentElement.previousElementSibling.style.cssText = "display: flex; align-items: center";

    let input_id = identifier.parentElement.previousElementSibling.previousElementSibling.id;   //tsk1
    let inputElement = document.getElementById(`${input_id}`);
    let input_value = INPUT_VALUE
    let labelElement = document.createElement('label');
    labelElement.setAttribute("for", `${input_id.slice(0, -6)}`);
    labelElement.innerHTML = input_value;
    
    inputElement.replaceWith(labelElement);
}

// Function to return to edit option if there is nothing to edit in task
function checkTask(identifier) {
    identifier.parentElement.style.display = "none";
    identifier.parentElement.previousElementSibling.style.cssText = "display: flex; align-items: center";

    let input_id = identifier.parentElement.previousElementSibling.previousElementSibling.id;   //tsk1
    let inputElement = document.getElementById(`${input_id}`);
    let input_value = document.getElementById(`${input_id}`).value;
    let labelElement = document.createElement('label');
    labelElement.setAttribute("for", `${input_id.slice(0, -6)}`); 
    labelElement.innerHTML = input_value;
    
    inputElement.replaceWith(labelElement);
}


// Function to find Suffix of date
function suffix(digit) {
    if (digit % 100 >= 11 && digit % 100 <= 13) {
        return digit + "th";
    }   
    
    else if (digit % 10 === 1) {
        return digit = "st";
    }  
    
    else if (digit % 10 === 2) {
        return digit = "nd";
    }

    else if (digit % 10 === 3) {
        return digit = "rd";
    }   
    
    else {
        return digit + "th";
    }
}
