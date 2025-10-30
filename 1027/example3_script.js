// example3_script.js
// 透過 input/blur 事件實作即時錯誤，僅在使用者操作後顯示訊息


//抓取DOM元素
const form = document.getElementById('signup-form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm');
const passwordError = document.getElementById('password-error');//手動把錯誤訊息塞入
const confirmError = document.getElementById('confirm-error');

//new Set() 建立了一個「集合」，且此集合只會儲存「不重複」的值
//用途:「登記」使用者已經「碰過」（即 blur 過）的欄位 ID。
const touched = new Set();

function validatePassword() { //驗證的方式
  const value = password.value.trim();
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[^A-Za-z0-9]/.test(value);// 「非 (^) 字母且非數字」的任何字元
  let message = '';

  if (!value) {
    message = '請輸入密碼。';
  } else if (value.length < 8) {
    message = '密碼至少需 8 碼。';
  } else if (!hasLetter || !hasNumber ||!hasSymbol) {
    message = '請同時包含英文字母、數字與符號。';
  }

  password.setCustomValidity(message); 
  //setCustomValidity:當輸入錯誤，會跑的內容，且透過reportValidity() 這個函式叫出來
  //但本題希望:訊息顯示在我們指定的 <span> 裡 (就是 passwordError 和 confirmError) -> line 34
  passwordError.textContent = message; //手動顯示錯誤
  return !message; //
}
/*
為何還需要用setCustomValidity:
它是用來跟「瀏覽器」溝通的，不是給「使用者」看的，當message有訊息時(並非空字串)，瀏覽器內部就知道他是壞的 -> 阻止表單提交
*/

/*
return !message :把字串變成布林值 (true/false)

在JS當中，空字串 '' 被當作 false，有內容的字串，被當作 true
return !message; = 程式碼:
if (message === '') { //對了回傳true
  return true; 
} else { //錯了回傳false
  return false; 
}
*/

function validateConfirm() { 
  const passwordValue = password.value.trim();
  const confirmValue = confirmPassword.value.trim();
  let message = '';

  if (!confirmValue) {
    message = '請再次輸入密碼。';
  } else if (passwordValue !== confirmValue) {
    message = '兩次輸入的密碼不一致。';
  }

  confirmPassword.setCustomValidity(message);
  confirmError.textContent = message;
  return !message;
}

function handleBlur(event) {//游標離開時
  touched.add(event.target.id);//把觸發事件的元素 ID (例如 'password') 登記到 touched 集合中
  runValidation(event.target.id);//立刻執行一次驗證。
}

function handleInput(event) {//每打一個字時
  if (!touched.has(event.target.id)) {//UX 關鍵，檢查 touched 集合中，「是否沒有」這個欄位的 ID，沒有就代表使用者還沒Blur過，直接退出
    return;
  }
  runValidation(event.target.id);//那如果有過了，就可以即時驗證了
}
/*
當打完【密碼】和【確認密碼】，Touched裡面就有紀錄，因此當你在接下來所做的任何動作(例如、刪掉一個字)，都會做即時驗證
*/

//路由函式:基於你改了這個欄位，我總共需要執行哪幾套驗證 -->  互相關聯欄位（密碼/確認）需要同時重新驗證，確保同步性。
function runValidation(fieldId) {//fieldId:'password' 或 'confirm'
  if (fieldId === 'password') {//改 password -> 需要 validatePassword + validateConfirm
    validatePassword();
    if (touched.has('confirm')) {
      validateConfirm();
    }
  }
  if (fieldId === 'confirm') {//改 confirm -> 只需 validateConfirm。
    validateConfirm();
  }
}


[password, confirmPassword].forEach((input) => {//用陣列把兩個 input 元素包起來，跑 forEach 迴圈，一次性地幫兩個元素都綁定 blur 和 input 事件監聽器。
  input.addEventListener('blur', handleBlur);
  input.addEventListener('input', handleInput);
});

//表單提交：submit 事件
form.addEventListener('submit', (event) => {
  event.preventDefault();
  //「強制」把兩個欄位都標記為 touched
  touched.add('password');
  touched.add('confirm');
  const passwordOk = validatePassword();
  const confirmOk = validateConfirm();
  if (passwordOk && confirmOk) {
    alert('註冊成功');
    form.reset();
    passwordError.textContent = '';
    confirmError.textContent = '';
    touched.clear();
  }
});

//增加密碼必須有任意符號該怎麼列為強制
