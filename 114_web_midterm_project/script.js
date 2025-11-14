/*  建立模擬資料 (食譜資料庫) --> 作為生成餐點的依據 -> 假資料庫 */
const allRecipes = [
    {
        id: 1,
        title: "番茄炒蛋",
        image: "https://tokyo-kitchen.icook.network/uploads/step/cover/1791982/79c9e31ea8d68a07.jpg",
        required: ["雞蛋", "番茄"], 
        servings: 1,
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
        title: "番茄蛋花湯",
        image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/369464/ba64e5647de9678e.jpg",
        required: ["雞蛋", "番茄"],
        servings: 2,
        ingredients: [
            { name: "雞蛋", quantity: 2, unit: "顆" },
            { name: "番茄", quantity: 2, unit: "顆" },
            { name: "水", quantity: 500, unit: "ml" }
        ],
        steps: "1. 番茄切塊炒香。 2. 加水煮滾。 3. 淋上蛋液..."
    },  
    {
        id: 4,
        title: "滷肉飯",
        image: "https://hemung.tw/wp-content/uploads/2025/08/%E5%8F%B0%E4%B8%AD%E6%BB%B7%E8%82%89%E9%A3%AF.jpeg",
        required: ["豬絞肉", "醬油", "米酒"],
        servings: 2,
        ingredients: [
            { name: "豬絞肉", quantity: 300, unit: "克" },
            { name: "醬油", quantity: 3, unit: "湯匙" },
            { name: "米酒", quantity: 1, unit: "湯匙" },
            { name: "冰糖", quantity: 1, unit: "小匙" }
        ],
        steps: "1. 熱鍋爆香蒜末與蔥。 2. 下豬絞肉翻炒，加入醬油、米酒與冰糖小火滷煮。 3. 搭配白飯享用。"
    },
    {
        id: 5,
        title: "三杯雞",
        image: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/FDB222BC-993E-4ACE-9C6A-7AFDB6C1A91C/Derivates/8A0C17A8-6B5F-49AD-A692-DCFC850E0D5D.jpg",
        required: ["雞肉", "九層塔", "醬油"],
        servings: 2,
        ingredients: [
            { name: "雞肉", quantity: 500, unit: "克" },
            { name: "九層塔", quantity: 1, unit: "把" },
            { name: "醬油", quantity: 2, unit: "湯匙" },
            { name: "米酒", quantity: 2, unit: "湯匙" },
            { name: "麻油", quantity: 1, unit: "湯匙" }
        ],
        steps: "1. 先以麻油爆香蒜與薑。 2. 下雞肉煎至表面金黃，加入米酒與醬油燜煮。 3. 起鍋前放入九層塔拌炒即可。"
    },
    {
        id: 6,
        title: "肉燥麵",
        image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/286400/faa881a156690930.jpg",
        required: ["豬絞肉", "醬油", "蔥"],
        servings: 1,
        ingredients: [
            { name: "豬絞肉", quantity: 150, unit: "克" },
            { name: "醬油", quantity: 2, unit: "湯匙" },
            { name: "蔥", quantity: 1, unit: "根" },
            { name: "麵條", quantity: 1, unit: "份" }
        ],
        steps: "1. 炒香蔥蒜，加入豬絞肉炒至變色。 2. 加入醬油與少許水熬煮成肉燥。 3. 淋在煮熟的麵條上即可。"
    },
    {
        id: 7,
        title: "蚵仔煎",
        image: "https://www.kindomliving.com.tw/wp-content/uploads/2022/06/%E5%B1%85%E5%BF%83%E8%AA%8C%E7%B6%B2%E7%AB%992022602-%E9%A3%9F-Comfort-Food-%E8%9A%B5%E4%BB%94%E7%85%8E01.jpg",
        required: ["蚵仔", "地瓜粉", "雞蛋"],
        servings: 2,
        ingredients: [
            { name: "蚵仔", quantity: 150, unit: "克" },
            { name: "地瓜粉", quantity: 3, unit: "湯匙" },
            { name: "雞蛋", quantity: 2, unit: "顆" }
        ],
        steps: "1. 將蚵仔洗淨備用。2. 地瓜粉與水調成糊狀，倒入平底鍋煎成薄餅，加入蚵仔與蛋，煎熟後翻面，淋上甜辣醬。"
    },
    {
        id: 8,
        title: "排骨湯",
        image: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/29F01570-BA4B-46B6-8C26-7CF64B557483/Derivates/9DC51E36-4378-49E2-B2FC-A78C7F4589E6.jpg",
        required: ["排骨", "薑", "蔥"],
        servings: 3,
        ingredients: [
            { name: "排骨", quantity: 500, unit: "克" },
            { name: "薑", quantity: 3, unit: "片" },
            { name: "蔥", quantity: 1, unit: "根" }
        ],
        steps: "1. 排骨川燙去血水。 2. 與薑片、水一起煮滾後小火熬煮，起鍋前加入蔥段調味。"
    }
];


