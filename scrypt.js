const tasksList = document.querySelector('#tasks-list')
const addTask = document.querySelector('#add-task')
const input = document.querySelector('#input')

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (elem) {
        const task = document.createElement('div');
        task.textContent = elem;
        task.className = 'task';
        tasksList.appendChild(task);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        tasksList.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', deleteBtnFunk);
        function deleteBtnFunk() {
            tasksList.removeChild(deleteBtn);
            tasksList.removeChild(editBtn);
            tasksList.removeChild(task);
            removeTask(elem);
        }
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Редактировать';
        tasksList.appendChild(editBtn);

        editBtn.addEventListener('click', editBtnFunk);
        function editBtnFunk() {
            tasksList.removeChild(deleteBtn);
            tasksList.removeChild(editBtn);
            tasksList.removeChild(task);
            editTask(elem);
        }
    })
}

addTask.addEventListener('click', addTaskFunk)

function addTaskFunk() {
    const task = document.createElement('div');
    task.textContent = input.value;
    task.className = 'task';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    tasksList.appendChild(task);
    tasksList.appendChild(deleteBtn);


    deleteBtn.addEventListener('click', deleteBtnFunk);

    function deleteBtnFunk() {
        tasksList.removeChild(deleteBtn);
        tasksList.removeChild(editBtn);
        tasksList.removeChild(task);
        removeTask(task.textContent);
    }

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Редактировать';
    tasksList.appendChild(editBtn);

    editBtn.addEventListener('click', editBtnFunk)

    function editBtnFunk() {
        tasksList.removeChild(deleteBtn);
        tasksList.removeChild(editBtn);
        tasksList.removeChild(task);
        editTask(task.textContent);
    }

    saveTask(input.value);
    input.value = ""
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.indexOf(task);

    if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function editTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.indexOf(task);
    input.value = task
    if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

}
