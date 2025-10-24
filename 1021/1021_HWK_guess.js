/*
猜數字遊戲：

電腦隨機產生 1–100（Math.floor(Math.random()*100)+1）。
使用 prompt() 讓使用者輸入數字，提示「再大一點 / 再小一點」。
猜中顯示次數統計。
*/

function generateNum(){//generateNum() 每呼叫 (call) 它一次，它就會「重新」產生一個全新的隨機數字，因此需要透過一個變數固定。
    return Math.floor(Math.random()*100)+1;
}
let answer =generateNum();
console.log('answer u can see '+ answer);

let guesscnt =0 ;
let isCorret = false;
while(isCorret === false){ //(迴圈執行的條件:猜對就跳出迴圈)
    let input=prompt("輸入數值");
    input = parseInt(input,10);
    //檢查
    if(isNaN(input)){alert('輸入值不有效');break;}
    else{
        guesscnt++;
        switch (true){
            case input>answer:
                alert('再小一點');
                break;
            case input<answer:
                alert('再大一點');
                break;
            default:
                alert('你運氣真好，猜中了!!\n一共猜了'+guesscnt+"次");
                document.getElementById('result').textContent='你運氣真好，猜中了!!\n一共猜了'+guesscnt+"次";
                isCorret=true;
                break;
        }
    }

}