/* DOM 抓取 (querySelector)- 抓取所有需要互動的「HTML 元素」。 */

// 1. 抓取「產生食譜」按鈕
// (querySelector 抓取「被勾選的 (checked)」的「input checkbox」 -> getelementbyid:只能透過id來抓取/queryselector:用各種css選擇器來抓取)
const generateBtn = document.querySelector("#generate-btn");
const ingredientForm = document.querySelector("#ingredient-form");

// 篩選模式與清除按鈕
const filterModeSelect = document.querySelector('#filter-mode');
const clearSelectionsBtn = document.querySelector('#clear-selections');
const recipeResultsContainer = document.querySelector("#recipe-results");

// 抓取整個「詳情」 <article> 容器
const recipeDetailsContainer = document.querySelector("#recipe-details");
const recipeTitleEl = document.querySelector("#recipe-title");
const ingredientListEl = document.querySelector("#ingredient-list");
const recipeStepsEl = document.querySelector("#recipe-steps");
const servingsInput = document.querySelector("#servings");

/* 步驟 2.4：綁定事件監聽 (addEventListener)- 按鈕「動起來」。 */

// (addEventListener -我們監聽表單的 "submit" (提交) 事件，而不是按鈕的 "click" 事件
ingredientForm.addEventListener("submit", function(event) {
    event.preventDefault(); 
    handleRecipeGeneration();
});

// 當使用者勾選/取消任何食材時，立即進行搜尋（自動篩選）
ingredientForm.addEventListener('change', function(e){
    const target = e.target;
    if (target && target.matches('input[type="checkbox"]')){
        // 立即更新結果
        handleRecipeGeneration();
    }
});
// 清除勾選按鈕
if (clearSelectionsBtn) {
    clearSelectionsBtn.addEventListener('click', function(){
        const checkboxes = ingredientForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
        // 隱藏詳情並清空結果
        recipeDetailsContainer.style.display = 'none';
        recipeResultsContainer.innerHTML = '';
    });
}

/* 步驟 2.5：核心功能函式 */
recipeResultsContainer.addEventListener("click", function(event) {
    // 當點擊事件發生時，我們檢查「被點到的元素」 (event.target) 是否「在某張 .card 裡面」
    const clickedButton = event.target.closest(".view-recipe-btn");
    // 如果 clickedButton 存在 (代表真的點在卡片上)
    if (clickedButton) {
        // 3. (重要！) 從這個按鈕「往上」找到它所在的「整張卡片」，才能從卡片上讀取 data-recipe-id
        const card =clickedButton.closest(".card"); 
        const recipeId = parseInt(card.dataset.recipeId);
        showRecipeDetails(recipeId);
    }
});

/* 監聽「份量」輸入框的「即時」變動- "input" 事件會在使用者「每次輸入或更改」時觸發*/
servingsInput.addEventListener("input", function(event) {
    // 當份量變動時，呼叫計算函式
    handleServingsChange(event.target.value);
});

