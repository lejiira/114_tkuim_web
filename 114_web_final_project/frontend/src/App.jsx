// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css'; // 維持原本樣式

// --- ✨ 修正這裡的引入路徑 ---
import Navbar from './components/Navbar';       // 從 components 資料夾引入
import Home from './pages/Home';               // 從 pages 資料夾引入
import Login from './pages/Login';             // 從 pages 資料夾引入
import Register from './pages/Register';       // 從 pages 資料夾引入
import Dashboard from './pages/Dashboard';     // 從 pages 資料夾引入

function App() {
  return (
    <>
      {/* 導覽列放在這裡，這樣每一頁都會出現 */}
      <Navbar />

      <div className="container" style={{ padding: '20px' }}>
        <Routes>
          {/* 設定網址與對應的頁面 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 會員中心 (之後會用到) */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;