# 網路程式設計 - 會員註冊表單 (Lab 實作)

## 驗證規則與錯誤條件
自訂錯誤條件（Constraint Rules）如下：
### 1. 姓名 (Name)
* **規則：** `valueMissing` (必填)
* **錯誤訊息：** "姓名為必填欄位"
### 2. Email
* **規則：** `valueMissing` (必填)
* **錯誤訊息：** "Email 為必填欄位"
* **規則：** `typeMismatch` (格式不符)
* **錯誤訊息：** "請輸入有效的 Email 格式 (例如: user@example.com)"
### 3. 手機 (Phone)
* **規則：** `valueMissing` (必填)
* **錯誤訊息：** "手機為必填欄位"
* **規則：** `patternMismatch` (不符合 `pattern="[0-9]{10}"`)
* **錯誤訊息：** "手機號碼必須是 10 碼數字"
### 4. 密碼 (Password)
* **規則：** `valueMissing` (必填)
* **錯誤訊息：** "密碼為必填欄位"
* **規則：** `tooShort` (不符合 `minlength="8"`)
* **錯誤訊息：** "密碼長度至少需要 8 碼"
* **規則：** 自訂 Regex (`!/^(?=.*[A-Za-z])(?=.*\d)/`)
* **錯誤訊息：** "密碼必須包含至少一個英文和一個數字"
### 5. 確認密碼 (Password Confirm)
* **規則：** `valueMissing` (必填)
* **錯誤訊息：** "請再次輸入密碼"
* **規則：** 自訂邏輯 (`field.value !== passwordField.value`)
* **錯誤訊息：** "兩次輸入的密碼不一致"
### 6. 興趣標籤 (Interests)
* **規則：** 自訂邏輯 (選中數量 `checkedCount < 1`)
* **錯誤訊息：** "請至少選擇 1 個興趣標籤"
### 7. 服務條款 (Terms)
* **規則：** `valueMissing` (必填，透過 `!field.checked` 判斷)
* **錯誤訊息：** "您必須同意服務條款才能註冊"


## 加分項記錄
### 密碼強度即時顯示
* **功能：** 在密碼欄位下方新增了一個即時更新的強度條與提示文字。
* **實作：**
    * 撰寫 `checkPasswordStrength()` 函式，根據密碼長度、大小寫、數字、特殊符號的組合計算強度分數。
    * 將強度分為「弱 (長度不足)」、「中」、「強」三個等級。
    * 撰寫 `updatePasswordStrength()` 函式，動態更新 CSS `class`  與提示文字 `textContent`。
