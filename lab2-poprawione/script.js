"use strict";
document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const searchTaskInput = document.getElementById('search-task-input');
    const caseInsensitive = document.getElementById('case-insensitive');
    const addListButton = document.getElementById('add-list-btn');
    const newListInput = document.getElementById('new-list-input');
    const modal = document.getElementById('confirm-modal');
    const confirmDelete = document.getElementById('confirm-delete');
    const cancelDelete = document.getElementById('cancel-delete');
    const restoreButton = document.getElementById('restore-button');
    let lastDeletedTask = null;
    let lastDeletedList = null; 
    
    document.querySelectorAll('.list-title').forEach(title => {
        title.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('hidden');
        });
    });

    function toggleTaskDone(event) {
        const task = event.currentTarget;
        const taskNameElement = task.querySelector('.task-name');
        task.classList.toggle('done');
        taskNameElement.classList.toggle('done');
        const now = new Date();
        const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
        let dateElement = task.querySelector('.completion-date');
        if (task.classList.contains('done')) {
            if (!dateElement) {
                dateElement = document.createElement('span');
                dateElement.classList.add('completion-date');
                task.appendChild(dateElement);
            }
            dateElement.textContent = ` Wykonano dnia: ${formattedDate}`;
        } else {
            if (dateElement) {
                dateElement.remove();
            }
        }
    }

    addButton.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;
        const listName = prompt("Do której listy dodać? (Mało Pilne, Pilne, Na Wczoraj)");
        const list = document.querySelector(`[data-list-name="${listName}"] .tasks`);
        if (list) {
            const task = document.createElement('li');
            task.className = 'task';
            const taskNameElement = document.createElement('span');
            taskNameElement.className = 'task-name';
            taskNameElement.textContent = taskText;
            task.appendChild(taskNameElement);
            task.addEventListener('click', toggleTaskDone);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = function(event) {
                event.stopPropagation();
                showModal(task, list);
            };
            task.appendChild(deleteButton);
            list.appendChild(task);
            newTaskInput.value = '';
        } else {
            alert("Nie ma takiej listy!");
        }
    });

    function showModal(task, list) {
        modal.style.display = 'block';
        document.getElementById('modal-text').textContent = 'Czy na pewno chcesz usunąć zadanie o treści: ' + task.querySelector('.task-name').textContent;
      
    function handleDelete() {
        lastDeletedTask = task;
        lastDeletedList = list;
        list.removeChild(task);
        modal.style.display = 'none';
        cleanup(); // Clean up event listeners
    }

    function handleCancel() {
        console.log("Delete canceled");
        modal.style.display = 'none';
        cleanup(); // Clean up event listeners
    }

    function cleanup() {
        confirmDelete.removeEventListener('click', handleDelete);
        cancelDelete.removeEventListener('click', handleCancel);
    }

    // Add event listeners
    confirmDelete.addEventListener('click', handleDelete);
    cancelDelete.addEventListener('click', handleCancel);
}

    restoreButton.addEventListener('click', function() {
        if (lastDeletedTask && lastDeletedList) {
            lastDeletedList.appendChild(lastDeletedTask);
            lastDeletedTask = null;
            lastDeletedList = null;
        } else {
            alert("Nie ma cofniętego zadania!");
        }
    });

    searchTaskInput.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase();
        const tasks = document.querySelectorAll('.task');
        tasks.forEach(task => {
            const text = caseInsensitive.checked ? task.textContent.toLowerCase() : task.textContent;
            if (text.includes(searchText)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });

    addListButton.addEventListener('click', function() {
        const listName = newListInput.value.trim();
        if (listName === '') return;
        const newList = document.createElement('div');
        newList.className = 'list';
        newList.setAttribute('data-list-name', listName);
        const title = document.createElement('h3');
        title.className = 'list-title';
        title.textContent = listName;
        title.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('hidden');
        });
        const taskList = document.createElement('ul');
        taskList.className = 'tasks';
        newList.appendChild(title);
        newList.appendChild(taskList);
        document.getElementById('lists').appendChild(newList);
        newListInput.value = '';
    });
});
