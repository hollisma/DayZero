# run once per day to remove outdated times in schedules

from datetime import datetime
import requests

now = datetime.now()

# Authentication
# 172.31.43.129:3---
url = 'http://localhost:5000/api/auth'
body = { 'email': 'h@princeton.edu', 'password': 'hhhhhh' }
response = requests.post(url, json=body).json()
token = response['token']
headers = { 'x-auth-token': token }

# Get all users' schedules
url = 'http://localhost:5000/api/schedule/admin'
schedules = requests.get(url, headers=headers).json()

def toDatetime(t):
    nums = t.split(',')[0].split('-')
    dt = datetime(int(nums[2]), int(nums[0]), int(nums[1]))
    return dt

def updateSchedule(times, user):
    url = 'http://localhost:5000/api/schedule/admin'
    body = { 'times': times, 'user': user }
    response = requests.post(url, json=body, headers=headers).json()
    print(response)

user = '5d870e817c2aa4627f0f1f28'
for schedule in schedules:
    times = schedule['times']
    user = schedule['user']
    now = datetime.now()

    times = list(filter(lambda t: toDatetime(t) > now, times))
    updateSchedule(times, user)
