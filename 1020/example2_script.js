// example2_script.js
// 變數宣告與基本型態操作

//var text = '123';              // 字串
// var num = 45;                  // 數字
// var isPass = true;             // 布林
// var emptyValue = null;         // 空值
// var notAssigned;               // undefined（尚未指定）

// // 型態檢查
// var lines = '';
// lines += 'text = ' + text + '，typeof: ' + (typeof text) + '\n';
// lines += 'num = ' + num + '，typeof: ' + (typeof num) + '\n';
// lines += 'isPass = ' + isPass + '，typeof: ' + (typeof isPass) + '\n';
// lines += 'emptyValue = ' + emptyValue + '，typeof: ' + (typeof emptyValue) + '\n';
// lines += 'notAssigned = ' + notAssigned + '，typeof: ' + (typeof notAssigned) + '\n\n';

// // 轉型
// var textToNumber = parseInt(text, 10); // 將 '123' → 123
// lines += 'parseInt(\'123\') = ' + textToNumber + '\n';
// lines += 'String(45) = ' + String(num) + '\n';

// document.getElementById('result').textContent = lines;

//prompt()函數:讀取到的內容預設皆為字串
let input1=prompt("輸入第一個數字");
let input2=prompt("輸入第二個數字");

let total=parseInt(input1,10)+parseInt(input2,10);
console.log("相加結果:",total); 
alert("結果是:"+total)

//怎麼區分到底要用"," " + "
//回傳顯現的方式