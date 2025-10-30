// example5_script.js
// 攔截 submit，聚焦第一個錯誤並模擬送出流程
 
//-->使用"is-invalid"也就是CSS Class：透過新增/移除 .is-invalid 是種 class，讓你自己用 CSS 自由設計錯誤樣式（例如紅色框線）
/*它不是 JavaScript 的語法，也不是一個指令。它只是一個「標籤」或「貼紙」。
  control.classList.add('is-invalid'); --> 「JavaScript 跑去跟 HTML 說：『嘿！幫這個 <input> 欄位貼上一個叫 is-invalid 的紅色錯誤貼紙！」
*/
const form = document.getElementById('full-form');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

//驗證所有欄位
function validateAllInputs(formElement) {
  let firstInvalid = null; //儲存第一個出錯的欄位
  const controls = Array.from(formElement.querySelectorAll('input, select, textarea'));//Array.from() 變成一個真正的陣列，跑 forEach
  controls.forEach((control) => {
    control.classList.remove('is-invalid'); //先移除舊的錯誤 class，才能確保「已修正」的欄位  
    if (!control.checkValidity()) {//HTML5 內建:自動檢查這個欄位是否符合 所有 HTML5 規則（required, type="email", pattern, minlength 等）
      control.classList.add('is-invalid');//不合法，就幫它貼上 .is-invalid 的 CSS class -> CSS 檔案 (例如 input.is-invalid { border-color: red; }) 就會生效   
      if (!firstInvalid) {//空的話呢，就塞進去
        firstInvalid = control;
      }
    }
  });
  return firstInvalid;   
}

//為甚麼要記錄第一個出錯的欄位?
//為了使用者體驗 (UX):驗證失敗流程中，呼叫 firstInvalid.focus(); -> 自動將使用者的游標「聚焦」到第一個錯誤的欄位

form.addEventListener('submit', async (event) => { //async (event): async 是為了搭配後面 await 模擬延遲送出。  
  event.preventDefault();
  //進入「載入中」狀態！ 
  submitBtn.disabled = true;  //按鈕無法點擊
  submitBtn.textContent = '送出中...';
  const firstInvalid = validateAllInputs(form);
  if (firstInvalid) { //如果有東西，就代表驗證失敗  ->  驗證失敗的處理流程
    submitBtn.disabled = false;//按鈕可點擊
    submitBtn.textContent = '送出';
    firstInvalid.focus(); //UX !!! 自動把使用者的游標「聚焦」到第一個錯誤的欄位
    return;
  }
   
  //驗證成功的處理流程(firstInvalid 是 null)
  await new Promise((resolve) => setTimeout(resolve, 1000)); //模擬資料正在傳送到後端伺服器的延遲。
  alert('資料已送出，感謝您的聯絡！');
  form.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});

//「重設」事件監聽器
resetBtn.addEventListener('click', () => {
  form.reset(); 
  //form.reset() 只會清空「值」(使用者輸入的欄位值)，但不會清掉我們手動加上去的 .is-invalid class。
  //所以我們要手動跑一個迴圈，把所有欄位的錯誤 class 都移除。
  Array.from(form.elements).forEach((element) => {  
    element.classList.remove('is-invalid');
  });
});

//「即時修正」監聽器
form.addEventListener('input', (event) => {
  const target = event.target; // 使用者「正在打字」的那個欄位
  if (target.classList.contains('is-invalid') && target.checkValidity()) { // -> 檢查這個欄位是不是正處於「錯誤狀態」+ 檢查這個欄位是不是「現在」合法了
    target.classList.remove('is-invalid');
    //它本來是錯的，但使用者一邊打字一邊修正，現在對了，就立刻移除 .is-invalid class。
  }
});

//點擊隱私條款，會跳出視窗「這是隱私條款」，然後要按確定按鈕才能成功。
const privacyCheckbox =document.getElementById('agree');
if(privacyCheckbox){
  privacyCheckbox.addEventListener('click',function(event){
    const checkbox = this; //"this" 指的就是 "privacyCheckbox" 本身
    if(checkbox.checked){ //--> 「如果這次點擊的 "結果" 是讓 checkbox "變成" 勾選狀態...」
      event.preventDefault();
      alert('這是隱私條款');
      setTimeout(function(){ 
      //setTimeout(..., 0): 等一下等你把 alert 關掉、把這整段程式碼跑完之後， '立刻'幫我執行程式碼。」
        checkbox.checked=true;
      },0);
    }
  });
}