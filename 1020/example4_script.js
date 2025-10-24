// example4_script.js
// 判斷輸入數字是否為奇數或偶數

var input = prompt('請輸入一個整數：');
var n = parseInt(input, 10);
var msg = '';

if (isNaN(n)) {
  msg = '輸入不是有效的整數！';
} else if (n % 2 === 0) {
  msg = n + ' 是偶數';
} else {
  msg = n + ' 是奇數';
}

// 額外示範 switch（1、2、3 對應文字）
// var choice = prompt('輸入 1/2/3 試試 switch：');
// switch (choice) {
//   case '1':
//     msg += '\n你輸入了 1';
//     break;
//   case '2':
//     msg += '\n你輸入了 2';
//     break;
//   case '3':
//     msg += '\n你輸入了 3';
//     break;
//   default:
//     msg += '\n非 1/2/3';
// }

//將結果顯示在網頁上
document.getElementById('result').textContent = msg;

let scoreInput=prompt('輸入分數(0-100)');
let score=parseFloat(scoreInput,10);
let outpu='';

// switch只可以用來處理特定的、離散的值
//「用switch 比對範圍」:可以透過switch(true)技巧 
// 運作原理:評估每個case後面的表達式，直到找到第一個為true的case，然後執行。

switch(true){//注意:順序很重要，如果是>60先被判斷，則很多都會被丟在D等
    case (score>=90):
        outpu='A等';
        break;
    case (score>=80):
        outpu='B等';
        break;
    case (score>=70):
        outpu='C等';
        break;
    case (score>=60):
        outpu='D等';
        break;
    case (score<60):
        outpu='F等';
        break;
}


alert(outpu);
document.getElementById('result').textContent += '\n'+ score+" 是"+outpu;
