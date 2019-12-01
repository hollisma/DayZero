# run once per day to remove outdated times in schedules

from datetime import datetime, timedelta
import requests
from dotenv import load_dotenv
import os

now = datetime.now()

# Authentication
load_dotenv()
url = 'http://172.31.43.129:5000/api/auth'
body = { 'email': os.getenv('ADMIN_EMAIL'), 'password': os.getenv('ADMIN_PASSWORD') }
response = requests.post(url, json=body).json()
token = response['token']
headers = { 'x-auth-token': token }

# Get all users' schedules
url = 'http://172.31.43.129:5000/api/schedule/all/admin'
schedules = requests.get(url, headers=headers).json()

def toDatetime(t):
    nums = t.split(',')[0].split('-')
    dt = datetime(int(nums[2]), int(nums[0]), int(nums[1]))
    return dt

def updateSchedule(times, user):
    url = 'http://172.31.43.129:5000/api/schedule/admin'
    body = { 'times': times, 'user': user }
    response = requests.post(url, json=body, headers=headers).json()
    print(response)

for schedule in schedules:
    times = schedule['times']
    user = schedule['user']

    times = list(filter(lambda t: toDatetime(t) > datetime.now(), times))
    updateSchedule(times, user)
