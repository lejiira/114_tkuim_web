// src/pages/Dashboard.jsx
// [檔案功能] 會員中心：顯示使用者的認養清單，並提供取消認養的功能
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [adoptions, setAdoptions] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // 1. 檢查登入並抓取資料
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert("請先登入！");
            navigate('/login');
            return;
        }

        const userData = JSON.parse(storedUser);
        setUser(userData);

        // 呼叫後端 API 抓取認養清單
        fetch(`http://localhost:5000/api/adopt/user/${userData._id}`)
            .then(res => res.json())
            .then(data => {
                console.log("我的認養清單:", data);
                setAdoptions(data);
            })
            .catch(err => console.error("無法取得資料:", err));
    }, [navigate]);

    // 2. 處理取消認養 (Delete)
    const handleCancel = async (adoptionId) => {
        const confirmDelete = window.confirm("確定要取消認養這隻動物嗎？😢");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/adopt/${adoptionId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("已取消認養");
                // 成功後，把畫面上的那筆資料移除 (不用重新整理網頁)
                setAdoptions(adoptions.filter(item => item._id !== adoptionId));
            } else {
                alert("取消失敗，請稍後再試");
            }
        } catch (error) {
            console.error("錯誤:", error);
        }
    };

    // --- 樣式設定 ---
    const listStyle = {
        listStyle: 'none',
        padding: 0
    };

    const itemStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        backgroundColor: '#f9f9f9'
    };

    const imgStyle = {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '8px'
    };

    const btnStyle = {
        marginLeft: 'auto', // 把按鈕推到最右邊
        padding: '8px 15px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1>👤 會員中心</h1>
            {user && <h3>歡迎回來，{user.nickname}！</h3>}

            <h4>我的認養清單 ({adoptions.length})</h4>

            {adoptions.length === 0 ? (
                <p>你目前還沒有認養任何動物喔！快去首頁看看吧！🦁</p>
            ) : (
                <ul style={listStyle}>
                    {adoptions.map((record) => (
                        <li key={record._id} style={itemStyle}>
                            {/* 注意：因為後端用了 populate，所以 record.animalId 現在是完整的動物物件 */}
                            <img
                                src={record.animalId?.imageUrl || "https://via.placeholder.com/100"}
                                alt="animal"
                                style={imgStyle}
                            />
                            <div>
                                <h3 style={{ margin: '0 0 5px 0' }}>{record.animalId?.name}</h3>
                                <p style={{ margin: 0, color: '#666' }}>
                                    認養日期: {new Date(record.adoptDate).toLocaleDateString()}
                                </p>
                            </div>

                            <button onClick={() => handleCancel(record._id)} style={btnStyle}>
                                取消認養 ❌
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;