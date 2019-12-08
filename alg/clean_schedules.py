# run once per day to remove outdated times in schedules

from datetime import datetime, timedelta
import requests
import json
from dotenv import load_dotenv
import os

host_name = 'http://172.31.43.129'
# host_name = 'http://localhost'

now = datetime.now()

# Authentication
load_dotenv()
url = host_name + ':5000/api/auth'
body = { 'email': os.getenv('ADMIN_EMAIL'), 'password': os.getenv('ADMIN_PASSWORD') }
response = requests.post(url, json=body).json()
token = response['token']

headers = { 'x-auth-token': token }

# Get all users' schedules
url = host_name + ':5000/api/schedule/admin'
response = requests.get(url, headers=headers)
print(response.text)
schedules = json.loads(response.text)

def toDatetime(t):
    nums = t.split(',')[0].split('-')
    dt = datetime(int(nums[2]), int(nums[0]), int(nums[1]))
    return dt

def updateSchedule(times, user):
    url = host_name + ':5000/api/schedule/admin'
    body = { 'times': times, 'user': user }
    response = requests.post(url, headers=headers)
    response = json.loads(response.text)
    print(response)

for schedule in schedules:
    times = schedule['times']
    user = schedule['user']

    times = list(filter(lambda t: toDatetime(t) > datetime.now(), times))
    updateSchedule(times, user)
