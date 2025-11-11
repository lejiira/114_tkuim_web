/* --------------------------------------------------
   步驟 2.2：建立模擬資料 (食譜資料庫)
----------------------------------------------------- */

//建立資料庫，作為生成餐點的依據 -> 假資料庫
const allRecipes = [
    {
        id: 1,
        title: "番茄炒蛋",
        image: "https://via.placeholder.com/300x200?text=Tomato+Egg",
        // 這道菜「需要」的食材
        required: ["雞蛋", "番茄"], 
        // 額外資訊 (為步驟 3 準備)
        servings: 1, // 基礎份量
        ingredients: [
            { name: "雞蛋", quantity: 2, unit: "顆" },
            { name: "番茄", quantity: 1, unit: "顆" },
            { name: "蔥", quantity: 1, unit: "根" }
        ],
        steps: "1. 雞蛋打散。 2. 番茄切塊。 3. 熱鍋冷油，先炒蛋，再下番茄..."
    },
    {
        id: 2,
        title: "洋蔥炒雞肉",
        image: "https://imgproxy.icook.network/safe/rt:fit/w:1200/el:0/q:80/plain/http://tokyo-kitchen.icook.tw.s3.amazonaws.com/uploads/recipe/cover/468045/22ac0c2f6cec29c0.jpg",
        required: ["雞肉", "洋蔥"],
        servings: 2,
        ingredients: [
            { name: "雞肉", quantity: 300, unit: "克" },
            { name: "洋蔥", quantity: 1, unit: "顆" },
            { name: "醬油", quantity: 2, unit: "湯匙" }
        ],
        steps: "1. 雞肉切塊。 2. 洋蔥切絲。 3. 先炒香洋蔥，再下雞肉..."
    },
    {
        id: 3,
        title: "番茄雞蛋湯",
        image: "https://via.placeholder.com/300x200?text=Tomato+Egg+Soup",
        required: ["雞蛋", "番茄"],
        servings: 2,
        ingredients: [
            { name: "雞蛋", quantity: 2, unit: "顆" },
            { name: "番茄", quantity: 2, unit: "顆" },
            { name: "水", quantity: 500, unit: "ml" }
        ],
        steps: "1. 番茄切塊炒香。 2. 加水煮滾。 3. 淋上蛋液..."
    }
    // ... 未來可以新增更多食譜 ...
];


/* --------------------------------------------------
   步驟 2.3：DOM 抓取 (querySelector)
   - 我們會抓取所有需要互動的「HTML 元素」。
----------------------------------------------------- */

// 'defer' 屬性確保了執行到這裡時，HTML 已經載入完畢。

// 1. 抓取「產生食譜」按鈕
// (技術要求：querySelector:抓取「被勾選的 (checked)」的「input checkbox」 -> c.f 為甚麼不用getelementbyid)
const generateBtn = document.querySelector("#generate-btn");

// 2. 抓取「食材勾選」的表單
const ingredientForm = document.querySelector("#ingredient-form");

// 3. 抓取「食譜結果」的顯示區域
// 這是我們等等要用 createElement 插入卡片的地方
const recipeResultsContainer = document.querySelector("#recipe-results");


// 抓取「食譜詳情」區塊的 DOM 元素
// 1. 抓取整個「詳情」 <article> 容器
const recipeDetailsContainer = document.querySelector("#recipe-details");
// 2. 抓取「詳情」內的各個小元素
const recipeTitleEl = document.querySelector("#recipe-title");
const ingredientListEl = document.querySelector("#ingredient-list");
const recipeStepsEl = document.querySelector("#recipe-steps");
// 3. 抓取「份量」輸入框 (為步驟四做準備)
const servingsInput = document.querySelector("#servings");

/* --------------------------------------------------
   步驟 2.4：綁定事件監聽 (addEventListener)
   - 讓按鈕「活起來」。
----------------------------------------------------- */

// (技術要求：addEventListener)
// 我們監聽表單的 "submit" (提交) 事件，而不是按鈕的 "click" 事件
// 這樣做的好處是，使用者按 Enter 鍵也能觸發。
ingredientForm.addEventListener("submit", function(event) {
    
    //  預防表單提交的預設行為 
    event.preventDefault(); 
    handleRecipeGeneration();
});

