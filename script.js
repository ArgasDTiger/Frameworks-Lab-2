const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
  COMPLETED_TODO: 'completed-todo',
}

const list = $('#todo-list');
const itemCountSpan = $('#item-count');
const uncheckedCountSpan = $('#unchecked-count');
const input = $('#todo-input');
const modal = $('#myModal');
const modalInput = $('#modal-input');
const modalHiddenInput = $('#modal-hidden');
const modalSave = $('#modal-save');

modalSave.on('click', (e) => {
  modal.css('display', 'none');
  const todoId = modalHiddenInput.val();
  $(`#${todoId}`).text(modalInput.val());
  modalHiddenInput.val('');
});

function onAddTodo() {
  if (input.val() === '') {
    return;
  }
  const liCount = `li-${itemCountSpan.text()}`;
  const todoItem = `todo-item-${itemCountSpan.text()}`;
  const newLi =
      `<li id="${liCount}">
          <div class="btn-group">
            <button onclick="onDeleteTodo('${liCount}', '${todoItem}')">D</button>
            <button onclick="onEditTodo('${todoItem}')">E</button>
            <button onclick="onCompleteTodo('${todoItem}')">C</button>
          </div>
          <p id="${todoItem}" class="todo-item">${input.val()}</p>
      </li>`;
  list.append(newLi);
  input.val("");
  itemCountSpan.text(parseInt(itemCountSpan.text()) + 1);
  uncheckedCountSpan.text(parseInt(uncheckedCountSpan.text()) + 1);
}

function onDeleteTodo(id, paragraphId) {
  const item = $(`#${id}`);
  const paragraph = $(`#${paragraphId}`);
  if (!paragraph.hasClass(classNames.COMPLETED_TODO)) {
    uncheckedCountSpan.text(parseInt(uncheckedCountSpan.text()) - 1);
  }
  itemCountSpan.text(parseInt(itemCountSpan.text()) - 1);
  item.remove();
}

function onCompleteTodo(id) {
  const item = $(`#${id}`);
  if (item.hasClass(classNames.COMPLETED_TODO)) {
    item.removeClass(classNames.COMPLETED_TODO);
    uncheckedCountSpan.text(parseInt(uncheckedCountSpan.text()) + 1);
  } else {
    item.addClass(classNames.COMPLETED_TODO);
    uncheckedCountSpan.text(parseInt(uncheckedCountSpan.text()) - 1);
  }
}

function onEditTodo(id) {
  modal.css('display', 'block');
  const todoText = $(`#${id}`).text();
  modalInput.val(todoText);
  modalHiddenInput.val(id);
}
