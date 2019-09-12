import requests
import json

k_matching_threshold = 3
headers = { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ3MTI0NTFhMGFhYjA0YjM3OGU3MzRlIn0sImlhdCI6MTU2ODI1MTMyMywiZXhwIjoxNTY4NjExMzIzfQ._sOmm27tWjGs14GC9IC0nhq7GdbJqr4bSpc98S3LABw'}

url = 'http://localhost:5000/api/users/admin'
response = requests.get(url, headers=headers)
users = json.loads(response.text)
users = list(filter(lambda u: True if u['user_type'] == 'SCHEDULED' else False, users))
users = list(map(lambda u: u['_id'], users))

url = 'http://localhost:5000/api/schedule/admin'
response = requests.get(url, headers=headers)
schedules = json.loads(response.text)
schedules = list(filter(lambda s: True if s['user'] in users else False, schedules))

url = 'http://localhost:5000/api/profile/admin'
response = requests.get(url, headers=headers)
profiles = json.loads(response.text)
profiles = list(filter(lambda p: True if p['user']['id'] in users else False, profiles))

usersDict = dict()
for u in users:
  usersDict[u] = dict()
  usersDict[u]['profile'] = list(filter(lambda p: True if p['user']['id'] == u else False, profiles))[0]
  usersDict[u]['schedule'] = list(filter(lambda s: True if s['user'] == u else False, schedules))[0]

def categories(id):
  return usersDict[id]['profile']['categories']

def times(id):
  return usersDict[id]['schedule']['times']

def getSharedCategories(id1, id2): 
  c1 = categories(id1)
  c2 = categories(id2)
  common = []
  for c in c1: 
    if c in c2: 
      common.append(c)
  return common

def getSharedTimes(id1, id2): 
  t1 = times(id1)
  t2 = times(id2)
  common = []
  for c in t1: 
    if c in t2: 
      common.append(c)
  return common

def match(id1, id2):
  matches[id1] = [id2] if id1 not in list(matches.keys()) else matches[id1].append(id2)
  matches[id2] = [id1] if id2 not in list(matches.keys()) else matches[id2].append(id1)

ids = list(usersDict.keys())

# keys are ids, values are dicts with keys as ids and values as number of categories they share
matches = dict()
potentialMatches = dict()

# go through all users, find automatches, and create potentialMatches
for i, id1 in enumerate(ids):
  for j, id2 in enumerate(ids): 
    sharedTimes = getSharedTimes(id1, id2)

    # if ids are different and there are sharedTimes
    # j >= i is optimization
    if j >= i and id1 != id2 and sharedTimes:
      sharedCategories = getSharedCategories(id1, id2)
      numSharedCategories = len(sharedCategories)

      # automatch if number of shared categories are above a threshold
      if numSharedCategories >= k_matching_threshold:
        match(id1, id2)

      # create sub-dict if necessary
      if id1 not in list(potentialMatches.keys()):
        potentialMatches[id1] = dict()
      if id2 not in list(potentialMatches.keys()):
        potentialMatches[id2] = dict()

      # include undirected weighted link
      potentialMatches[id1][id2] = numSharedCategories
      potentialMatches[id2][id1] = numSharedCategories

print('potential matches: \n', potentialMatches, '\n')
print('matches: \n', matches, '\n')
        
