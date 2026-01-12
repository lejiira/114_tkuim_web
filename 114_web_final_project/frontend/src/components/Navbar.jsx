// src/components/Navbar.jsx
// [檔案功能] 智慧導覽列：根據 localStorage 中的登入狀態，動態切換顯示「登入/註冊」或「會員中心/登出」
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    GlobeAmericas,
    HouseDoorFill,
    BoxArrowInRight,
    PersonPlusFill,
    PersonCircle,
    BoxArrowRight
} from 'react-bootstrap-icons';

function Navbar() {
    const navigate = useNavigate(); // 用來做登出後的頁面跳轉
    const [user, setUser] = useState(null);

    // 1. 檢查是否有登入
    // 元件載入時，去 localStorage 看看有沒有 'user' 這筆資料
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // 把文字轉回物件存起來
        }
    }, []);

    // 2. 登出功能
    const handleLogout = () => {
        const confirmLogout = window.confirm("確定要登出嗎？");
        if (confirmLogout) {
            localStorage.removeItem('user'); // 刪除登入憑證
            setUser(null); // 清空狀態
            alert("已登出");
            navigate('/login'); // 跳回登入頁
            // 這裡重新整理網頁是為了確保所有狀態清空，這是一個簡單暴力的做法
            window.location.reload();
        }
    };

    // --- 樣式設定 (維持原樣，新增 button 樣式) ---
    const navStyle = {
        background: '#2e5c31ff',
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px'
    };

    const buttonStyle = {
        backgroundColor: '#dc3545', // 紅色
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '5px'
    };

    return (
        <nav style={navStyle}>
            {/* Logo 區域 */}
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginRight: 'auto' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    <GlobeAmericas size={24} />瀕危動物網
                </Link>
            </div>

            <Link to="/" style={linkStyle}><HouseDoorFill />首頁</Link>

            {/* 3. 條件渲染：根據 user 是否存在來決定顯示什麼 */}
            {user ? (
                // --- 如果有登入 (顯示這區塊) ---
                <>
                    <span style={{ color: '#aaa' }}>Hi, {user.nickname}</span>
                    <Link to="/dashboard" style={linkStyle}><PersonCircle />會員中心</Link>
                    <button onClick={handleLogout} style={buttonStyle}><BoxArrowRight />登出</button>
                </>
            ) : (
                // --- 如果沒登入 (顯示這區塊) ---
                <>
                    <Link to="/login" style={linkStyle}><BoxArrowInRight />登入</Link>
                    <Link to="/register" style={linkStyle}><PersonPlusFill />註冊</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;