// client/login.js

// 設定後端網址 (根據你的 .env 設定是 3001)
const API_URL = "http://localhost:3001"; 

const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const userDisplay = document.getElementById('user-display');
const loginMsg = document.getElementById('login-msg');

// 1. 登入功能
document.getElementById('btn-login').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            // ★ 關鍵：把 Token 存起來！
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role); // 存角色以便顯示
            localStorage.setItem('email', email);    // 存 Email 以便顯示

            alert('登入成功！');
            checkLoginStatus(); // 更新畫面
        } else {
            loginMsg.innerText = data.error || '登入失敗';
        }
    } catch (err) {
        console.error(err);
        loginMsg.innerText = '無法連線到後端';
    }
});

// 2. 登出功能
document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    checkLoginStatus(); // 更新畫面
});

// 3. 檢查登入狀態 (切換顯示)
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    
    if (token) {
        // 已登入：隱藏登入框，顯示儀表板
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        userDisplay.innerText = `${localStorage.getItem('email')} (${localStorage.getItem('role')})`;
        
        // 呼叫另一個檔案的函式來載入資料
        if (typeof loadParticipants === 'function') {
            loadParticipants();
        }
    } else {
        // 未登入
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }
}

// 修改後：等待網頁全部載入完畢 (DOMContentLoaded) 才執行
window.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});