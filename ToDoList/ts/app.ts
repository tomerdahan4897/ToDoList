import { tm } from "./taskManager.js";
import { Task } from "./task.js";
const addTaskInput = document.getElementById('addTaskInput') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
let allOfToDosBox = document.getElementById('allOfToDosBox') as HTMLDivElement;
const note = document.getElementById('note') as HTMLDivElement;

function renderTask(task: Task) {
    const completed = task.status === 1;
    return `<div class="toDoDiv" id="toDoDiv">
                <ul class="toDoUl">
                     <li class="whatToDoLi"><input class="${completed && "lineThrough"} desInput" id="descriptionInput-${task.id}" type="text" value="${task.description}"> </li>
                    <li class="status">${Task.isCompleted(task)}</li>
                    <li class="timeStampLi">${task.timeStamp}</li>
                </ul>
                <div class="signsBox">
                    <div class="sign remove" id="remove-${task.id}">&#10007;</div>
                    <div class="sign ${completed && "hide"} done" id="done-${task.id}">&#10003;</div>
                    <div class="sign ${completed && "hide"} edit" id="edit-${task.id}">&#9998;</div>
                    <div class="sign ${!completed && "hide"} return" id="return-${task.id}">&#10140;</div>
                </div>
            </div>`;
}


function showAllTasks() {
    allOfToDosBox.innerHTML = '';
    for (let task of tm.tasks) {
        const div = document.createElement("div");
        div.innerHTML = renderTask(task);
        allOfToDosBox.appendChild(div);

        const removeBtn = document.getElementById('remove-' + task.id) as HTMLDivElement;
        const editBtn = document.getElementById('edit-' + task.id) as HTMLDivElement;
        const doneBtn = document.getElementById('done-' + task.id) as HTMLDivElement;
        const returnBtn = document.getElementById('return-' + task.id) as HTMLDivElement;
        const descriptionInput = document.getElementById('descriptionInput-' + task.id) as HTMLInputElement;
        descriptionInput.disabled = true;

        removeBtn.addEventListener('click', () => {
            tm.removeTask(task.id);
            showAllTasks();
        });

        editBtn.addEventListener('click', () => {
            descriptionInput.disabled = false;
            descriptionInput.focus();
            descriptionInput.addEventListener('input', () => {
                task.description = descriptionInput.value;
            });
            descriptionInput.addEventListener('blur', () => {
                descriptionInput.disabled = true;
                tm.editTask(task);
            });
            descriptionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    descriptionInput.disabled = true;
                    tm.editTask(task);
                }
            });
        });


        doneBtn.addEventListener('click', () => {
            task.status = 1;
            showAllTasks();
        });

        returnBtn.addEventListener('click', () => {
            task.status = 0;
            showAllTasks();
        })
    }
}
showAllTasks();

addBtn.addEventListener('click', () => {
    const taskValue = addTaskInput.value;
    if (taskValue.length > 0) {
        note.classList.add('hide');
        const newTask = new Task(tm.getNextId(), taskValue);
        tm.addTask(newTask);
        showAllTasks();
    }
    else {
        note.classList.remove('hide');
    }
});



