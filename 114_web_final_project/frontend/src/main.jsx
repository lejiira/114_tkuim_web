// src/main.jsx
// [檔案功能] 前端程式的入口點：
// 負責將 React 掛載到 HTML 上，並設定路由環境 (BrowserRouter)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // 1. 引入這個

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. 把 App 包起來 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)