// 按下按鈕後會執行的主要函式
function handleRecipeGeneration() {
    
    // 抓取所有「被勾選的 (checked)」的「input checkbox」
    const checkedInputs = document.querySelectorAll('input[type="checkbox"]:checked');
    
    // 將抓取到的 NodeList (節點列表) 轉換成一個單純的「食材名稱陣列」->  ["雞蛋", "番茄"]
    const selectedIngredients = Array.from(checkedInputs).map(input => input.value);
    
    // 2. 過濾食譜 
    //   兩種模式：
    // - include: 只要配方包含所選食材就顯示（選擇的食材是配方的子集）
    // - haveAll: 僅顯示配方所需食材都在所選範圍內（配方的 required 為所選的子集）
    const mode = filterModeSelect ? filterModeSelect.value : 'haveAll';
    let matchedRecipes = [];
    if (selectedIngredients.length === 0) {
        // 若未選任何食材，回傳空陣列（UI 會提示使用者先選食材）
        matchedRecipes = [];
    } else if (mode === 'include') {
        // include：只要配方「任一」必要食材與使用者選擇有重疊就列出
        matchedRecipes = allRecipes
            .map(recipe => {
                const matchedCount = recipe.required.filter(r => selectedIngredients.includes(r)).length;
                const score = matchedCount / recipe.required.length; // 比例：滿足配方必要食材的比例
                return Object.assign({}, recipe, { _matchedCount: matchedCount, _score: score });
            })
            .filter(r => r._matchedCount > 0)
            .sort((a, b) => b._score - a._score || b._matchedCount - a._matchedCount);
    } else {
        // haveAll（原本行為）：配方所需的每個必要食材都必須在使用者所選清單中
        matchedRecipes = allRecipes
            .map(recipe => {
                const matchedCount = recipe.required.filter(r => selectedIngredients.includes(r)).length;
                const score = matchedCount / recipe.required.length;
                return Object.assign({}, recipe, { _matchedCount: matchedCount, _score: score });
            })
            .filter(r => r.required.every(req => selectedIngredients.includes(req)))
            .sort((a, b) => b._score - a._score || b._matchedCount - a._matchedCount);
    }

    // 3. 顯示結果到畫面上
    displayRecipes(matchedRecipes, selectedIngredients);

    // 產生新食譜時，先把舊的詳情隱藏起來
    recipeDetailsContainer.style.display = "none";
}

