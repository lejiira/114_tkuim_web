const form = document.querySelector('#signup-form');
const resultEl = document.querySelector('#result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  // 注意：這邊是寫死的密碼，這是為了方便測試 (因為你的 HTML 表單可能沒有密碼欄位)
  // 如果後端資料庫需要密碼，這行要留著
  payload.password = payload.confirmPassword = 'demoPass88';
  payload.interests = ['後端入門'];
  payload.terms = true;
 
  //發送fetch請求
  try {
    resultEl.textContent = '送出中...';
    // 關鍵點：確認你的後端 (server) 是跑在 3001 還是 3000？
    // 如果你的 server/app.js 裡面寫 listen(3000)，這裡就要改成 3000
    const res = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || '失敗');
    }
    resultEl.textContent = JSON.stringify(data, null, 2);
    form.reset();
  } catch (error) {
    resultEl.textContent = `錯誤：${error.message}`;
  }
});


// 取得查看清單按鈕(程式碼裡沒有寫出 method: 'GET' ，但瀏覽器在執行的時候，它實際上發送出去的請求（Request）就是 GET。 --> 預設)
const loadBtn = document.querySelector('#load-btn');
loadBtn.addEventListener('click', async () => {
  try {
    resultEl.textContent = '載入清單中...';
    // 呼叫後端 GET API
    // 關鍵點：這裡的 Port 也要跟上面一樣
    const res = await fetch('http://localhost:3001/api/signup');
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || '無法取得清單');
    }
    resultEl.textContent = `目前報名總數: ${data.total}\n\n` + JSON.stringify(data.data, null, 2);
    
  } catch (error) {
    resultEl.textContent = `取得清單失敗：${error.message}`;
  }
});
