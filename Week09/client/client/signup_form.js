const form = document.querySelector('#signup-form');
const resultEl = document.querySelector('#result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.password = payload.confirmPassword = 'demoPass88';
  payload.interests = ['後端入門'];
  payload.terms = true;
 
  //發送fetch請求
  try {
    resultEl.textContent = '送出中...';
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
