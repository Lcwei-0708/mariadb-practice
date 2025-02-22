# MariaDB 容器化練習環境

本專案將常用的 MariaDB 練習資料庫容器化，透過 Docker 技術實現：
- 快速建立完整的資料庫學習環境
- 標準化的部署流程，避免環境設定問題
- 適合 SQL 教學與資料庫效能測試使用

## 特色
- 一鍵部署完整的 MariaDB 環境
- 自動導入測試資料集
- 內建 phpMyAdmin 管理介面
- 持久化資料存儲

## 資料來源
測試資料採用 [datacharmer/test_db](https://github.com/datacharmer/test_db) 範例資料庫

## 快速開始

### 1. Clone專案
- 方法 1：Clone時包含所有子模組   
   ```bash
   git clone --recursive https://github.com/Lcwei-0708/mariadb-practice.git
   ```

   ⚠️ 注意：如果不使用 `--recursive` 參數Clone，test_db 資料將無法正確下載，導致環境無法正常運作。



- 方法 2：分步驟Clone
   ```bash
   git clone https://github.com/Lcwei-0708/mariadb-practice.git
   cd mariadb-practice-env
   git submodule init
   git submodule update
   ```

### 2. 環境設定
   ```bash
   cp .env.example .env
   ```
   編輯 `.env` 文件設定：
   - 資料庫相關
      - DB_PASSWORD：資料庫密碼（預設 123456）
      - DB_PORT：連接埠（預設 3306）
      - DB_USER： 帳號（預設 root）
   - 前端相關
      - FRONTEND_PORT： 連接埠（預設 3000）
   - 後端相關
      - BACKEND_PORT： 連接埠（預設 5000）

### 3. 啟動環境
   ```bash
   docker compose up -d
   ```

### 4. 存取方式
   - **MariaDB**
     - 主機：localhost
     - 連接埠：3306（可在 .env 中修改）
     - 帳號：root（可在 .env 中修改）
     - 密碼：您設定的 DB_PASSWORD（可在 .env 中修改）

   - **phpMyAdmin**
     - 網址：http://localhost:8080
     - 帳號：root（可在 .env 中修改）
     - 密碼：您設定的 DB_PASSWORD（可在 .env 中修改）

## 重新建立資料庫
如果需要重新建立資料庫，請依照以下步驟操作：

### 1. 停止並移除現有容器與資料卷
   ```bash
   docker compose down -v
   ```

### 2. 重新啟動環境
   ```bash
   docker compose up -d
   ```

系統會自動重新建立資料庫並導入測試資料。

## 資料庫架構
導入的測試資料包含以下表格：
- employees：員工基本資料
- departments：部門資訊
- dept_emp：員工部門關聯
- dept_manager：部門主管資訊
- titles：職稱記錄
- salaries：薪資記錄