# MariaDB Docker 快速部署環境

本專案提供一個基於 Docker 的 MariaDB 開發環境，適合用於：
- 資料庫學習與練習
- SQL 查詢測試
- 資料庫管理培訓

## 特色
- 一鍵部署完整的 MariaDB 環境
- 自動導入測試資料集
- 內建 phpMyAdmin 管理介面
- 持久化資料存儲

## 資料來源
測試資料採用 [datacharmer/test_db](https://github.com/datacharmer/test_db) 資料庫範例

## 環境需求
- Docker
- Docker Compose

## 快速開始

1. 環境設定
   ```bash
   cp .env.example .env
   ```
   編輯 `.env` 文件設定：
   - DB_PASSWORD：資料庫密碼
   - DB_PORT：連接埠（預設 3306）

2. 啟動環境
   ```bash
   docker-compose up -d
   ```

3. 存取方式
   - **MariaDB**
     - 主機：localhost
     - 連接埠：3306（可在 .env 中修改）
     - 帳號：root
     - 密碼：您設定的 DB_PASSWORD

   - **phpMyAdmin**
     - 網址：http://localhost:8080
     - 帳號：root
     - 密碼：您設定的 DB_PASSWORD

4. 重新建立資料庫
   如需重新建立資料庫，請執行：
   ```bash
   docker compose down -v
   ```
   這將移除所有容器和資料卷，之後重新執行 `docker-compose up -d` 即可重新建立乾淨的資料庫環境。

## 資料庫架構
導入的測試資料包含以下表格：
- employees：員工基本資料
- departments：部門資訊
- dept_emp：員工部門關聯
- dept_manager：部門主管資訊
- titles：職稱記錄
- salaries：薪資記錄

## 使用建議
- 適合用於 SQL 學習與教學
- 可用於資料庫效能測試

## 授權說明
- 本專案程式碼採用 MIT 授權
- 測試資料集來自 [datacharmer/test_db](https://github.com/datacharmer/test_db)
