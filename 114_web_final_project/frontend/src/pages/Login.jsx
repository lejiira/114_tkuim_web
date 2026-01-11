// src/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // ✨ 關鍵步驟：把後端回傳的使用者資料存入 localStorage
                // 這樣你在其他頁面 (如：首頁、會員中心) 才能知道是誰登入了
                localStorage.setItem('user', JSON.stringify(data.user));

                alert('登入成功！歡迎回來');
                navigate('/'); // 跳轉回首頁
                window.location.reload(); // 重新整理頁面以更新導覽列狀態 (簡單暴力法)
            } else {
                alert(data.message || '登入失敗');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('無法連線到伺服器');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>會員登入</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>信箱：</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>密碼：</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                    登入
                </button>
            </form>
        </div>
    );
}

export default Login;