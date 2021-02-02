import requests
import json
import math
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os


# host_name = 'http://172.31.43.129'
host_name = 'http://localhost'

load_dotenv()

# Set admin token
url = host_name + ':5000/api/auth'
body = { 'email': os.getenv('ADMIN_EMAIL'), 'password': os.getenv('ADMIN_PASSWORD') }
response = requests.post(url, json=body)
res = json.loads(response.text)
headers = { 'x-auth-token': res['token']}

###################################################################################################
#  Get information                                                                                #
###################################################################################################

# Get all groups ids
url = host_name + ':5000/api/groups/admin'
response = requests.get(url, headers=headers)
groups = json.loads(response.text)
members_arrs = list(map(lambda g: g['members'], groups))
members = set()
for mem in members_arrs: 
  for m in mem: 
    members.add(m)
print(members)

# Change the users
for user_id in members: 
  url = host_name + ':5000/api/users/group/' + user_id
  response = requests.put(url, headers=headers)
  res = json.loads(response.text)
  print(user_id)