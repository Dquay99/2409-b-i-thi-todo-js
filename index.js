const btnAdds = document.querySelector('.btnAdd');
btnAdds.addEventListener('click', e => {
    const todoList = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const inputAdds = document.querySelector('.inputAdd');
    const inputValue = inputAdds.value;

    const todoInfo = {
        id: new Date().getTime(),
        name: inputValue,
        isComplete: false
    }

    if (inputAdds.value === '') {
        alert("Vui long dien day du thong tin");
        return;
    }

    inputAdds.value = '';

    todoList.push(todoInfo);
    localStorage.setItem("todos", JSON.stringify(todoList));
    displayAllTodo();
});

const allBtn = document.querySelector('.all');
allBtn.addEventListener('click', displayAllTodo);
function displayAllTodo() {
    const allBtnActive = document.querySelectorAll('.activebtn');
    for (let btnActive of allBtnActive) {
        btnActive.classList.remove('activebtn');
    }
    allBtn.classList.add("activebtn");

    const inputAdd = document.querySelector('.add-grp');
    if (inputAdd.classList.contains('hidden')) {
        inputAdd.classList.remove("hidden");
    }

    const todoList = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = '';
    for (let todo of todoList) {
        contentDiv.innerHTML += `
            <div class="todo-grp">
                <input type="checkbox" onclick="updateTodo(${todo.id})" ${todo.isComplete ? 'disabled checked' : ''}/>
                <h5 class=${todo.isComplete ? 'line-through' : ''}>${todo.name}</h5>
            </div>
        `
    }
}


function updateTodo(idTodo) {
    const todoList = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

    for (let todo of todoList) {
        if (todo.id == idTodo) {
            todo.isComplete = true;
        }
    }

    localStorage.setItem("todos", JSON.stringify(todoList));
    displayAllTodo();
}

displayAllTodo();

const activeBtn = document.querySelector('.active');
activeBtn.addEventListener('click', displayTodoActive);
function displayTodoActive() {
    const allBtnActive = document.querySelectorAll('.activebtn');
    for (let btnActive of allBtnActive) {
        btnActive.classList.remove('activebtn');
    }
    activeBtn.classList.add("activebtn");

    const inputAdd = document.querySelector('.add-grp');
    if (inputAdd.classList.contains('hidden')) {
        inputAdd.classList.remove("hidden");
    }

    const todoList = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = '';
    for (let todo of todoList) {
        if (!todo.isComplete) {
            contentDiv.innerHTML += `
            <div class="todo-grp">
                <input  type="checkbox" =${todo.isComplete} onclick="updateTodo(${todo.id})" ${todo.isComplete ? 'disabled checked' : ''}/>
                <h5>${todo.name}</h5>
            </div>
            `
        }
    }
}

const completeBtn = document.querySelector('.complete');
completeBtn.addEventListener('click', displayTodoComplete);

function displayTodoComplete() {
    const allBtnActive = document.querySelectorAll('.activebtn');
    for (let btnActive of allBtnActive) {
        btnActive.classList.remove('activebtn');
    }
    completeBtn.classList.add("activebtn");

    const inputAdd = document.querySelector('.add-grp');
    inputAdd.classList.add("hidden");

    const todoList = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = '';
    for (let todo of todoList) {
        if (todo.isComplete) {
            contentDiv.innerHTML += `
            <div class="todo-grp">
                <h5 class=${todo.isComplete ? 'line-through' : ''}>${todo.name}</h5>
                <button onclick="deleteTodos(${todo.id})">Delete</button>
            </div>
            `
        }
    }

    if (todoList.some(ele => ele.isComplete)) {
        contentDiv.innerHTML += '<button onclick="deleteAllComplete()">Delete All</button>';
    }
}

function deleteAllComplete() {
    const todoList = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const newTodoList = todoList.filter((ele) => !ele.isComplete);

    localStorage.setItem("todos", JSON.stringify(newTodoList));
    displayTodoComplete();
}

function deleteTodos(id) {
    const listTodo = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    if (listTodo.length === 0) {
        return;
    }

    const newTodoList = listTodo.filter((ele) => ele.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
    displayTodoComplete();
}













