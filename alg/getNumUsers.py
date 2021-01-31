import os
import requests
import json
from dotenv import load_dotenv

host_name = 'http://172.31.43.129'
# host_name = 'http://localhost'
load_dotenv()

# Set admin token
url = host_name + ':5000/api/auth'
body = { 'email': os.getenv('ADMIN_EMAIL'), 'password': os.getenv('ADMIN_PASSWORD') }
response = requests.post(url, json=body)
res = json.loads(response.text)
headers = { 'x-auth-token': res['token']}

url = host_name + ':5000/api/users/admin'
response = requests.get(url, headers=headers)
users = json.loads(response.text)
print(len(users))