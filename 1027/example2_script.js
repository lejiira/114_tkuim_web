// example2_script.js
// 驗證 Email 與手機欄位，拋出自訂訊息後再提示使用者

//document.getElementById():在html藍圖中(DOM)找到特定ID
//const:
const form = document.getElementById('contact-form');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

//自訂
// function validateEmailDomain(emailInput){
//     const allowedDomain =  "@o365.tku.edu.tw";
//     const regex = new RegExp('^\\{9}${allowedDomain}$');
//     if(!regex.test(emailInput.value)){
//         return false;
//     }return true;
// }

//擴充瀏覽器內建的驗證功能:
function validateEmailDomain(emailInput){
  if(emailInput.value.lemght>0){
    if(!emailInput.value.endsWith('@o365.tku.edu.tw')){ //透過endsWith()檢查字尾
      return false;
    }
  }
  return true;
}//當增加了規則後，也要修改showValidity:檢查完瀏覽器內建規則 (required, typeMismatch...) 之後，追加我們自訂的 validateEmailDomain 檢查。


//宣告一個function:showValidity
function showValidity(input) {
  //HTML5 Constraint Validation API
  //input.validity: 物件，提供很多種屬性可以檢查欄位
  if (input.validity.valueMissing) {
    //手動設定欄位錯誤訊息
    input.setCustomValidity('這個欄位必填');
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity('格式不正確，請確認輸入內容');
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.title || '格式不正確');
  } 
  //檢查自訂JS規則:
  else if(input.id === 'email' && !validateEmailDomain(input)){//甚麼時候要加id，甚麼時候不用啊 -> 86 line
    input.setCustomValidity('信箱格式必須是 @o365.tku.edu.tw 結尾');

  }
  //
  else {//合法，將自訂錯誤清空，否則瀏覽器會認為這個欄位是錯的
    input.setCustomValidity('');
  }
  return input.reportValidity();
}

//else if(input.id === 'email' && !validateEmailDomain(input)){
//   input.setCustomValidity('Email 格式必須是您的9位數學號，例如：412630120@o365.tku.edu.tw');
// }

//監聽「表單提交」事件
form.addEventListener('submit', (event) => {//在form元素上，安裝一個 submit 事件的偵測器。
  event.preventDefault();
  //表單預設:點擊提交就馬上把資料送出並刷新頁面 -> 把控制權搶回來，讓我們能先用 JavaScript 檢查。
  const emailOk = showValidity(email);//回傳結果:true/false
  const phoneOk = showValidity(phone);
  if (emailOk && phoneOk) {
    alert('表單驗證成功，準備送出資料');
    form.reset();
    //清空表單 + 透過fetch將資料送至後端
  }
});

//監聽「即時驗證」事件 -> 目的： 讓使用者不用等到按「送出」，一填完該欄位，就能馬上看到錯誤或通過。
email.addEventListener('blur', () => { //在email輸入框安裝blur事件偵測器
  showValidity(email);//showValidity(email) 檢查這「email」欄位
});

phone.addEventListener('blur', () => {
  showValidity(phone);
});
//blur:當使用者的游標離開 (失去焦點) 這個輸入框時觸發。




//加判斷式，只能填@o365.tku.edu.tw

//在取欄位時，究竟要不要加.id? -> 函式 的「共用性」有關係
/*
不用加 id 判斷：當你的檢查規則是「通用」的，所有欄位都可能適用時。
要加 id 判斷：當你的檢查規則是「專屬」的，只針對 特定某一個 欄位時。
總結:當你寫一個「共用函式」來處理多個不同元素，但其中有一段邏輯「只」應該套用在某個特定元素上時，
    你就要用 id (或其他獨特標記) 來把它過濾出來。
*/