/* --------------------------------------------------
   步驟 2.5：核心功能函式
----------------------------------------------------- */
// 使用「事件委派」來監聽卡片點擊
// 我們把監聽器加在「容器」上
recipeResultsContainer.addEventListener("click", function(event) {
    // 當點擊事件發生時，我們檢查「被點到的元素」
    // (event.target) 是否「在某張 .card 裡面」
    
    // .closest() 會從 event.target 往上找，
    // 看能不能找到一個 class 為 .card 的父元素
    const clickedButton = event.target.closest(".view-recipe-btn");

    // 如果 clickedButton 存在 (代表真的點在卡片上)
    if (clickedButton) {
        // 3. (重要！) 從這個按鈕「往上」找到它所在的「整張卡片」
        // 我們才能從卡片上讀取 data-recipe-id
        const card =clickedButton.closest(".card"); 
        const recipeId = parseInt(card.dataset.recipeId);
        // 呼叫我們的函式來顯示詳情
        showRecipeDetails(recipeId);
    }
});

/* --------------------------------------------------
   [步驟四新增]：監聽「份量」輸入框的「即時」變動
   - "input" 事件會在使用者「每次輸入或更改」時觸發
----------------------------------------------------- */
servingsInput.addEventListener("input", function(event) {
    // 當份量變動時，呼叫我們的計算函式
    handleServingsChange(event.target.value);
});

// 這是按下按鈕後會執行的主要函式
function handleRecipeGeneration() {
    
    // 1. 取得使用者勾選的食材 (技術要求：querySelectorAll)
    
    // 我們使用 querySelectorAll 抓取所有「被勾選的 (checked)」的「input checkbox」
    const checkedInputs = document.querySelectorAll('input[type="checkbox"]:checked');
    
    // 將抓取到的 NodeList (節點列表) 轉換成一個單純的「食材名稱陣列」
    // ["雞蛋", "番茄"]
    const selectedIngredients = Array.from(checkedInputs).map(input => input.value);
    
    // 2. 過濾食譜 (JavaScript 陣列操作)
    // - 找出 allRecipes 中，哪些食譜是使用者「有」的食材可以做的
    const matchedRecipes = allRecipes.filter(recipe => {
        // 'every' 是一個 JS 陣列方法，它會檢查「所有」項目是否都符合條件
        // 檢查這道食譜 (recipe) 的「每一樣」必要食材 (reqIngredient)
        // 是否都「包含在 (includes)」使用者勾選的 (selectedIngredients) 陣列中
        return recipe.required.every(reqIngredient => selectedIngredients.includes(reqIngredient));
    });

    // 3. 顯示結果到畫面上
    displayRecipes(matchedRecipes);

    // 產生新食譜時，先把舊的詳情隱藏起來
    recipeDetailsContainer.style.display = "none";
}

// 這是專門用來「顯示食譜卡片」的函式
// (技術要求：createElement)
function displayRecipes(recipes) {
    
    // 1. 清空上一次的搜尋結果
    recipeResultsContainer.innerHTML = "";

    // 2. 檢查是否有找到食譜
    if (recipes.length === 0) {
        recipeResultsContainer.innerHTML = '<p class="text-muted">抱歉，找不到符合您食材的食譜...</p>';
        return; // 函式提早結束
    }

    // 3. 透過迴圈，找所有的食譜，並「動態建立」HTML 元素 : createElement
    recipes.forEach(recipe => {
        
        /* * 這裡開始是 createElement 的重點！
         * 我們要建立的結構如下 (Bootstrap Card)：
         * <div class="col">
         * <div class="card h-100">
         * <img src="..." class="card-img-top">
         * <div class="card-body">
         * <h5 class="card-title">...</h5>
         * <p class="card-text">...</p>
         * </div>
         * </div>
         * </div>
        */

        // 建立最外層的 'col' 
        const colDiv = document.createElement("div");
        colDiv.className = "col"; // 加上 Bootstrap 的 class

        // 建立 'card' 
        const cardDiv = document.createElement("div");
        cardDiv.className = "card h-100 shadow-sm";
        // (為步驟 3 準備) 我們把食譜的 'id' 存放在 HTML 屬性中，方便之後抓取
        cardDiv.dataset.recipeId = recipe.id;



        // 建立 'img'
        const img = document.createElement("img");
        img.src = recipe.image;
        img.className = "card-img-top";
        img.alt = recipe.title;

        // 建立 'card-body'
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

        // 建立 'h5' (標題)
        const titleH5 = document.createElement("h5");
        titleH5.className = "card-title";
        titleH5.textContent = recipe.title; // 填入文字

        // 建立 'p' (描述)
        const descP = document.createElement("p");
        descP.className = "card-text";
        descP.textContent = "需要食材：" + recipe.required.join("、");

        // [*** 更改點 2 (新增) ***] 
        // 動態建立「查看詳情」按鈕
        const viewButton = document.createElement("button");
        // 我們幫按鈕加上 Bootstrap 樣式，和一個自訂的 class 'view-recipe-btn'
        viewButton.className = "btn btn-outline-primary btn-sm mt-auto view-recipe-btn";
        viewButton.textContent = "查看詳情";


        // 4. 組合元素 (像樂高一樣組合起來)
        // card-body 裡面放入 h5 和 p
        cardBodyDiv.appendChild(titleH5);
        cardBodyDiv.appendChild(descP);
        
        // card 裡面放入 img 和 card-body
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBodyDiv);

        // 把按鈕加到 card-body 的最後
        cardBodyDiv.appendChild(viewButton);
        
        // col 裡面放入 card
        colDiv.appendChild(cardDiv);

        // 5. 將完成的 'col' 元素，插入到 HTML 頁面上的 #recipe-results 容器中
        recipeResultsContainer.appendChild(colDiv);
    });
}

