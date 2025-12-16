# Week14 - Youth Impact Taiwan 網站專案

本專案為 Youth Impact Taiwan 社團法人青年啟航協會的網站展示，包含首頁介紹、最新消息、影片展示以及捐款頁面。網站採用響應式設計 (RWD)，確保在電腦與手機版面皆能順暢瀏覽。

##  功能特色

*   **響應式網頁設計 (RWD)**：支援桌機、平板與手機瀏覽，包含手機版漢堡選單 (Hamburger Menu)。
*   **互動式元件**：
    *   導覽列 (Navigation Bar) 下滑選單。
    *   即時交談視窗 (Chat Widget) 模擬客服功能。
    *   平滑滾動效果 (Smooth Scroll)。
    *   圖片展示廊 (Image Gallery) 與影片嵌入。
*   **語義化 HTML 結構**：提升 SEO 與與維護性。

##  使用說明 (頁面介紹)

本專案主要包含兩個核心頁面：

### 1. 首頁 (index.html)
網站的入口頁面，主要區塊包含：
*   **Header**：包含 Logo 與導覽列，切換不同頁面。
*   **Hero Section**：全螢幕主視覺與標語。
*   **最新消息 (News)**：展示協會成立與相關證書。
*   **影片區塊 (Video)**：嵌入 YouTube 介紹影片。
*   **活動成果 (Gallery)**：網格狀排列的活動照片集。
*   **Chat Widget**：右下角懸浮的交談按鈕，點擊可開啟對話視窗。

### 2. 捐款頁面 (donation.html)
專為募款設計的頁面，包含：
*   **捐款說明**：介紹募款目的與理念。
*   **捐款資訊**：詳列匯款帳號、戶名與聯繫方式。
*   **捐款表單**：提供捐款者填寫基本資料 (姓名、匯款末四碼、Email 等) 的表單介面。

##  運用技術

*   **HTML5**：使用 Semantic Tags (如 `<header>`, `<nav>`, `<section>`, `<footer>`) 建構網頁結構。
*   **CSS3**：
    *   **Flexbox & Grid**：用於排版佈局 (Gallery, Form, Header)。
    *   **Media Queries**：實作 `@media (max-width: 768px)` 達成手機版響應式調整。
    *   **CSS Variables**：定義主題顏色 (如 `--primary-color`) 以利統一管理。
    *   **Animations**：按鈕懸停效果 (Hover) 與彈跳視窗動畫。
*   **JavaScript (Vanilla JS)**：
    *   **DOM 操作**：控制手機版選單開關 (`toggleMenu`) 與聊天視窗開關 (`toggleChat`)。
    *   **Event Listeners**：監聽點擊事件與優化使用者體驗。
*   **Font Awesome**：使用第三方圖示庫 (Icons)。
*   **Google Fonts**：引入 Inter 字體提升閱讀體驗。

##  Vibe Coding 流程步驟
1.  **截圖與需求傳遞**：
    *   將心目中理想的網站樣式截圖。
    *   將截圖貼給 AI Agent，並簡單描述您的需求 (例如："我想要一個像這樣的首頁，要是響應式的")。

2.  **建立待辦清單 (todo.md)**：
    *   AI Agent 會協助分析截圖中的功能區塊 (Header, Hero, News, Footer 等)。
    *   新增 `todo.md`，條列式規劃開發順序與功能細節，確保開發有條理。

3.  **制定技術框架**：
    *   AI 會照著規劃規定框架，確認使用的技術堆疊 (例如：HTML 結構、Vanilla CSS 樣式、JavaScript 互動邏輯)。
    *   決定檔案結構 (index.html, style.css, script.js)。

4.  **循序漸進開發**：
    *   依照 `todo.md` 的順序，由 AI 逐步生成程式碼。
    *   先完成基礎結構，再進行樣式美化，最後加上 JavaScript 互動功能。
