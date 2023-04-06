// Define variables to store users and tasks
let users = [];
let tasks = [];

// Function to add a user
function addUser() {
	event.preventDefault();
	let name = document.getElementById("userName").value.trim();
	if (name !== "") {
		users.push(name);
		document.getElementById("userForm").reset();
		alert("User added successfully!");
	} else {
		alert("Please enter a valid name.");
	}
}

// Function to create a task
function createTask() {
	event.preventDefault();
	let taskName = document.getElementById("taskName").value.trim();
	let dueDate = document.getElementById("dueDate").value;
	let status = document.getElementById("status").value;
	if (taskName !== "" && dueDate !== "") {
		let task = {name: taskName, due: dueDate, status: status};
		tasks.push(task);
		document.getElementById("taskForm").reset();
		displayTasks();
		alert("Task created successfully!");
	} else {
		alert("Please fill in all the required fields.");
	}
}

// Function to display all tasks
function displayTasks() {
	let tableBody = document.getElementById("taskTable");
	tableBody.innerHTML = "";
	for (let i = 0; i < tasks.length; i++) {
		let task = tasks[i];
		let row = document.createElement("tr");
		row.innerHTML =
        `<td>${task.name}</td>
		 <td>${task.due}</td>
		 <td>${task.status}</td>
		 <td>
		 	<button onclick="editTask(${i})">Edit</button>
		 	<button onclick="deleteTask(${i})">Delete</button>
		 	<button onclick="changeStatus(${i})">Mark ${task.status === "pending" ? "Completed" : "Pending"}</button>
		 </td>`;
	tableBody.appendChild(row);
}
}

// Function to filter tasks based on name, status, and due date
function filterTasks() {
let nameFilter = document.getElementById("filterName").value.toLowerCase();
let statusFilter = document.getElementById("filterStatus").value.toLowerCase();
let dateFilter = document.getElementById("filterDate").value;
let filteredTasks = tasks.filter(task => {
let nameMatch = task.name.toLowerCase().includes(nameFilter);
let statusMatch = task.status.toLowerCase().includes(statusFilter);
let dateMatch = dateFilter === "" || task.due === dateFilter;
return nameMatch && statusMatch && dateMatch;
});
displayTasks(filteredTasks);
}

// Function to delete a task
function deleteTask(index) {
let confirmDelete = confirm("Are you sure you want to delete this task?");
if (confirmDelete) {
tasks.splice(index, 1);
displayTasks();
alert("Task deleted successfully!");
}
}

// Function to edit a task
function editTask(index) {
let task = tasks[index];
document.getElementById("taskName").value = task.name;
document.getElementById("dueDate").value = task.due;
document.getElementById("status").value = task.status;
document.getElementById("taskForm").onsubmit = function() {
event.preventDefault();
let taskName = document.getElementById("taskName").value.trim();
let dueDate = document.getElementById("dueDate").value;
let status = document.getElementById("status").value;
if (taskName !== "" && dueDate !== "") {
task.name = taskName;
task.due = dueDate;
task.status = status;
document.getElementById("taskForm").reset();
displayTasks();
alert("Task updated successfully!");
} else {
alert("Please fill in all the required fields.");
}
}
}

// Function to change the status of a task
function changeStatus(index) {
let task = tasks[index];
if (task.status === "pending") {
task.status = "completed";
} else {
task.status = "pending";
}
displayTasks();
alert("Task status updated successfully!");
}

// Call displayTasks function to initially display all tasks
displayTasks();