//[步驟三新增]：顯示食譜詳情的函式
function showRecipeDetails(recipeId) {
    // 1. 根據 ID，從 'allRecipes' 陣列中找出完整的食譜物件
    // .find() 是 JS 陣列方法，會回傳第一個符合條件的項目
    const recipe = allRecipes.find(r => r.id === recipeId);

    if (!recipe) {
        console.error("找不到食譜！ ID:", recipeId);
        return;
    }

    // 2. 將食譜資料，填入到「詳情」區塊的 HTML 元素中
    
    // 填入標題
    recipeTitleEl.textContent = recipe.title;

    // (為步驟四準備) 把目前食譜的「基礎份量」存起來
    // 我們把它存在 HTML 元素上
    servingsInput.dataset.baseServings = recipe.servings;
    
    // (為步驟四準備) 把目前食譜的「完整食材清單」也存起來
    // 我們用 JSON.stringify 把它變成字串存著
    servingsInput.dataset.baseIngredients = JSON.stringify(recipe.ingredients);

    // (為步驟四準備) 將份量輸入框，重設為該食譜的基礎份量
    servingsInput.value = recipe.servings;

    // 3. 動態產生「食材清單」的 HTML
    // 這裡我們使用 .map() 和 .join()，這是產生 HTML 列表最快的方式
    const ingredientHtml = recipe.ingredients
        .map(item => {
            // `<li>...</li>` 是 HTML 的列表項目
            return `<li>${item.name}： ${item.quantity} ${item.unit}</li>`;
        })
        .join(""); // 用 .join("") 把陣列裡的所有 <li> 字串黏合起來

    // 把組合好的 HTML 放入 <ul>
    ingredientListEl.innerHTML = ingredientHtml;

    // 4. 填入步驟
    // 這裡我們用 replaceAll 把換行符號 \n 轉成 <br> (HTML換行)，如果有的話
    recipeStepsEl.innerHTML = recipe.steps.replaceAll("\n", "<br>");

    // 5. (最重要) 讓「詳情」容器顯示出來！
    recipeDetailsContainer.style.display = "block";

    // (可選) 讓頁面平滑滾動到「詳情」區塊
    recipeDetailsContainer.scrollIntoView({ behavior: "smooth" });
}

/* --------------------------------------------------
   [步驟四新增]：處理份量變更與即時計算的函式
----------------------------------------------------- */
function handleServingsChange(newServings) {
    // 1. 取得儲存在 input 上的「原始資料」
    // (注意) 我們必須把字串轉回「數字」和「物件」
    const baseServings = Number(servingsInput.dataset.baseServings);
    const baseIngredients = JSON.parse(servingsInput.dataset.baseIngredients);

    // 2. 檢查使用者輸入是否合法 (例如：不能是 0 或 負數)
    if (newServings < 1 || !newServings) {
        // 如果輸入不合法，暫時不更新 (或顯示錯誤訊息)
        // 這裡我們先簡單處理：維持原狀
        newServings = 1; // 強制設為 1
        servingsInput.value = 1; // 更新輸入框的顯示
    }

    // 3. (核心邏輯) 計算「比例」
    // 範例：新份量 4 / 基礎份量 2 = 比例 2
    // 範例：新份量 1 / 基礎份量 2 = 比例 0.5
    const ratio = newServings / baseServings;

    // 4. 根據「比例」，動態產生新的食材列表 HTML
    const newIngredientHtml = baseIngredients
        .map(item => {
            // 原始數量 * 比例 = 新數量
            let newQuantity = item.quantity * ratio;
            
            // (優化) 處理小數點，四捨五入到小數點後 1 位
            newQuantity = Math.round(newQuantity * 10) / 10;
            
            return `<li>${item.name}： ${newQuantity} ${item.unit}</li>`;
        })
        .join("");

    // 5. 將計算好的新 HTML 塞回頁面
    ingredientListEl.innerHTML = newIngredientHtml;
}

