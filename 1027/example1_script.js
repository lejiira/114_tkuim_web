// example1_script.js
// 統一在父層監聽點擊與送出事件，處理清單項目新增/刪除

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (event) => { //submit完之後
  event.preventDefault(); //送出完之後，及時重整表單內容
  const value = input.value.trim();
  if (!value) {
    return;
  }
  const item = document.createElement('li');
  item.className = 'list-group-item d-flex justify-content-between align-items-center';
  item.innerHTML = `${value} <button class="btn btn-sm btn-outline-danger" data-action="remove">刪除</button>`;
  list.appendChild(item);
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action="remove"]'); //實際判斷哪一個按鈕，並做刪除
  if (!target) {
    return;
  }
  const item = target.closest('li');
  if (item) {
    item.remove();
  }
});
