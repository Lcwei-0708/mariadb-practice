from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import mysql.connector
from concurrent.futures import ThreadPoolExecutor, as_completed
import time
import os
import logging

app = Flask(__name__)
CORS(app)

# 設定日誌
logging.basicConfig(level=logging.INFO)

api = Api(app, version='1.0', title='SQL語法效能測試API',
          description='SQL語法效能測試API')

ns = api.namespace('loadtest', description='SQL語法效能測試API')

# 資料庫連線設定
DB_CONFIG = {
    'host': 'db',
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', '123456'),
    'database': os.getenv('DB_NAME', 'employees')
}

# 定義 API 輸入模型，使用 form 參數
load_test_model = api.model('LoadTest', {
    'concurrent_users': fields.Integer(required=True, description='同時測試人數', example=10),
    'total_requests': fields.Integer(required=True, description='總共測試次數', example=100),
    'query': fields.String(required=True, description='SQL語法', example='SELECT * FROM salaries LIMIT 10')
})

# 模擬的查詢函式，並計算延遲
def query_db(query):
    start_time = time.time()  # 開始計時
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        conn.close()
        latency = time.time() - start_time  # 計算延遲
        return {'success': True, 'latency': latency}
    except mysql.connector.Error as err:
        # 捕獲SQL語法錯誤或其他資料庫錯誤
        return {'success': False, 'error': f"SQL Error: {err}", 'latency': None}
    except Exception as e:
        # 捕獲其他異常
        return {'success': False, 'error': str(e), 'latency': None}

# 定義 API 資源
@ns.route('/')
class LoadTest(Resource):
    @ns.expect(load_test_model, validate=True)
    def post(self):
        concurrent_users = request.json.get('concurrent_users', 10)
        total_requests = request.json.get('total_requests', 100)
        query = request.json.get('query', 'SELECT * FROM salaries LIMIT 10')

        logging.info(f"Received request with concurrent_users: {concurrent_users}, total_requests: {total_requests}, query: {query}")

        start_time = time.time()
        latencies = []
        errors = 0
        error_messages = []

        with ThreadPoolExecutor(max_workers=concurrent_users) as executor:
            futures = [executor.submit(query_db, query) for _ in range(total_requests)]
            
            for future in as_completed(futures):
                result = future.result()
                if result['success']:
                    latencies.append(result['latency'])
                else:
                    errors += 1
                    error_messages.append(result['error'])

        total_time = time.time() - start_time
        qps = total_requests / total_time

        average_latency = f"{sum(latencies)/len(latencies):.4f} seconds" if latencies else None
        max_latency = f"{max(latencies):.4f} seconds" if latencies else None
        min_latency = f"{min(latencies):.4f} seconds" if latencies else None

        report = {
            'total_requests': total_requests,
            'concurrent_users': concurrent_users,
            'total_time': f"{total_time:.2f} seconds",
            'qps': f"{qps:.2f} queries/second",
            'average_latency': average_latency,
            'max_latency': max_latency,
            'min_latency': min_latency,
            'errors': errors,
            'failure_rate': f"{(errors/total_requests)*100:.2f}%" if total_requests else "0%",
            'error_messages': error_messages  # 包含所有錯誤訊息
        }

        return jsonify(report)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)