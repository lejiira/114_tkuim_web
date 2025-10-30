// 等待 DOM 內容完全載入後再執行腳本
document.addEventListener('DOMContentLoaded', () => {

    // 1. 獲取所有需要的 DOM 元素
    const form = document.getElementById('signup-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const passwordField = document.getElementById('password');
    const passwordConfirmField = document.getElementById('password-confirm');
    const interestGroup = document.getElementById('interest-group');
    const termsField = document.getElementById('terms');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');

    // 將需要即時驗證的欄位集中管理
    const fieldsToValidate = [
        nameField,
        emailField,
        phoneField,
        passwordField,
        passwordConfirmField
    ];

    // 2. ==================
    //    輔助函式 (Helpers)
    // ==================

    /**
     * 顯示錯誤訊息
     * @param {HTMLInputElement} field - 目標輸入欄位
     * @param {string} message - 要顯示的錯誤訊息
     */
    const showError = (field, message) => {
        // 透過 aria-describedby 找到對應的錯誤訊息 <p> 元素
        const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('active'); // 顯示錯誤 (參見 CSS)
        }
        field.classList.add('invalid'); // 幫欄位加上紅色框線 (參見 CSS)
    };

    /**
     * 清除錯誤訊息
     * @param {HTMLInputElement} field - 目標輸入欄位
     */
    const clearError = (field) => {
        // 透過 aria-describedby 找到錯誤 <p> 元素
        const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('active'); // 隱藏錯誤
        }
        field.classList.remove('invalid'); // 移除紅色框線
        field.setCustomValidity(''); // (重要) 清除自訂驗證狀態，否則表單會一直處於 invalid
    };


    // 3. ==================
    //    核心驗證邏輯
    // ==================

    /**
     * 驗證單一文字/密碼/Email 等欄位
     * @param {HTMLInputElement} field - 要驗證的欄位
     * @returns {boolean} - true: 通過, false: 未通過
     */
    const validateField = (field) => {
        clearError(field); // 驗證前先清除舊錯誤

        const validity = field.validity; // 獲取欄位的 Constraint Validation API 狀態
        let customMessage = '';

        // 依據欄位 ID 進行客製化驗證
        switch (field.id) {
            case 'name':
                if (validity.valueMissing) {
                    customMessage = '姓名為必填欄位';
                }
                break;
            
            case 'email':
                if (validity.valueMissing) {
                    customMessage = 'Email 為必填欄位';
                } else if (validity.typeMismatch) {
                    customMessage = '請輸入有效的 Email 格式 (例如: user@example.com)';
                }
                break;

            case 'phone':
                if (validity.valueMissing) {
                    customMessage = '手機為必填欄位';
                } else if (validity.patternMismatch) {
                    // pattern="[0-9]{10}"
                    customMessage = '手機號碼必須是 10 碼數字';
                }
                break;
            
            case 'password':
                if (validity.valueMissing) {
                    customMessage = '密碼為必填欄位';
                } else if (validity.tooShort) {
                    // minlength="8"
                    customMessage = '密碼長度至少需要 8 碼';
                } else if (!/^(?=.*[A-Za-z])(?=.*\d)/.test(field.value)) {
                    // 自訂 Regex: 至少一個英文字母和一個數字
                    customMessage = '密碼必須包含至少一個英文和一個數字';
                }
                break;
            
            case 'password-confirm':
                if (validity.valueMissing) {
                    customMessage = '請再次輸入密碼';
                } else if (field.value !== passwordField.value) {
                    customMessage = '兩次輸入的密碼不一致';
                }
                break;
        }

        // 如果有客製化錯誤訊息，就設定它並顯示
        if (customMessage) {
            field.setCustomValidity(customMessage); // (重要) 透過 API 設定錯誤
            showError(field, customMessage);
            return false;
        }

        return true; // 通過驗證
    };

    /**
     * 驗證「興趣標籤」複選框群組
     * @returns {boolean} - true: 通過, false: 未通過
     */
    const validateInterests = () => {
        const checkedCount = interestGroup.querySelectorAll('input[type="checkbox"]:checked').length;
        const fieldset = interestGroup.closest('fieldset'); // 找到 fieldset 來操作 class 和 aria

        if (checkedCount < 1) {
            // 這裡的 showError 稍作修改，因為 fieldset 不是 input
            const errorElement = document.getElementById(fieldset.getAttribute('aria-describedby'));
            if (errorElement) {
                errorElement.textContent = '請至少選擇 1 個興趣標籤';
                errorElement.classList.add('active');
            }
            fieldset.classList.add('invalid'); // 讓 fieldset 也加上錯誤提示 (可選)
            return false;
        } else {
            // 清除錯誤
            const errorElement = document.getElementById(fieldset.getAttribute('aria-describedby'));
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('active');
            }
            fieldset.classList.remove('invalid');
            return true;
        }
    };

    /**
     * 驗證「服務條款」是否勾選
     * @returns {boolean} - true: 通過, false: 未通過
     */
    const validateTerms = () => {
        if (!termsField.checked) {
            showError(termsField, '您必須同意服務條款才能註冊');
            return false;
        } else {
            clearError(termsField);
            return true;
        }
    };


    // 4. ==================
    //    事件監聽器綁定
    // ==================

    // 4.1 即時驗證 (Blur & Input)
    // 監聽 'blur' (失焦): 當使用者離開欄位時，啟用驗證
    // 監聽 'input' (輸入): 一旦欄位被 'blur' 過 (已觸發過錯誤)，就開始即時驗證
    fieldsToValidate.forEach(field => {
        // 標記欄位是否被 'blur' 過
        field.addEventListener('blur', () => {
            field.dataset.blurred = 'true'; // 自訂 data-* 屬性來標記
            validateField(field);
        });

        field.addEventListener('input', () => {
            // 只有在 'blur' 過後才在 'input' 時即時驗證
            if (field.dataset.blurred === 'true') {
                validateField(field);
            }
            
            // 特殊連動：如果正在改 '密碼' 欄位，'確認密碼' 欄位也需要重新驗證
            if (field.id === 'password' && passwordConfirmField.value.length > 0) {
                // 如果確認密碼欄位已經 'blur' 過，才即時觸發它的驗證
                if (passwordConfirmField.dataset.blurred === 'true') {
                    validateField(passwordConfirmField);
                }
            }
        });
    });

    // 4.2 事件委派 (Event Delegation) - 興趣標籤
    // 我們不在 4 個 checkbox 上都綁監聽器，而是只在它們的父層 (interest-group) 綁
    interestGroup.addEventListener('change', (event) => {
        // 檢查觸發事件的是否真的是 checkbox
        if (event.target.matches('input[type="checkbox"]')) {
            const label = event.target.closest('label');
            if (label) {
                // 切換 .checked 樣式 (CSS)
                label.classList.toggle('checked', event.target.checked);
            }
            // 每次變動都重新驗證 "至少選 1 個" 的規則
            validateInterests();
        }
    });

    // 4.3 服務條款
    // 這個 checkbox 比較單純，直接綁 'change' 事件
    termsField.addEventListener('change', validateTerms);


    // 4.4 送出攔截 (Submit)
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // (重要) 攔截表單的預設送出行為

        // 觸發所有欄位的 'blur' 標記，確保 submit 時所有欄位都會被驗證
        fieldsToValidate.forEach(field => field.dataset.blurred = 'true');

        // 執行所有驗證
        const isNameValid = validateField(nameField);
        const isEmailValid = validateField(emailField);
        const isPhoneValid = validateField(phoneField);
        const isPasswordValid = validateField(passwordField);
        const isPasswordConfirmValid = validateField(passwordConfirmField);
        const isInterestsValid = validateInterests();
        const isTermsValid = validateTerms();

        // 檢查是否所有驗證都通過
        const isFormValid = isNameValid && isEmailValid && isPhoneValid &&
                            isPasswordValid && isPasswordConfirmValid &&
                            isInterestsValid && isTermsValid;

        if (isFormValid) {
            // 5. ==================
            //    模擬成功送出 (防重送)
            // ==================
            
            // 禁用按鈕並顯示 Loading
            submitBtn.disabled = true;
            submitBtn.textContent = '註冊中...';

            // 模擬 API 請求 (延遲 1 秒)
            setTimeout(() => {
                // 隱藏表單
                form.style.display = 'none';
                // 顯示成功訊息
                successMessage.style.display = 'block';

                // (真實情境中，這裡會是 fetch() 或 axios.post() 的 .then() 回呼)
                console.log('表單送出成功');

            }, 1000); // 模擬 1 秒的網路延遲

        } else {
            // 6. ==================
            //    驗證失敗，聚焦第一個錯誤欄位
            // ==================
            
            console.log('表單驗證失敗');

            // 建立一個檢查順序的陣列
            // 注意：我們放的是 "欄位" 或 "群組的代表元素"
            const fieldGroups = [
                { field: nameField, isValid: isNameValid },
                { field: emailField, isValid: isEmailValid },
                { field: phoneField, isValid: isPhoneValid },
                { field: passwordField, isValid: isPasswordValid },
                { field: passwordConfirmField, isValid: isPasswordConfirmValid },
                // 對於 checkbox 群組，我們聚焦到第一個 checkbox
                { field: interestGroup.querySelector('input[type="checkbox"]'), isValid: isInterestsValid },
                { field: termsField, isValid: isTermsValid }
            ];

            // 尋找第一個 'isValid' 為 false 的元素並聚焦
            for (const group of fieldGroups) {
                if (!group.isValid) {
                    group.field.focus();
                    break; // 找到第一個就停止
                }
            }
        }
    });
});