/* --------------------------------------------------
   [步驟六新增]：頁面切換與表單驗證
----------------------------------------------------- */

// --- 1. 抓取「頁面」和「導覽按鈕」的 DOM 元素 ---

const pageGenerator = document.querySelector("#page-generator");
const pageShare = document.querySelector("#page-share");
const navBtnHome = document.querySelector("#nav-btn-home");
const navBtnShare = document.querySelector("#nav-btn-share");

// --- 2. 處理「導覽按鈕」的點擊事件 (內容切換) ---

// 2.1 監聽「首頁」按鈕
navBtnHome.addEventListener("click", function() {
    // 顯示「產生器」頁面
    pageGenerator.style.display = "block";
    // 隱藏「分享」頁面
    pageShare.style.display = "none";

    // 更新按鈕的 'active' 狀態
    navBtnHome.classList.add("active");
    navBtnShare.classList.remove("active");
});

// 2.2 監聽「分享食譜」按鈕
navBtnShare.addEventListener("click", function() {
    // 隱藏「產生器」頁面
    pageGenerator.style.display = "none";
    // 顯示「分享」頁面
    pageShare.style.display = "block";

    // 更新按鈕的 'active' 狀態
    navBtnHome.classList.remove("active");
    navBtnShare.classList.add("active");
});


// --- 3. 抓取「分享表單」相關的 DOM 元素 ---

// (A) 表單驗證相關
const shareForm = document.querySelector("#share-form");

// (B) 授權條款 Modal 相關
const consentCheck = document.querySelector("#consent-check"); // 外部 checkbox
const openTermsLink = document.querySelector("#open-terms-link"); // "授權條款" 連結
const termsModalEl = document.querySelector("#termsModal"); // Modal 元素
const agreeToTermsBtn = document.querySelector("#agree-to-terms-btn"); // Modal 內的「同意」按鈕

// (重要) 取得 Bootstrap Modal 的「JS 實體」
// (我們必須手動 new 一個，因為這個 Modal 是在 body 結尾)
const termsModal = new bootstrap.Modal(termsModalEl);


// --- 4. 處理「分享表單」的提交 (驗證) ---

shareForm.addEventListener("submit", function(event) {
    // 阻止表單預設提交 (重新整理)
    event.preventDefault();
    event.stopPropagation();

    // 檢查 HTML5 驗證 (required, minlength, type="url", 和 checkbox 的 required)
    if (!shareForm.checkValidity()) {
        // 驗證失敗 (例如：必填沒填)
        // (do nothing here)
    } else {
        // 驗證成功 (所有欄位都通過)
        
        alert("分享成功！(這是一個假提交，資料未真的送出)");

        // 重設表單 (清空所有欄位)
        shareForm.reset(); 
        
        // (重要) reset() 會把 checkbox 恢復到 'unchecked'，
        // 我們手動把它加回 'disabled' 狀態，回到最初
        consentCheck.disabled = true;

        // 移除 Bootstrap 的驗證樣式
        shareForm.classList.remove("was-validated");

        // (UX 優化) 提交成功後，自動「點擊」首頁按鈕，切換回首頁
        navBtnHome.click(); 

        return; // 結束
    }

    // 如果 4.1 驗證失敗，就在這裡加上 'was-validated' 來顯示錯誤訊息
    shareForm.classList.add("was-validated");
});


// --- 5. 處理「授權條款 Modal」的互動邏輯 ---

// 5.1 監聽「授權條款」連結的點擊
openTermsLink.addEventListener("click", function() {
    // 打開 Modal
    termsModal.show();
});

// 5.2 監聽 Modal 內部「我已閱讀並同意」按鈕的點擊
agreeToTermsBtn.addEventListener("click", function() {
    
    // (1) 讓外部的 checkbox 被「勾選」
    consentCheck.checked = true;
    
    // (2) 讓外部的 checkbox 變成「可操作」
    // (解除 'disabled' 狀態，這樣 HTML5 的 'required' 驗證才能運作)
    consentCheck.disabled = false;

    // (3) 關閉 Modal
    termsModal.hide();
});

// (可選優化) 當表單重設時 (例如成功提交後)，也順便把 checkbox 鎖回
shareForm.addEventListener("reset", function() {
    consentCheck.disabled = true;
    // 移除驗證樣式，確保乾淨
    shareForm.classList.remove("was-validated");
});
    