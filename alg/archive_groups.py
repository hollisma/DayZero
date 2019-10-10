# run once per day to archive groups

from datetime import datetime, timedelta
import requests

now = datetime.now()

# Authentication
url = 'http://172.31.43.129:5000/api/auth'
body = { 'email': 'h@princeton.edu', 'password': 'hhhhhh' }
response = requests.post(url, json=body).json()
token = response['token']
headers = { 'x-auth-token': token }

# Get all users' schedules
url = 'http://172.31.43.129:5000/api/groups/admin'
groups = requests.get(url, headers=headers).json()

def toDatetime(t):
    nums = t.split(',')[0].split('-')
    dt = datetime(int(nums[2]), int(nums[0]), int(nums[1]))
    return dt

def archiveGroup(group):
    url = 'http://172.31.43.129:5000/api/schedule/admin/' + group
    response = requests.put(url, headers=headers).json()
    print(response)

for group in groups:
    times = group['times']
    user = group['user']
    tomorrow = datetime.now() + timedelta(days=1)

    group = list(filter(lambda t: toDatetime(t) > tomorrow, times))
    archiveGroup(group)
