// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';     // ✨ 1. 在這裡引入 Footer 元件
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    // 使用一個最外層的 div 包住，並讓它至少有 100vh 高，
    // 這樣可以用 Flexbox 確保 Footer 永遠沉在最下面 (即便內容很少)
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* 導覽列 */}
      <Navbar />

      {/* ✨ 2. 主要內容區塊 
         這裡我拿掉了原本的 className="container" 和 padding。
         原因：因為 Home 頁面需要「全螢幕寬度」的大圖，如果有 padding 會出現白邊。
         flex: 1 會讓這個區塊自動撐開，把 Footer 推到最下面。
      */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      {/* ✨ 3. 頁尾放在這裡 (Routes 之外) */}
      <Footer />

    </div>
  );
}

export default App;