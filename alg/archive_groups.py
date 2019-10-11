# run once per day to archive groups

from datetime import datetime, timedelta
import requests

# host_name = 'http://172.31.43.129'
host_name = 'http://localhost'

now = datetime.now()

# Authentication
url = host_name + ':5000/api/auth'
body = { 'email': 'h@princeton.edu', 'password': 'hhhhhh' }
response = requests.post(url, json=body).json()
token = response['token']
headers = { 'x-auth-token': token }

# Get all users' schedules
url = host_name + ':5000/api/groups/admin'
groups = requests.get(url, headers=headers).json()

# def toDatetime(t):
#   nums = t.split(',')[0].split('-')
#   dt = datetime(int(nums[2]), int(nums[0]), int(nums[1]))
#   return dt

def toDatetime(t):
    split = t.split(',')
    date = datetime.strptime(split[0], '%m-%d-%Y')
    if split[1] == 'Lunch': 
        date = date + timedelta(hours=12)
    if split[1] == 'Afternoon Coffee': 
        date = date + timedelta(hours=15)
    if split[1] == 'Dinner': 
        date = date + timedelta(hours=18)
    return date

def archiveGroup(group):
  url = host_name + ':5000/api/groups/admin/archive/' + group
  response = requests.put(url, headers=headers).json()
  return response

for group in groups:
  if 'time' not in group.keys():
    continue
  time = toDatetime(group['time'])
  members = group['members']
  if time.day < datetime.now().day: 
    print(archiveGroup(group['_id']))
