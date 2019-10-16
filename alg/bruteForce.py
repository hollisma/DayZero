import requests
import json
import math
from datetime import datetime, timedelta
from matching_notifier import MatchingNotifier

k_matching_threshold = 3
# host_name = 'http://172.31.43.129'
host_name = 'http://localhost'

url = host_name + ':5000/api/auth'
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
url = host_name + ':5000/api/users/admin'
response = requests.get(url, headers=headers)
users = json.loads(response.text)
allUsers = list(map(lambda u: u['_id'], users))
users = list(filter(lambda u: u['user_type'] == 'SCHEDULED', users))
users = list(map(lambda u: u['_id'], users))

usersDict = dict()
for u in allUsers:
  usersDict[u] = dict()

# Get all users' schedules
url = host_name + ':5000/api/schedule/admin'
response = requests.get(url, headers=headers)
schedules = json.loads(response.text)

for s in schedules:
  usersDict[s['user']]['schedule'] = s

# Get all users' profiles
url = host_name + ':5000/api/profile/admin'
response = requests.get(url, headers=headers)
profiles = json.loads(response.text)

for p in profiles:
  print(p)
  usersDict[p['user']['id']]['profile'] = p

# url = host_name + ':5000/api/vibe'
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

def getTimes(id):
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
  t1 = getTimes(id1)
  t2 = getTimes(id2)
  common = []
  for c in t1: 
    if c in t2: 
      common.append(c)
  return common

# Create a group with the users and the time
def match(members, time):
  url = host_name + ':5000/api/groups'
  body = { 'user_ids': members, 'time': time }
  response = requests.post(url, headers=headers, json=body)
  response = json.loads(response.text)
  return response

  # matches[id1] = id2
  # matches[id2] = id1

# def createGroup(members, time):
#   url = host_name + ':5000/api/groups'
#   body = { 'user_ids': members, 'time': time }
#   response = requests.post(url, headers=headers, json=body)
#   response = json.loads(response.text)
#   return response

def toDatetime(t):
    split = t.split(',')
    date = datetime.strptime(split[0], '%m-%d-%Y')
    if split[1] == 'Lunch': 
        date = date + timedelta(hours=12)
    if split[1] == 'Afternoon Coffee': 
        date = date + timedelta(hours=18)
    return date

###################################################################################################
#  Matching                                                                                       #
###################################################################################################

# masterSchedule holds times and users with the time slot
masterSchedule = dict()
for id in users:
  times = usersDict[id]['schedule']['times']
  for t in times:
    if t not in masterSchedule.keys():
      masterSchedule[t] = []
    masterSchedule[t].append(id)

# Sort keys to make sure earliest times are matched first
masterSchedule_sorted_keys = list(masterSchedule.keys())
masterSchedule_sorted_keys = sorted(masterSchedule_sorted_keys, key=toDatetime)

# Match people with same time slot and shared interests
matches = set()
# For each time where at least one user is available
for time in masterSchedule_sorted_keys:
  timeUsers = masterSchedule[time]
  # For every user in this time
  for u in timeUsers:
    if u not in matches:
      # For every potential match for the first user
      for v in timeUsers:
        if v not in matches and u != v:
          if len(getSharedCategories(u, v)) > k_matching_threshold:
            response = match([u, v], time)
            print(response)
            matches.add(u)
            matches.add(v)
            notifier = MatchingNotifier()
            notifier.match([usersDict[u]['profile'], usersDict[v]['profile']], getSharedTimes(u, v), getSharedCategories(u, v))
            break

# Create groups between matched people
# matched = []
# for m in matches.keys():
#   if m not in matched:
#     members = [m, matches[m]]
#     res = createGroup(members)
#     matched.extend(members)










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
