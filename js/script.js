// script.js

// Select DOM elements
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addButton = document.getElementById('addButton');
const filterButton = document.getElementById('filterButton');
const deleteAllButton = document.getElementById('deleteAllButton');
const taskTable = document.getElementById('taskTable');

// Initialize task array
let tasks = [];

// Add Task Function
function addTask() {
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;
    
    if (taskText && dueDate) {
        const newTask = {
            text: taskText,
            dueDate: dueDate,
            status: 'Pending'
        };
        
        tasks.push(newTask);
        renderTasks();
        clearInputFields();
    } else {
        alert('Please fill in all fields.');
    }
}

// Clear Input Fields
function clearInputFields() {
    taskInput.value = '';
    dueDateInput.value = '';
}

// Render Tasks Function
function renderTasks(filterText = '') {
    // Clear the table
    taskTable.innerHTML = '';

    // Filter and display tasks
    const filteredTasks = tasks.filter(task => task.text.includes(filterText));
    if (filteredTasks.length > 0) {
        filteredTasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.text}</td>
                <td>${task.dueDate}</td>
                <td>${task.status}</td>
                <td>
                    <button onclick="toggleStatus(${index})">Toggle Status</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </td>
            `;
            taskTable.appendChild(row);
        });
    } else {
        taskTable.innerHTML = '<tr><td colspan="4">No task found</td></tr>';
    }
}

// Toggle Status Function
function toggleStatus(index) {
    tasks[index].status = tasks[index].status === 'Pending' ? 'Completed' : 'Pending';
    renderTasks();
}

// Delete Task Function
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Filter Tasks Function
function filterTasks() {
    const filterText = taskInput.value;
    renderTasks(filterText);
}

// Delete All Tasks Function
function deleteAllTasks() {
    tasks = [];
    renderTasks();
}

// Event Listeners
addButton.addEventListener('click', addTask);
filterButton.addEventListener('click', filterTasks);
deleteAllButton.addEventListener('click', deleteAllTasks);

// Initial render
renderTasks();
