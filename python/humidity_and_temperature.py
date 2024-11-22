from flask import Flask, jsonify
from flask_cors import CORS
import serial
import time

app = Flask(__name__)

# 아두이노 시리얼 포트 설정 (예: COM번호, baudrate는 아두이노와 동일하게 설정)
arduino_serial = serial.Serial('COM15', 115200)
time.sleep(5)  # 시리얼 연결 안정화 대기

# 모든 출처에서 오는 요청을 허용하도록 설정
CORS(app)
# 특정 출처만 허용 (React 앱의 주소)
# CORS(app, origins="http://localhost:3000")

@app.route('/temperature-humidity', methods=['GET'])
def get_temperature_humidity():
    attempts = 5  # 데이터를 기다릴 최대 시도 횟수
    while attempts > 0:
        if arduino_serial.in_waiting > 0:
            # 데이터를 읽어와서 디코딩 및 공백 제거
            data = arduino_serial.readline().decode().strip()

            try:
                # 온도와 습도를 쉼표를 기준으로 나눕니다
                temp, humidity = data.split(",")
                # float로 변환하여 소수점을 유지합니다
                temp = float(temp)
                humidity = float(humidity)
                return jsonify({"temperature": temp, "humidity": humidity})
            except ValueError:
                # 데이터를 나누는 중 오류 발생 시
                return jsonify({"error": "Data format error"}), 500
        else:
            time.sleep(0.5)  # 데이터를 기다리는 시간
            attempts -= 1

    return jsonify({"error": "No data received"}), 404
    # return {'temperature': 25.0, 'humidity': 60.0}
if __name__ == '__main__':
    app.run(port=5000)