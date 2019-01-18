const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

/* 'todoCounter' holds de Todo counter logic */
const todoCounter = (function() {
  let counter = 0

  return {
    increase:   function() { counter = counter + 1 },
    decrease:   function() { counter = counter - 1 },
    get:        function() { return counter },
  }
})()

/* 'uncheckedCounter' holds de unchecked task counter logic */
const uncheckedCounter = (function() {
  let counter = 0

  return {
    increase:   function() { counter = counter + 1 },
    decrease:   function() { counter = counter - 1 },
    get:        function() { return counter }
  }
})()

/* 'todoList' stores the list todos */
const todoList = (function() {
  let actualTodoList = []
  return {
    addTodo:    function(newTodo) { actualTodoList.push(newTodo) },
    removeTodo: function(index) { actualTodoList.splice(index, 1) },
    getTodos:   function() { return actualTodoList}
  }
})()

/* prompts for a new Todo */
function newTodo() {
  var newTodo = prompt("Enter a ToDo task:", "To-Do")
  if (newTodo != null && newTodo != "") {
    addNewTodo(newTodo)
  }
}

/* Add new todo */
function addNewTodo(newTodo) {
  todoList.addTodo(newTodo)
  todoCounter.increase()
  uncheckTask()
  itemCountSpan.innerText = todoCounter.get()
  showTodos()
}

/* Remove todo */
function removeTodo() {
  todoCounter.decrease()
  itemCountSpan.innerText = todoCounter.get()
}

/* Set task as done */
function checkTask() {
  console.log("cehck")
  uncheckedCounter.decrease()
  uncheckedCountSpan.innerText = uncheckedCounter.get()
}

/* Set task as todo */
function uncheckTask() {
  uncheckedCounter.increase()
  uncheckedCountSpan.innerText = uncheckedCounter.get()
}

/* Shows/Updates todo list */
function showTodos() {
  let todos = todoList.getTodos()

  for (let i = 0; i < todos.length; i++) {
    if (document.getElementById(i) == null) {
      let li = document.createElement('li');
      li.id = i

      let divLiContainer = setLiContainer(i);
      li.appendChild(divLiContainer)
      list.appendChild(li)
    }
  }

  /* Set li content container */
  function setLiContainer(i) {
    let divLiContainer = document.createElement('div');
    divLiContainer.className = 'todoLiContainer';
    let checkboxDiv = setCheckBoxDiv(i);
    let pDiv = setPDiv(i);
    let deleteButtonDiv = setDeleteButtonDiv(i);
    divLiContainer.appendChild(checkboxDiv);
    divLiContainer.appendChild(pDiv);
    divLiContainer.appendChild(deleteButtonDiv);
    return divLiContainer;
  }

  /* Set todo checkbox container */
  function setCheckBoxDiv(i) {
    let checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkboxDiv';
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'check_' + i;
    checkbox.onclick = function () { (checkbox.checked) ? checkTask() : uncheckTask(); };
    checkboxDiv.appendChild(checkbox);
    return checkboxDiv;
  }

  /* Set todo text container */
  function setPDiv(i) {
    let pDiv = document.createElement('div');
    pDiv.className = 'pDiv';
    let p = document.createElement('p');
    p.innerText = todos[i];
    pDiv.appendChild(p);
    return pDiv;
  }

  /* Set todo delete button container */
  function setDeleteButtonDiv(i) {
    let deleteButtonDiv = document.createElement('div');
    deleteButtonDiv.className = 'deleteButtonDiv';
    let deleteButton = document.createElement('input');
    deleteButton.type = 'Button';
    deleteButton.className = 'delete';
    deleteButton.value = 'Delete';
    deleteButton.onclick = function () {
      todoList.removeTodo(i);
      let todoRemoved = document.getElementById(i)
      let checkboxTodoRemoved = document.getElementById('check_' + i)
      if (!checkboxTodoRemoved.checked) { checkTask() }
      todoRemoved.parentNode.removeChild(todoRemoved)
      removeTodo()
    };
    deleteButtonDiv.appendChild(deleteButton);
    return deleteButtonDiv;
  }
}
