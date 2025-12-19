// client/signup_form.js

// 1. 載入報名名單 (GET)
async function loadParticipants() {
    const token = localStorage.getItem('token');
    const listContainer = document.getElementById('list-container');
    
    if (!token) return; // 沒登入就不動作

    try {
        const res = await fetch(`${API_URL}/api/signup`, {
            method: 'GET',
            headers: {
                // ★ 關鍵：把 Token 放在 Header 帶給後端檢查
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (res.ok) {
            // 清空列表
            listContainer.innerHTML = ''; 
            
            if (data.length === 0) {
                listContainer.innerHTML = '<p>目前沒有資料</p>';
                return;
            }

            // 產生卡片
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'card';
                div.innerHTML = `
                    <strong>${item.name}</strong> (${item.email}) <br>
                    <small>Owner ID: ${item.ownerId}</small>
                    <button onclick="deleteParticipant('${item._id}')" style="float:right; color:red;">刪除</button>
                `;
                listContainer.appendChild(div);
            });
        } else {
            listContainer.innerHTML = `<p class="error">${data.error}</p>`;
        }
    } catch (err) {
        console.error(err);
        listContainer.innerHTML = '<p class="error">載入失敗</p>';
    }
}

// 2. 送出報名表 (POST)
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // 防止表單刷新
    const token = localStorage.getItem('token');
    const msg = document.getElementById('form-msg');

    const payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    try {
        const res = await fetch(`${API_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // ★ 記得帶 Token
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            msg.innerText = '✅ 報名成功！';
            msg.style.color = 'green';
            document.getElementById('signup-form').reset(); // 清空表單
            loadParticipants(); // 重新載入列表
        } else {
            msg.innerText = `❌ ${data.error}`;
            msg.style.color = 'red';
        }
    } catch (err) {
        msg.innerText = '❌ 連線錯誤';
    }
});

// 3. 刪除資料 (DELETE)
// 為了讓 HTML 裡的 onclick 呼叫得到，我們要把它掛在 window 上
window.deleteParticipant = async (id) => {
    if (!confirm('確定要刪除這筆資料嗎？')) return;

    const token = localStorage.getItem('token');
    
    try {
        const res = await fetch(`${API_URL}/api/signup/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (res.ok) {
            alert('刪除成功');
            loadParticipants(); // 重新整理
        } else {
            alert(`刪除失敗: ${data.error}`);
        }
    } catch (err) {
        alert('連線錯誤');
    }
};