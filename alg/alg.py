import requests
import json

k_matching_threshold = 3
headers = { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ4NjM1MGM0MjNiMjAxNTc1OWIyYzFiIn0sImlhdCI6MTU2OTA3NjQ5OCwiZXhwIjoxNTY5NDM2NDk4fQ.m5uK_vpyxhuv5njetBoclNrT8bO-qA7jUgTt6ZiLXBQ'}

###################################################################################################
#  Get information                                                                                #
###################################################################################################

# Get all users' ids
url = 'http://localhost:5000/api/users/admin'
response = requests.get(url, headers=headers)
users = json.loads(response.text)
scheduledUsers = list(filter(lambda u: u['user_type'] == 'SCHEDULED', users))
users = list(map(lambda u: u['_id'], users))
scheduledUsers = list(map(lambda u: u['_id'], scheduledUsers))

usersDict = dict()
for u in users:
  usersDict[u] = dict()

# Get all users' schedules
url = 'http://localhost:5000/api/schedule/admin'
response = requests.get(url, headers=headers)
schedules = json.loads(response.text)

for s in schedules:
  usersDict[s['user']]['schedule'] = s

url = 'http://localhost:5000/api/profile/admin'
response = requests.get(url, headers=headers)
profiles = json.loads(response.text)

for p in profiles:
  usersDict[p['user']['id']]['profile'] = p

###################################################################################################
#  Helper methods                                                                                 #
###################################################################################################

def categories(id):
  if 'profile' not in usersDict[id].keys() or 'categories' not in usersDict[id]['profile'].keys():
    return []
  return usersDict[id]['profile']['categories']

def times(id):
  if 'schedule' not in usersDict[id].keys() or 'times' not in usersDict[id]['schedule'].keys():
    return None
  return usersDict[id]['schedule']['times']

def getSharedCategories(id1, id2): 
  c1 = categories(id1)
  c2 = categories(id2)
  common = []

  if c1 is None or c2 is None:
    return common
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
  if id1 not in matches.keys():
    matches[id1] = []
  if id2 not in matches.keys():
    matches[id2] = []
  matches[id1].append(id2)
  matches[id2].append(id1)

def computeCompatibilities():
  newUsers = []
  for id in scheduledUsers:
    if 'vibe' not in usersDict[id]['profile']['user'].keys():
      newUsers.append(id)
  
  
  # Create vibe 
  for id1 in newUsers:
    vibe = dict()
    for id2 in scheduledUsers: 
      # Make sure id2 is an established user
      if id2 in newUsers:
        continue
      sharedCategories = getSharedCategories(id1, id2)

#TODO add sharedCategories to vibe, then figure out how to update vibe of both users. Might want to edit locally first, then once loop is done mass update. 






      # if id2 not in usersDict[id]['profile']['user']

computeCompatibilities()

matches = dict()
# keys are ids, values are dicts with keys as ids and values as number of categories they share
potentialMatches = dict()

# go through all users, find automatches, and create potentialMatches
for i, id1 in enumerate(ids):
  for j, id2 in enumerate(ids): 
    sharedTimes = getSharedTimes(id1, id2)

    # if ids are different and there are sharedTimes
    # j >= i is optimization

    # if j >= i and id1 != id2 and sharedTimes:
    if j >= i and id1 != id2:
      sharedCategories = getSharedCategories(id1, id2)

      # automatch if number of shared categories are above a threshold
      if len(sharedCategories) >= k_matching_threshold:
        match(id1, id2)

      # create sub-dict if necessary
      if id1 not in list(potentialMatches.keys()):
        potentialMatches[id1] = dict()
      if id2 not in list(potentialMatches.keys()):
        potentialMatches[id2] = dict()

      # include undirected weighted link
      potentialMatches[id1][id2] = sharedCategories
      potentialMatches[id2][id1] = sharedCategories

print('potential matches: \n', potentialMatches, '\n')
print('matches: \n', matches, '\n')

for u in usersDict:
  print(u)


        
###############################################################################
# TODO
# 
# Step 1: make schema and endpoints to create and update compatibility tables
# 
# Should probably make it so that every time a new user is added, they're 
# given a dict with a list of all other users and the new user's compatibility 
# with all the other users. This compatibility score is also added to the 
# existing user's dict.
# 
# Then at the start of the day, go through the times and match people with high
# scores. 
# 
# 
###############################################################################
