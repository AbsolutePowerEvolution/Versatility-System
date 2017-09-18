# 系務系統

## OAuth

### 請求

目標網址

    https://cms.cs.ccu.edu.tw/api/auth/oauth

必要參數

 - redirect_uri：驗證後導向的網址，如 `https://example.com/oauth/callback`

回傳參數

 - token：用於驗證階段的 token


### 驗證

目標網址

	https://cms.cs.ccu.edu.tw/api/auth/oauth/{token}

回傳資料的格式為 json，分為成功與失敗兩種狀態，對應內容如下

 - 成功

		data：物件，使用者資料
			student_id：學號
			name：姓名
			email：信箱
		status：狀態代碼
		
		e.g. 
			{
				"data":{
					"student_id":"400000000",
					"name":"測試",
					"email":"mail@example.com"
				},
				"status":200
			}


 - 失敗

		errors：陣列，錯誤資訊
		status：狀態代碼
		
		e.g. 
			{
				"errors":["messages"],
				"status":123
			}

### 範例

 1. A 網站（www.example.com）發出請求，網址為  `https://cms.cs.ccu.edu.tw/api/auth/oauth?redirect_uri=http://www.example.com/oauth/callback.php`
 2. 使用者登入成功後將導向 `http://www.example.com/oauth/callback.php?token=exampleToken`
 3. 此時 A 網站需使用此 token 向伺服器取得使用者身份，網址為 `https://cms.cs.ccu.edu.tw/api/auth/oauth/exampleToken`
 4. 接著，A 網站即可從回傳的內容判斷是否驗證成功
