import requests
import json
import math

k_matching_threshold = 3
k_total_categories = 57

url = 'http://52.207.10.226:5000/api/auth'
body = { 'email': 'h@princeton.edu', 'password': 'hhhhhh' }
response = requests.post(url, json=body)
response = json.loads(response.text)
token = response['token']

headers = { 'x-auth-token': token }

###################################################################################################
#  Get information                                                                                #
#                                                                                                 #
#  Here, users = scheduledUsers                                                                   #
###################################################################################################

# Get all users' ids
url = 'http://52.207.10.226:5000/api/users/admin'
response = requests.get(url, headers=headers)
users = json.loads(response.text)
allUsers = list(map(lambda u: u['_id'], users))
users = list(filter(lambda u: u['user_type'] == 'SCHEDULED', users))
users = list(map(lambda u: u['_id'], users))

usersDict = dict()
for u in allUsers:
  usersDict[u] = dict()

# Get all users' schedules
url = 'http://52.207.10.226:5000/api/schedule/admin'
response = requests.get(url, headers=headers)
schedules = json.loads(response.text)

for s in schedules:
  usersDict[s['user']]['schedule'] = s

# Get all users' profiles
url = 'http://52.207.10.226:5000/api/profile/admin'
response = requests.get(url, headers=headers)
profiles = json.loads(response.text)

for p in profiles:
  usersDict[p['user']['id']]['profile'] = p

# url = 'http://52.207.10.226:5000/api/vibe'
# response = requests.get(url, headers=headers)
# vibe = json.loads(response.text)
# print(vibe)

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
  matches[id1] = id2
  matches[id2] = id1

def createGroup(members):
  url = 'http://52.207.10.226:5000/api/groups'
  body = { 'user_ids': members}
  response = requests.post(url, headers=headers, json=body)
  response = json.loads(response.text)
  return response

###################################################################################################
#  Matching                                                                                       #
###################################################################################################

masterSchedule = dict()
for id in users:
  times = usersDict[id]['schedule']['times']
  for t in times:
    if t not in masterSchedule.keys():
      masterSchedule[t] = []
    masterSchedule[t].append(id)

matches = dict()
for time in masterSchedule.keys():
  timeUsers = masterSchedule[time]
  for u in timeUsers:
    if u not in matches.keys():
      for v in timeUsers:
        if v not in matches.keys() and u != v:
          if len(getSharedCategories(u, v)) > k_matching_threshold:
            match(u, v)
            break

matched = []
for m in matches.keys():
  if m not in matched:
    members = [m, matches[m]]
    res = createGroup(members)
    matched.extend(members)


# for id1 in users:
#   for id2 in users: 
#     sharedTimes = getSharedTimes(id1, id2)
#     if id1 == id2 or not len(sharedTimes) == 0:
#       continue
#     sharedCategories = getSharedCategories(id1, id2)
#     score = math.log(len(sharedCategories), 2) / math.log(k_total_categories, 2)
#     vibe[id2] = score
#     usersDict[id2]['profile']['user']['vibe'][id1] = score
#   usersDict[id1]['profile']['user']['vibe'] = vibe




# matches = dict()
# # keys are ids, values are dicts with keys as ids and values as number of categories they share
# potentialMatches = dict()

# # go through all users, find automatches, and create potentialMatches
# for id1 in users:
#   for id2 in users: 
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

# # print('potential matches: \n', potentialMatches, '\n')
# # print('matches: \n', matches, '\n')
