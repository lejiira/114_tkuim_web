//溫度轉換器（攝氏 ↔ 華氏）：
/*
使用 prompt() 讀入溫度與單位（C 或 F）。
轉換公式：C = (F - 32) * 5 / 9；F = C * 9 / 5 + 32。
結果以 alert() 與頁面 <pre> 顯示。
*/

let valueS = prompt('輸入溫度值:');
let unitS = prompt('輸入單位(C或F):');

let value = parseFloat(valueS);//可不可以輸入值和轉換值同一步
let text = '';

let final;
//判斷輸入值是否合法
if(isNaN(value)){text='您的輸入並不是有效數字';}
else if(unitS === null){text='未輸入單位'}
else{
    //先將輸入的英文一律轉成大寫，並去除前後空白
    let unit =unitS.toUpperCase().trim();
    switch(true){
        case unit==='C': //C->F
            final=(value * 9 / 5) + 32;
            text = value +'°C =' +final+'°F';
            break;
        case unit==='F': 
            final=(value-32)*5/9;
            text=value+'°F 等於 ' +final+'°C';
            break;
        default: //其他選項
            text='您輸入的'+unitS+'無效';
    }
}

alert(text);
document.getElementById('result').textContent=text;

/*
switch 的「穿透 (Fall-through)」:
當 switch 找到一個符合的 case（例如 case unit==='F':），它會開始執行裡面的程式碼。
但如果你沒有用 break; 明確告訴它「結束」，它會無視下面的 case 或 default，繼續往下執行！
*/