/* TODO hugsanlega importa el, empty úr ./elements.js */

// Leyfilegt að breyta skilgreiningum á föllum og bæta við fleiri föllum.

/* TODO merkja viðeigandi föll með `export` */

/**
 * Breytir stöðu atriðis í lista. Ef kláruð atriði eru sýnd er það sýnt, annars er það falið um leið og það er klárað.
 * @param {HTMLElement} item
 * @param {boolean} isShown `true` ef kláruð atriði eru sýnileg, annars `false`.
 * @returns {void}
 */
export function toggleTodoItemStatus(item, isShown = true) {
  /* TODO útfæra */
  const checkbox = item.querySelector('input[type="checkbox"]');
  if (!checkbox) return;

  if (checkbox.checked) {
    item.classList.add('finished');

    item.style.display = isShown ? '' : 'none';
  } else {
    item.classList.remove('finished');

    item.style.display = '';
  }
}

/**
 * Fjarlægja atriði (sem DOM element) úr lista.
 * @param {HTMLElement} item
 * @returns {void}
 */
function removeTodoItem(item) {
  /* TODO útfæra */
  console.log("REMOVE", item);
  const span = item.querySelector('span.item');

  let text = "<unknown item>";
  if (!span) {
    console.warn("Could not find span");
  } else {
    text = span.textContent;
  }

  if (confirm(`Do you want to remove "${text}"?`)) {
    item.remove();
  }
}

/**
 * Breytir sýnileika kláraðra atriða í lista.
 * @param {HTMLElement} todolist
 * @return {boolean} `true` if finished items are shown, `false` if hidden
 */
export function toggleFinished(todolist) {
  /* TODO útfæra */
  const list = todolist.querySelector('ul.list');
  if (!list) return;

  const isCurrentlyShown = todolist.dataset.finished !== 'false';
  const newShowState = !isCurrentlyShown;

  todolist.dataset.finished = newShowState;

  const items = Array.from(list.querySelectorAll('li'));

  items.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    const isShown = checkbox.checked ? newShowState : true;
    toggleTodoItemStatus(item, isShown);
  });
}

/**
 * Hreinsar allan lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function clearList(todolist) {
  /* TODO útfæra */
  const list = todolist.querySelector('ul.list');

  if (!confirm("Are you sure you want to delete the entire list")) return;

  const items = Array.from(list.querySelectorAll('li'));

  items.forEach(item => {
    item.remove();
  });

  checkListState(todolist);
  updateStats(todolist);
}

/**
 * Uppfærir upplýsingar um fjölda kláraðra og ókláraðra atriða í lista.
 * @param {HTMLElement} todoList
 * @return {void}
 */
export function updateStats(todoList) {
  /* TODO útfæra */
  const finished = todoList.querySelector('.finished');
  const unfinished = todoList.querySelector('.unfinished');

  if (!finished || !unfinished) {
    console.warn("Could not find finished or unfinished nodes");
    return;
  }

  finished.textContent = '99'
  unfinished.textContent = '999'
}

/**
 * Býr til nýtt atriði í lista með texta `text`.
 * @param {HTMLElement} todolist
 * @param {string} text
 * @return {void}
 */
export function createTodoItem(todolist, text) {
  /* TODO útfæra */
  const li = document.createElement('li');

  const deleteButton = document.createElement('button');
  deleteButton.title = "Fjarlægja atriði";
  deleteButton.textContent = '🗑️';
  deleteButton.addEventListener('click', () => {
    removeTodoItem(li);
    checkListState(todolist);
  });

  const input = document.createElement('input');
  input.type = "checkbox";
  input.name = "finished";
  input.addEventListener('change', () => {
    const isShown = todolist.dataset.finished !== 'hidden';
    toggleTodoItemStatus(li, isShown);
    console.log('input', input.checked);
  });

  const span = document.createElement('span');
  span.classList.add('item');
  span.textContent = text;

  const label = document.createElement('label');

  label.appendChild(input);
  label.appendChild(span);
  li.appendChild(label);
  li.appendChild(deleteButton);

  // Creates item and appends it into the list
  const list = todolist.querySelector('ul.list');
  list.classList.remove('hidden');
  list.appendChild(li);

  updateStats(todolist);
  checkListState(todolist);
}

/**
 * Athugar hvort listinn sé tómur og sýnir eða felur skilaboð um tóman lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function checkListState(todolist) {
  /* TODO útfæra */
  const list = todolist.querySelector('ul.list');
  const empty = todolist.querySelector('.empty')

  if (!list || !empty) return;
  
  // Only displays message if list has no items
  empty.classList.toggle('hidden', list.children.length > 0);
  
}
