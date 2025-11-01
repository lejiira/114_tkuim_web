// 負責所有的驗證邏輯、事件處理和 DOM 操作。

//DOM 內容完全載入後再執行內容
document.addEventListener('DOMContentLoaded',() => {
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

    // [新增] 抓取密碼強度條相關元素
    const passwordStrengthBar = document.getElementById('password-strength-bar');
    const passwordStrengthText = document.getElementById('password-strength-text');

    //以下欄位皆須及時驗證
    const fieldsToValidate=[
        nameField,emailField,phoneField,passwordField,passwordConfirmField
    ]

    //監聽最終目標(submit)
    form.addEventListener('submit',(event) => 
    {
        event.preventDefault();
        //觸發所有欄位的 'blur' 標記，確保 submit 時所有欄位都會被驗證
        fieldsToValidate.forEach(field => field.dataset.blurred='true');
        //執行所有驗證
        const isNameValid = validateField(nameField);
        const isEmailValid = validateField(emailField);
        const isPhoneValid = validateField(phoneField);
        const isPasswordValid = validateField(passwordField);
        const isPasswordConfirmValid = validateField(passwordConfirmField);
        const isInterestsValid = validateInterests();
        const isTermsValid = validateTerms();
        //確認是否通過
        const isFormValid = isNameValid && isEmailValid && isPhoneValid &&
                            isPasswordValid && isPasswordConfirmValid &&
                            isInterestsValid && isTermsValid; 
        if(isFormValid){
            submitBtn.disabled = true;
            submitBtn.textContent = '註冊中...';
            setTimeout(() => {
                // 隱藏表單
                form.style.display = 'none';
                successMessage.style.display = 'block';
                // (真實情境中，這裡會是 fetch() 或 axios.post() 的 .then() 回呼)
                console.log('表單送出成功');

            }, 1000); // 模擬 1 秒的網路延遲
        }  
        else{
            console.log('表單驗證失敗'); 
            const fieldGroups = [
                { field: nameField, isValid: isNameValid },
                { field: emailField, isValid: isEmailValid },
                { field: phoneField, isValid: isPhoneValid },
                { field: passwordField, isValid: isPasswordValid },
                { field: passwordConfirmField, isValid: isPasswordConfirmValid },
                { field: interestGroup.querySelector('input[type="checkbox"]'), isValid: isInterestsValid },
                { field: termsField, isValid: isTermsValid }
            ];
            //找第一個isValid
            for (const group of fieldGroups) {
                if (!group.isValid) {
                    group.field.focus();
                    break; // 找到第一個就停止
                }
            }
        }    
    })

    //表單送出檢查所有欄位 --> 建立輔助工具(函式)，因為每個動作都會重複多次
    // -> showError(field,message)顯示錯誤 | clearError(field)清除錯誤
    const showError =(field,message) => 
    {
        const errorElement =document.getElementById(field.getAttribute('aria-describedby').split(' ')[0]);//用 .split(' ')[0] 只抓取第一個 ID
        if(errorElement){
            errorElement.textContent=message;
            errorElement.classList.add('active');// 顯示錯誤 (參見 CSS)
        }
        field.classList.add('invalid');// 幫欄位加上紅色框線 (參見 CSS)
    };

    const clearError =(field) => 
    {
        const errorElement = document.getElementById(field.getAttribute('aria-describedby').split(' ')[0]);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('active'); 
        }
        field.classList.remove('invalid'); 
        field.setCustomValidity(''); 
    };
    
    //[新增] 檢查密碼強度
    const checkPasswordStrength = (password) => {
        if (password.length === 0) {
            return { text: '', className: '' }; // 沒有輸入
        }

        let score = 0;
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*]/.test(password); 

        if (password.length >= 8) score++;
        if (hasLower && hasUpper) score++; 
        if (hasNumber) score++;
        if (hasSymbol) score++;
        
        if (password.length < 8) {
            return { text: '弱 (長度不足)', className: 'weak' };
        }
        if (score <= 2) {
            // 長度夠，但組合單純
            return { text: '中', className: 'medium' };
        }
        // 組合複雜
        return { text: '強', className: 'strong' };
    };
    // [新增]更新密碼強度條的 UI
    const updatePasswordStrength = (password) => {
        const strength = checkPasswordStrength(password);

        // 先移除所有舊的 class
        passwordStrengthBar.classList.remove('weak', 'medium', 'strong');
        passwordStrengthText.classList.remove('weak', 'medium', 'strong');

        if (strength.className) {
            passwordStrengthBar.classList.add(strength.className);
            passwordStrengthText.classList.add(strength.className);
        }
        passwordStrengthText.textContent = strength.text;
    };


    //表單送出檢查所有欄位 --> 撰寫驗證規則，將(每個欄位的驗證邏輯，包裝成獨立函式) --> 每個函式做的事:檢查對應欄位，錯了呼叫showError()
    const validateField =(field) => 
    {
        clearError(field);// 驗證前先清除舊錯誤
        let customMessage='';
        const validity =field.validity;//定義過validity 這個變數:  獲取欄位的 Constraint Validation API 狀態

        //依不同欄位，驗證規則
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
    if(customMessage){// 如果有客製化錯誤訊息，就設定它並顯示
        field.setCustomValidity(customMessage);
        showError(field,customMessage);
        return false;
    }return true;
    }

    const validateInterests = () => //驗證「興趣標籤」複選框群組
    {
        const checkedCount =interestGroup.querySelectorAll('input[type="checkbox"]:checked').length;
        const fieldset = interestGroup.closest('fieldset');
        if(checkedCount<1){ //有錯
            const errorElement = document.getElementById(fieldset.getAttribute('aria-describedby'));
            if (errorElement) {
                errorElement.textContent = '請至少選擇 1 個興趣標籤';
                errorElement.classList.add('active');
            }
            fieldset.classList.add('invalid'); 
            return false;
        }else{ //沒錯
            const errorElement = document.getElementById(fieldset.getAttribute('aria-describedby'));
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('active');
            }
            fieldset.classList.remove('invalid');
            return true;
        }
    }

    const validateTerms =()=> //驗證「服務條款」是否勾選
    {
        if (!termsField.checked) {
            showError(termsField, '您必須同意服務條款才能註冊');
            return false;
        } else {
            clearError(termsField);
            return true;
        }
    }

    //優化體驗:
    //--> 監聽 'blur' (失焦): 當使用者離開欄位時，啟用驗證
    //    監聽 'input' (輸入): 一旦欄位被 'blur' 過 (已觸發過錯誤)，就開始即時驗證
    fieldsToValidate.forEach(field =>
    {
        field.addEventListener('blur', () => {
            field.dataset.blurred = 'true'; 
            validateField(field); //有被blur過了，才會開啟驗證
    });
    
    field.addEventListener('input', () => {
            // 只有在 'blur' 過後才在 'input' 時即時驗證
            if (field.dataset.blurred === 'true') {
                validateField(field);
            }
            
            //只要是密碼欄位在輸入
            if (field.id === 'password') {
                // (1) 立刻更新密碼強度條！
                updatePasswordStrength(field.value);

                // (2) 處理特殊連動：如果正在改 '密碼' 欄位，'確認密碼' 欄位也需要重新驗證
                if (passwordConfirmField.value.length > 0) {
                     if (passwordConfirmField.dataset.blurred === 'true') {//// 如果確認密碼欄位已經 'blur' 過，才即時觸發它的驗證
                        validateField(passwordConfirmField);
                    }
                }
            }
            });
    });

    //透過closest() 檢查觸發事件的是否真的是 checkbox
    interestGroup.addEventListener('change',(event) =>
    {
        if (event.target.matches('input[type="checkbox"]')) {
            const label = event.target.closest('label');
            if (label) {
                label.classList.toggle('checked', event.target.checked);
            }
            // 每次變動都重新驗證 "至少選 1 個" 的規則
            validateInterests();
        }
    })
    
    termsField.addEventListener('change', validateTerms);
    
}
)