// 「顯示食譜卡片」的函式
function displayRecipes(recipes, selectedIngredients = []) {
    
    // 清空上一次的搜尋結果
    recipeResultsContainer.innerHTML = "";
    // 檢查是否有找到食譜
    if (recipes.length === 0) {
        // 如果使用者未選任何食材，提示先選擇；否則顯示找不到
        if (!selectedIngredients || selectedIngredients.length === 0) {
            recipeResultsContainer.innerHTML = '<p class="text-muted">請先選擇食材以開始篩選。</p>';
        } else {
            recipeResultsContainer.innerHTML = '<p class="text-muted">抱歉，找不到符合您食材的食譜...</p>';
        }
        return; 
    }

    //透過迴圈，找所有的食譜，並「動態建立」HTML 元素 : createElement
    recipes.forEach(recipe => {

        // 建立最外層的 'col' 
        const colDiv = document.createElement("div");
        colDiv.className = "col"; // 加上 Bootstrap 的 class

        // 建立 'card' 
        const cardDiv = document.createElement("div");
        cardDiv.className = "card h-100 shadow-sm";
        //  我們把食譜的 'id' 存放在 HTML 屬性中，方便之後抓取
        cardDiv.dataset.recipeId = recipe.id;
        // 建立 'img' 並增加錯誤回退機制
        const img = document.createElement("img");
        img.src = recipe.image;
        img.className = "card-img-top";
        img.alt = recipe.title + " 圖片";
        // 使用 lazy loading 減少初次載入負擔
        img.loading = 'lazy';
        // 固定寬高以避免 layout shift (與我們的示意圖尺寸一致)
        img.width = 600;
        img.height = 400;
        // 若遠端圖片載入失敗，改用穩定的 placeholder 並避免無限回退
        img.onerror = function() {
            try {
                if (!this.dataset.fallback) {
                    this.dataset.fallback = '1';
                    // 使用文字化的 placeholder 顯示正確內容（食譜標題）
                    this.src = 'https://via.placeholder.com/600x400?text=' + encodeURIComponent(recipe.title);
                }
            } catch (e) {
                // 若 encodeURIComponent 之類發生錯誤，最後退回一般 placeholder
                this.src = 'https://via.placeholder.com/600x400?text=Recipe';
            }
        };
        // 建立 'card-body'
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body d-flex flex-column";
        // 建立 'h5' (標題)
        const titleH5 = document.createElement("h5");
        titleH5.className = "card-title";
        titleH5.textContent = recipe.title; 
        // 建立食材標籤區塊 (取代簡單描述)，並將匹配的食材標示高亮
        const ingWrap = document.createElement('div');
        ingWrap.className = 'mb-2';
        recipe.required.forEach(ing => {
            const span = document.createElement('span');
            span.className = 'badge bg-light text-dark me-1 mb-1';
            span.textContent = ing;
            if (selectedIngredients && selectedIngredients.includes(ing)) {
                span.classList.add('match-highlight');
            }
            ingWrap.appendChild(span);
        });
        // 如果我們有計算匹配分數，就顯示在 meta 中
        const meta = document.createElement('div');
        meta.className = 'meta text-muted mb-2';
        if (typeof recipe._score === 'number') {
            meta.textContent = `符合率：${Math.round(recipe._score * 100)}% (${recipe._matchedCount}/${recipe.required.length})`;
        } else {
            meta.textContent = `${recipe.required.length} 種必要食材`;
        }
        // 動態建立「查看詳情」按鈕
        const viewButton = document.createElement("button");
        viewButton.className = "btn btn-outline-primary btn-sm mt-auto view-recipe-btn";
        viewButton.textContent = "查看詳情";


    // 組合元素
    // card-body 裡面放入 h5、meta、以及食材標籤
    cardBodyDiv.appendChild(titleH5);
    cardBodyDiv.appendChild(meta);
    cardBodyDiv.appendChild(ingWrap);
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

//顯示食譜詳情的函式
function showRecipeDetails(recipeId) {
    // 1. 根據 ID，從 'allRecipes' 陣列中找出完整的食譜物件.find() 是 JS 陣列方法，會回傳第一個符合條件的項目
    const recipe = allRecipes.find(r => r.id === recipeId);
    if (!recipe) {
        console.error("找不到食譜！ ID:", recipeId);
        return;
    }
    // 將食譜資料，填入到「詳情」區塊的 HTML 元素中
    recipeTitleEl.textContent = recipe.title;
    servingsInput.dataset.baseServings = recipe.servings;
    servingsInput.dataset.baseIngredients = JSON.stringify(recipe.ingredients);
    servingsInput.value = recipe.servings;

    // 動態產生「食材清單」的 HTML -> 這裡我們使用 .map() 和 .join()，這是產生 HTML 列表最快的方式
    const ingredientHtml = recipe.ingredients
        .map(item => {
            // `<li>...</li>` 是 HTML 的列表項目
            return `<li>${item.name}： ${item.quantity} ${item.unit}</li>`;
        })
        .join(""); // 用 .join("") 把陣列裡的所有 <li> 字串黏合起來
    ingredientListEl.innerHTML = ingredientHtml;

    // 填入步驟，用 replaceAll 把換行符號 \n 轉成 <br> (HTML換行)，如果有的話
    recipeStepsEl.innerHTML = recipe.steps.replaceAll("\n", "<br>");
    recipeDetailsContainer.style.display = "block";
    recipeDetailsContainer.scrollIntoView({ behavior: "smooth" });
}

/* 處理份量變更與即時計算的函式*/
function handleServingsChange(newServings) {
    // 1. 取得儲存在 input 上的「原始資料」(注意) 我們必須把字串轉回「數字」和「物件」
    const baseServings = Number(servingsInput.dataset.baseServings);
    const baseIngredients = JSON.parse(servingsInput.dataset.baseIngredients);

    // 檢查使用者輸入是否合法 (例如：不能是 0 或 負數)
    if (newServings < 1 || !newServings) {
        newServings = 1; // 強制設為 1
        servingsInput.value = 1; // 更新輸入框的顯示
    }

    // 計算「比例」，根據「比例」，動態產生新的食材列表 HTML
    const ratio = newServings / baseServings;
    const newIngredientHtml = baseIngredients
        .map(item => {
            // 原始數量 * 比例 = 新數量
            let newQuantity = item.quantity * ratio;
            // 處理小數點，四捨五入到小數點後 1 位
            newQuantity = Math.round(newQuantity * 10) / 10;
            return `<li>${item.name}： ${newQuantity} ${item.unit}</li>`;
        })
        .join("");
    ingredientListEl.innerHTML = newIngredientHtml;
}

/* 頁面切換與表單驗證 */
const pageGenerator = document.querySelector("#page-generator");
const pageShare = document.querySelector("#page-share");
const navBtnHome = document.querySelector("#nav-btn-home");
const navBtnShare = document.querySelector("#nav-btn-share");

navBtnHome.addEventListener("click", function() {
    // 顯示「產生器」頁面
    pageGenerator.style.display = "block";
    // 隱藏「分享」頁面
    pageShare.style.display = "none";
    // 更新按鈕的 'active' 狀態
    navBtnHome.classList.add("active");
    navBtnShare.classList.remove("active");
});

navBtnShare.addEventListener("click", function() {
    pageGenerator.style.display = "none";
    pageShare.style.display = "block";
    navBtnHome.classList.remove("active");
    navBtnShare.classList.add("active");
});


// --- 抓取「分享表單」相關的 DOM 元素 ---
// 表單驗證相關
const shareForm = document.querySelector("#share-form");

// 授權條款 Modal 相關
const consentCheck = document.querySelector("#consent-check"); // 外部 checkbox
const openTermsLink = document.querySelector("#open-terms-link"); // "授權條款" 連結
const termsModalEl = document.querySelector("#termsModal"); // Modal 元素
const agreeToTermsBtn = document.querySelector("#agree-to-terms-btn"); // Modal 內的「同意」按鈕

// 取得 Bootstrap Modal 的「JS 實體」 (必須手動 new 一個，因為這個 Modal 是在 body 結尾)
const termsModal = new bootstrap.Modal(termsModalEl);
//---  處理「分享表單」的提交 (驗證) ---
shareForm.addEventListener("submit", function(event) {
    event.preventDefault();
    event.stopPropagation();

    // 抓取圖片 URL 欄位 
    const imageUrlInput = document.querySelector("#recipe-image-input"); 
    imageUrlInput.setCustomValidity("");

    // 檢查規則
    if (imageUrlInput.value) { // 僅在有輸入值時才檢查
        const url = imageUrlInput.value;
        
        // 正則表達式：檢查結尾是否為圖片格式
        const imageRegex = /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i; 
        if (!imageRegex.test(url)) {
            // 設定自訂錯誤訊息 -->  .checkValidity() 自動變為 false
            imageUrlInput.setCustomValidity("網址格式不符，必須以 .jpg, .png, .gif 等圖片格式結尾。");
        }
    }

    const wasDisabled = consentCheck.disabled;
    if (wasDisabled) {
        consentCheck.disabled = false; // 暫時解除禁用，以便 checkValidity() 檢查
    }

    // 檢查 HTML5 驗證 (required, minlength, type="url", 和 checkbox 的 required)
    if (!shareForm.checkValidity()) {
        // 驗證失敗 (例如：必填沒填)
        // (do nothing here)
    } else {
        // 驗證成功 (所有欄位都通過)
        
        alert("分享成功，感謝您的貢獻！");
        shareForm.reset(); 
        consentCheck.disabled = true;
        shareForm.classList.remove("was-validated");
        // (UX 優化) 提交成功後，自動「點擊」首頁按鈕，切換回首頁
        navBtnHome.click(); 
        return; 
    }

    // 如果驗證失敗，就在這裡加上 'was-validated' 來顯示錯誤訊息
    shareForm.classList.add("was-validated");
    if (wasDisabled) {
        consentCheck.disabled = true; 
    }
});


// --- 處理「授權條款 Modal」的互動邏輯 ---

//  監聽「授權條款」連結的點擊
openTermsLink.addEventListener("click", function() {
    // 打開 Modal
    termsModal.show();
});

// 監聽 Modal 內部「我已閱讀並同意」按鈕的點擊
agreeToTermsBtn.addEventListener("click", function() {
    // 讓外部的 checkbox 被「勾選」
    consentCheck.checked = true;  
    // 讓外部的 checkbox 變成「可操作」
    //(解除 'disabled' 狀態，這樣 HTML5 的 'required' 驗證才能運作)
    consentCheck.disabled = false;
    // 關閉 Modal
    termsModal.hide();
});

// 當表單重設時 (例如成功提交後)，也順便把 checkbox 鎖回
shareForm.addEventListener("reset", function() {
    consentCheck.disabled = true;
    shareForm.classList.remove("was-validated");
    const imageUrlInput = document.querySelector("#recipe-image-input"); 
    imageUrlInput.setCustomValidity("");
});
    