// script.js

const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.tasks');
const forms = document.querySelectorAll('.add-task-form');
const interactiveBoard = document.querySelector('.interactive-board');

let draggedTask = null;

const addDragEvents = (task) => {
    task.addEventListener('dragstart', () => {
        draggedTask = task;
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
        draggedTask = null;
    });
};

tasks.forEach(task => {
    addDragEvents(task);
});

columns.forEach(column => {
    column.addEventListener('dragover', (event) => {
        event.preventDefault();
        column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (event) => {
        event.preventDefault();
        if (draggedTask) {
            column.appendChild(draggedTask);
        }
        column.classList.remove('drag-over');
    });
});

forms.forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const input = form.querySelector('input');
        const text = input.value.trim();

        if (text) {
            const newTask = document.createElement('div');
            newTask.classList.add('task');
            newTask.setAttribute('draggable', 'true');
            newTask.innerHTML = `
                <span>${text}</span>
                <button class="delete-task-btn">&times;</button>
            `;

            addDragEvents(newTask);

            const columnTasks = form.previousElementSibling;
            columnTasks.appendChild(newTask);

            input.value = '';
        }
    });
});

interactiveBoard.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-task-btn')) {
        const taskElement = event.target.closest('.task');
        taskElement.remove();
    }
});