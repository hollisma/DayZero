import requests
import json
import math

k_matching_threshold = 3
k_total_categories = 57

# Get admin token
body = { 'email': 'email', 'password': 'password' }
url = 'http://localhost:5000/api/auth'
response = requests.post(url, json=body)
res = json.loads(response.text)
headers = { 'x-auth-token': res['token']}

###################################################################################################
#  Get information                                                                                #
###################################################################################################

# Get all users' ids
url = 'http://localhost:5000/api/users/admin'
response = requests.get(url, headers=headers)
users = json.loads(response.text)
scheduledUsers = list(filter(lambda u: u['user_type'] == 'SCHEDULED', users))
# userIDs = list(map(lambda u: u['_id'], users))
scheduledIDs = list(map(lambda u: u['_id'], scheduledUsers))

usersDict = dict()
for u in scheduledIDs:
  usersDict[u] = dict()

# Get all users' schedules
url = 'http://localhost:5000/api/matchInfo/admin'
response = requests.get(url, headers=headers)
schedules = json.loads(response.text)

for s in schedules:
  usersDict[s['user']]['schedule'] = s

# Get all scheduled profiles
url = 'http://localhost:5000/api/profile/scheduled/admin'
response = requests.get(url, headers=headers)
profiles = json.loads(response.text)

# Add profiles to usersDict
for p in profiles:
  id = p['user']['_id']
  if id in usersDict.keys(): 
    usersDict[p['user']['_id']]['profile'] = p

print(usersDict, '\n')


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
  
  # Create vibe for each new user
  for id1 in newUsers:
    vibe = dict()

    # Go through scheduled users and compute compatibility
    for id2 in scheduledUsers: 
      # Make sure id2 is an established user
      if id2 in newUsers:
        continue
      sharedCategories = getSharedCategories(id1, id2)
      score = math.log(len(sharedCategories), 2) / math.log(k_total_categories, 2)
      vibe[id2] = score
      usersDict[id2]['profile']['user']['vibe'][id1] = score
    usersDict[id1]['profile']['user']['vibe'] = vibe


###################################################################################################
#  Payload                                                                                        #
###################################################################################################

# computeCompatibilities()

# matches = dict()
# # keys are ids, values are dicts with keys as ids and values as number of categories they share
# potentialMatches = dict()

# # go through all users, find automatches, and create potentialMatches
# for i, id1 in enumerate(scheduledUsers):
#   for j, id2 in enumerate(scheduledUsers): 
#     sharedTimes = getSharedTimes(id1, id2)

#     # if ids are different and there are sharedTimes
#     if id1 != id2 and sharedTimes:
      

#       # automatch if number of shared categories are above a threshold
#       if len(sharedCategories) >= k_matching_threshold:
#         match(id1, id2)

#       # create sub-dict if necessary
#       if id1 not in list(potentialMatches.keys()):
#         potentialMatches[id1] = dict()
#       if id2 not in list(potentialMatches.keys()):
#         potentialMatches[id2] = dict()

#       # include undirected weighted link
#       potentialMatches[id1][id2] = sharedCategories
#       potentialMatches[id2][id1] = sharedCategories

# print('potential matches: \n', potentialMatches, '\n')
# print('matches: \n', matches, '\n')

# for u in usersDict:
#   print(u)
