import requests
import json

url = 'http://localhost:5000/api/users/admin'
headers = { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ3MTI0NTFhMGFhYjA0YjM3OGU3MzRlIn0sImlhdCI6MTU2Nzc4Mzc4OCwiZXhwIjoxNTY4MTQzNzg4fQ.k_KmGOCq8SSX5dFtwZv9Fq7xZ-vWenhg1QnD1bplepA'}
response = requests.get(url, headers=headers)
response = json.loads(response.text)

print(response)

for x in response: 
  if (x['user_type'] == 'SCHEDULED'):
    print(x.keys())

