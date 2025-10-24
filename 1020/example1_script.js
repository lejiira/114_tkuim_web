// example1_script.js
// 傳統語法：僅使用 var、function、字串串接

// 顯示提示窗 
alert('歡迎來到 JavaScript！');

// 在 Console 顯示訊息
console.log('Hello JavaScript from console');

// 在頁面指定區域輸出文字
// var el = document.getElementById('result');
// //el.textContent = '這行文字是由外部 JS 檔案寫入的。';
// el.textContent = '412630120_李佳芮';


var button =document.getElementById('mybutton');
// 2. 監聽事件：告訴瀏覽器，請開始注意這顆按鈕
//    如果「有人點擊 (click) 了它」，就去執行我們指定的 function (函式)
button.addEventListener('click',function(){alert('你點擊了按鈕');
});