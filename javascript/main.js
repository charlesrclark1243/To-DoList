let addTaskButton = document.getElementById("add-task-button");
let todoList = document.getElementById("todo-list");

addTaskButton.addEventListener("click", () => {
    let inputText = document.getElementById("new-task-field").value;
    let newTask = document.createElement("li");
    
    if (inputText === "") {
        alert("Invalid Command: Cannot add a task without a description!");
    }
    else {
        newTask.innerText = inputText;
        
        let totalTaskCount = parseInt(document.getElementById("total-count").innerText);
        if (totalTaskCount == 0) {
            newTask.classList.add("top");
            newTask.classList.add("bottom");
        }
        else {
            todoList.lastElementChild.classList.remove("bottom");
            newTask.classList.add("bottom");
        }

        todoList.appendChild(newTask);        
        document.getElementById("new-task-field").value = "";

        if (totalTaskCount == 0) {
            todoList.classList.add("not-empty");
        }

        let span = document.createElement("span");
        span.classList.add("delete-button");
        span.innerText = "\u00d7";
        newTask.appendChild(span);
        
        totalTaskCount++;
        document.getElementById("total-count").innerText = totalTaskCount;

        let incompleteTaskCount = parseInt(document.getElementById("incomplete-count").innerText);
        incompleteTaskCount++;
        document.getElementById("incomplete-count").innerText = incompleteTaskCount;
    }
}, false);

todoList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        let task = event.target;

        if (task.classList.contains("complete")) {
            task.classList.remove("complete");

            changeCount("complete-count", -1);
            changeCount("incomplete-count", 1);
        }
        else {
            task.classList.add("complete");

            changeCount("complete-count", 1);
            changeCount("incomplete-count", -1);
        }
    }
    else if (event.target.tagName === "SPAN") {
        let span = event.target;
        let task = span.parentElement;

        task.style.display = "none";
        
        let totalTaskCount = parseInt(document.getElementById("total-count").innerText);
        totalTaskCount--;
        document.getElementById("total-count").innerText = totalTaskCount;

        if (task.classList.contains("complete")) {
            let completeTaskCount = parseInt(document.getElementById("complete-count").innerText);
            completeTaskCount--;
            document.getElementById("complete-count").innerText = completeTaskCount;
        }
        else {
            let incompleteTaskCount = parseInt(document.getElementById("incomplete-count").innerText);
            incompleteTaskCount--;
            document.getElementById("incomplete-count").innerText = incompleteTaskCount;
        }

        if (totalTaskCount == 0) {
            todoList.classList.remove("not-empty");
        }
    }
    else {
        alert("Check line 54 in main.js");
    }
}, false);

function changeCount(id, change) {
    let count = parseInt(document.getElementById(id).innerText);
    count = count + change;
    document.getElementById(id).innerText = count;
}