#!/bin/bash

# 檢查環境變數
echo "檢查環境變數..."
echo "MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}"

# 在背景啟動 MariaDB
docker-entrypoint.sh mysqld &

# 等待 MySQL 服務就緒
echo "等待 MySQL 服務就緒..."
until mysqladmin ping -h db -u"root" -p"${MYSQL_ROOT_PASSWORD}" --silent; do
    echo "等待中..."
    sleep 5  # 增加等待時間
done

# 設定 root 使用者權限
mysql -h db -u"root" -p"${MYSQL_ROOT_PASSWORD}" <<-EOSQL
    ALTER USER 'root'@'%' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';
    GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
EOSQL

echo "MySQL 服務已就緒"

# 檢查 employees 資料庫是否存在
echo "檢查資料庫是否存在..."
DB_EXISTS=$(mysql -h localhost -u"root" -p"${MYSQL_ROOT_PASSWORD}" -e "SHOW DATABASES LIKE 'employees'" | grep -c "employees")

if [ "$DB_EXISTS" -gt 0 ]; then
    echo "employees 資料庫已存在"
    # 檢查資料表是否已存在
    TABLE_COUNT=$(mysql -h localhost -u"root" -p"${MYSQL_ROOT_PASSWORD}" -e "USE employees; SHOW TABLES;" | wc -l)
    if [ "$TABLE_COUNT" -gt 0 ]; then
        echo "資料表已存在，跳過匯入步驟"
        wait
        exit 0
    fi
else
    echo "建立 employees 資料庫..."
    mysql -h localhost -u"root" -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS employees"
fi

# 切換到資料目錄
cd /test_db

# 檢查必要檔案是否存在
if [ ! -f employees.sql ]; then
    echo "錯誤：找不到 employees.sql 檔案"
    exit 1
fi

if [ ! -f load_departments.dump ]; then
    echo "錯誤：找不到 load_departments.dump 檔案"
    exit 1
fi

echo "開始匯入資料..."

# 匯入資料
mysql -h localhost -u"root" -p"${MYSQL_ROOT_PASSWORD}" < employees.sql

# 驗證資料匯入
echo "驗證資料匯入..."
mysql -h localhost -u"root" -p"${MYSQL_ROOT_PASSWORD}" -e "USE employees; SHOW TABLES;"

echo "資料匯入完成"

# 保持容器運行
wait 