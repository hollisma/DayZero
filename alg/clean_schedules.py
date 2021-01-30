# run once per day to remove outdated times in schedules

from datetime import datetime, timedelta
import requests
import json
from dotenv import load_dotenv
import os

host_name = 'http://172.31.43.129'
# host_name = 'http://localhost'

now = datetime.now()
load_dotenv()

# Authentication
url = host_name + ':5000/api/auth'
body = { 'email': os.getenv('ADMIN_EMAIL'), 'password': os.getenv('ADMIN_PASSWORD') }
response = requests.post(url, json=body)
res = json.loads(response.text)
headers = { 'x-auth-token': res['token']}

# Get all users' schedules
url = host_name + ':5000/api/matchInfo/admin'
response = requests.get(url, headers=headers)
matchInfos = json.loads(response.text)

def toDatetime(t):
    nums = t.split(',')[0].split('-')
    dt = datetime(int(nums[2]), int(nums[0]), int(nums[1]))
    return dt

def updateSchedule(times, user):
    url = host_name + ':5000/api/matchInfo/admin'
    body = { 'times': times, 'user': user }
    response = requests.post(url, headers=headers, json=body)
    response = json.loads(response.text)

for matchInfo in matchInfos:
    times = matchInfo['times']
    user = matchInfo['user']

    times = list(filter(lambda t: toDatetime(t) > datetime.now(), times))
    updateSchedule(times, user)
