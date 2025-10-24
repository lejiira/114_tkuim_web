// example5_script.js
// 以巢狀 for 產生 1~9 的乘法表

// var output = '';
// for (var i = 1; i <= 9; i++) {
//   for (var j = 1; j <= 9; j++) {
//     output += i + 'x' + j + '=' + (i * j) + '\t';
//   }
//   output += '\n';
// }
// document.getElementById('result').textContent = output;

let startinput = prompt("請輸入開始數字");
let endinput = prompt("請輸入結束數字");

let output='';

for(let i=startinput;i<=endinput;i++){
  for(let j=1;j<=9;j++){
    output+= i + 'x' + j + "=" + i*j +'\t';
  }
  output += '\n';
}

document.getElementById('result').textContent = output;
