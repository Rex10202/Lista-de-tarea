// script.js

let tasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function filterTasks(status) {
    let filteredTasks = tasks;
    
    if (status === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (status === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    renderTasks(filteredTasks);
}

function renderTasks(filteredTasks = tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';
        taskItem.innerHTML = `
            ${task.text}
            <button onclick="deleteTask(${index})">Eliminar</button>
            <input type="checkbox" onclick="toggleTaskStatus(${index})" ${task.completed ? 'checked' : ''}>
        `;
        taskList.appendChild(taskItem);
    });
}

document.getElementById("new-task").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
