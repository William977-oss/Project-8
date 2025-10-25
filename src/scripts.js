/* TODO import á allt viðeigandi úr ./lib/todo.js */
import { toggleTodoItemStatus, toggleFinished, clearList, updateStats, createTodoItem } from "./lib/todo.js";

/**
 * @param {HTMLElement} todolist
 */
function initialize(todolist) {
  /* TODO finna form */
  const form = todolist.querySelector('.form');

  if (!form) {
    console.error("Form was not found, system quit");
    return;
  }  

  console.log(form)

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = todolist.querySelector('input');

    if (!input) {
      console.error("Input was not found");
      return;
    }

    const value = input.value;

    createTodoItem(todolist, value);
    updateStats(todolist);

  });

    const clear = todolist.querySelector('.clear-all');

    if (clear) {
      clear.type = "button";
      clear.addEventListener('click', () => {
        clearList(todolist);
      });
    }

    const hide = todolist.querySelector('.toggle-finished');

    if (hide) {
      hide.type = "button";
      hide.addEventListener('click', () => {
        toggleFinished(todolist);
      });
    }

  /* TODO setja submit event handler á form */
  /* TODO finna gildi textareits í formi innan event handlers og búa til todo item útfrá því */
  /* TODO tengja „Fela kláruð atriði“ og „Hreinsa lista“ takka */
}

// Finnum todo lista og keyrum fall sem setur allt upp
const todoList = document.querySelector(".todo-list");

// Viljum vera viss um að todoList hafi fundist og sé HTMLElement
if (todoList && todoList instanceof HTMLElement) {
  initialize(todoList);
} else {
  console.error("no todo list found");
}
