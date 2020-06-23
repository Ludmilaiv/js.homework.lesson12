"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed ");

let todoData = [];

const render = function() {
  todoList.textContent = "";
  todoCompleted.textContent = "";
  todoData.forEach(function(item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = "<span class=\"text-todo\">" + item.value + "</span>" +
        "<div class=\"todo-buttons\">" + 
        "<button class=\"todo-remove\"></button>" +
        "<button class=\"todo-complete\"></button></div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    const todoCompletedBtn = li.querySelector(".todo-complete");
    todoCompletedBtn.addEventListener("click", function() {
      item.completed = !item.completed;
      localStorage.setItem("toDo",JSON.stringify(todoData));
      render();
    });
    const todoRemoveBtn = li.querySelector(".todo-remove");
    todoRemoveBtn.addEventListener("click", function() {
      let index = todoData.indexOf(item);
      todoData.splice(index, 1);
      li.remove();
      localStorage.setItem("toDo",JSON.stringify(todoData));
      render();
    })
  });
};

todoControl.addEventListener("submit", function(event) {
  event.preventDefault();
  if (headerInput.value !== "") {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };
    todoData.push(newTodo);
    localStorage.setItem("toDo",JSON.stringify(todoData));
    headerInput.value ="";
    render();
  } 
});

let toDoString = localStorage.getItem("toDo");
if (toDoString) {
  todoData = JSON.parse(toDoString);
}

render();