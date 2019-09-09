import requests
import json

url = 'http://localhost:5000/api/users/admin'
headers = { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ3MTI0NTFhMGFhYjA0YjM3OGU3MzRlIn0sImlhdCI6MTU2Nzc4Mzc4OCwiZXhwIjoxNTY4MTQzNzg4fQ.k_KmGOCq8SSX5dFtwZv9Fq7xZ-vWenhg1QnD1bplepA'}
response = requests.get(url, headers=headers)
users = json.loads(response.text)
users = list(filter(lambda u: True if u['user_type'] == 'SCHEDULED' else False, users))
users = list(map(lambda u: u['_id'], users))

url = 'http://localhost:5000/api/schedule/admin'
headers = { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ3MTI0NTFhMGFhYjA0YjM3OGU3MzRlIn0sImlhdCI6MTU2Nzc4Mzc4OCwiZXhwIjoxNTY4MTQzNzg4fQ.k_KmGOCq8SSX5dFtwZv9Fq7xZ-vWenhg1QnD1bplepA'}
response = requests.get(url, headers=headers)
schedules = json.loads(response.text)
schedules = list(filter(lambda s: True if s['user'] in users else False, schedules))

url = 'http://localhost:5000/api/profile/admin'
headers = { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ3MTI0NTFhMGFhYjA0YjM3OGU3MzRlIn0sImlhdCI6MTU2Nzc4Mzc4OCwiZXhwIjoxNTY4MTQzNzg4fQ.k_KmGOCq8SSX5dFtwZv9Fq7xZ-vWenhg1QnD1bplepA'}
response = requests.get(url, headers=headers)
profiles = json.loads(response.text)
profiles = list(filter(lambda p: True if p['user']['id'] in users else False, profiles))

usersDict = dict()
for u in users:
  usersDict[u] = dict()
  usersDict[u]['profile'] = list(filter(lambda p: True if p['user']['id'] == u else False, profiles))[0]
  usersDict[u]['schedule'] = list(filter(lambda s: True if s['user'] == u else False, schedules))[0]
print(usersDict)
