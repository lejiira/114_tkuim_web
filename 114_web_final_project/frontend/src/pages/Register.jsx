// src/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 需要先 npm install react-router-dom

function Register() {
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // 用來跳轉頁面

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 發送 API 請求到後端
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('註冊成功！請登入');
                navigate('/login'); // 註冊成功後跳轉到登入頁
            } else {
                alert(data.message || '註冊失敗');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('無法連線到伺服器');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>會員註冊</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>暱稱：</label>
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
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
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
                    立即註冊
                </button>
            </form>
        </div>
    );
}

export default Register;