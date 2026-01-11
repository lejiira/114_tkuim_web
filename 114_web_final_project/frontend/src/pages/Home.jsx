// src/pages/Home.jsx
// [檔案功能] 首頁：展示所有瀕危動物列表，並提供認養按鈕
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [animals, setAnimals] = useState([]); // 存放動物資料的倉庫
    const navigate = useNavigate();

    // 1. 載入時，去後端抓資料
    useEffect(() => {
        fetch('http://localhost:5000/api/animals')
            .then(res => res.json())
            .then(data => {
                console.log("抓到的動物資料:", data); // 除錯用，可以在 F12 console 看到
                setAnimals(data);
            })
            .catch(err => console.error("抓取失敗:", err));
    }, []);

    // 2. 處理「我要認養」點擊事件 (這是下一部要做的事，先預留)
    const handleAdopt = async (animalId) => {
        // 1. 檢查身分
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert("請先登入才能認養喔！");
            navigate('/login');
            return;
        }

        const user = JSON.parse(storedUser);
        const userId = user._id; // 從 localStorage 拿出使用者 ID

        // 2. 發送請求給後端
        try {
            const response = await fetch('http://localhost:5000/api/adopt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, animalId }) // 打包資料
            });

            const data = await response.json();

            if (response.ok) {
                alert(`${data.message}`); // 顯示成功訊息
            } else {
                alert(` ${data.message}`);
            }

        } catch (error) {
            console.error("認養請求失敗:", error);
            alert("連線錯誤，請稍後再試");
        }
    };

    // --- 樣式設定 ---
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // RWD 自動排版
        gap: '20px',
        padding: '20px'
    };

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        textAlign: 'center',
        backgroundColor: 'white'
    };

    const imgStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover', // 保持圖片比例不變形
        borderRadius: '8px'
    };

    const badgeStyle = {
        display: 'inline-block',
        padding: '5px 10px',
        background: '#ffeeba',
        color: '#856404',
        borderRadius: '20px',
        fontSize: '12px',
        marginTop: '5px'
    };

    const buttonStyle = {
        marginTop: '15px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    return (
        <div>
            <h1>🦁 瀕危動物總覽</h1>
            <p>目前資料庫共有 {animals.length} 隻動物</p>

            <div style={gridStyle}>
                {/* 3. 使用 map 把資料轉成一張張卡片 */}
                {animals.map((animal) => (
                    <div key={animal._id} style={cardStyle}>
                        {/* 圖片處理：如果沒有圖片網址，顯示替代文字 */}
                        <img
                            src={animal.imageUrl || "https://via.placeholder.com/300?text=No+Image"}
                            alt={animal.name}
                            style={imgStyle}
                        />
                        <h2>{animal.name}</h2>
                        <span style={badgeStyle}>{animal.status}</span>
                        <p style={{ color: '#666', fontSize: '14px', height: '60px', overflow: 'hidden' }}>
                            {animal.description}
                        </p>
                        <button onClick={() => handleAdopt(animal._id)} style={buttonStyle}>
                            我要認養 ❤️
                        </button>
                    </div>
                ))}
            </div>

            {animals.length === 0 && <p style={{ textAlign: 'center' }}>載入中...或是資料庫還沒有動物喔！</p>}
        </div>
    );
}

export default Home;