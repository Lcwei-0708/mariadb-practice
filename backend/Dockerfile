FROM python:3.10-slim

WORKDIR /app

# 複製 requirements.txt 並安裝 Python 套件
COPY app/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 複製應用程式檔案
COPY app/ .

CMD ["python", "main.py"]