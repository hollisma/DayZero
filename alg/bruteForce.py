import requests
import json
import math
from datetime import datetime, timedelta
from matching_notifier import MatchingNotifier
from dotenv import load_dotenv
import os


k_matching_threshold = 2
host_name = 'http://172.31.43.129'
# host_name = 'http://localhost'
options_email = True

load_dotenv()

# Set admin token
url = host_name + ':5000/api/auth'
body = { 'email': os.getenv('ADMIN_EMAIL'), 'password': os.getenv('ADMIN_PASSWORD') }
response = requests.post(url, json=body)
res = json.loads(response.text)
headers = { 'x-auth-token': res['token']}

###################################################################################################
#  Get information                                                                                #
#                                                                                                 #
#  Here, users = scheduledUsers                                                                   #
###################################################################################################

# Get all users' ids
url = host_name + ':5000/api/users/admin'
response = requests.get(url, headers=headers)
users = json.loads(response.text)
scheduledUsers = list(filter(lambda u: u['user_type'] == 'SCHEDULED', users))
scheduledIDs = list(map(lambda u: u['_id'], scheduledUsers))

users = scheduledUsers
ids = scheduledIDs

usersDict = dict()
for u in ids:
  usersDict[u] = dict()

# Get all users' schedules
url = host_name + ':5000/api/matchInfo/admin'
response = requests.get(url, headers=headers)
matchInfos = json.loads(response.text)

for m in matchInfos:
  usersDict[m['user']]['matchInfo'] = m

# Get all scheduled profiles
url = host_name + ':5000/api/profile/scheduled/admin'
response = requests.get(url, headers=headers)
profiles = json.loads(response.text)

# Add profiles to userDict
for p in profiles:
  usersDict[p['user']['id']]['profile'] = p

print(usersDict, '\n')

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
  if 'matchInfo' not in usersDict[id].keys() or 'times' not in usersDict[id]['matchInfo'].keys():
    return None
  return usersDict[id]['matchInfo']['times']

def getActivities(id):
  if 'matchInfo' not in usersDict[id].keys() or 'activities' not in usersDict[id]['matchInfo'].keys():
    return None
  return usersDict[id]['matchInfo']['activities']

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

def getSharedActivities(id1, id2): 
  t1 = getActivities(id1)
  t2 = getActivities(id2)
  common = []
  for c in t1: 
    if c in t2: 
      common.append(c)
  return common

# Create a group with the users and the time
def match(members, categories, activities, times):
  url = host_name + ':5000/api/groups'
  body = { 'user_ids': members, 'categories': categories, \
    'activities': activities, 'times': times }
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
    if split[1] == 'Morning': 
        date = date + timedelta(hours=8)
    if split[1] == 'Lunch': 
        date = date + timedelta(hours=12)
    if split[1] == 'Afternoon': 
        date = date + timedelta(hours=14)
    if split[1] == 'Dinner': 
        date = date + timedelta(hours=18)
    if split[1] == 'Night': 
        date = date + timedelta(hours=20)
    return date

###################################################################################################
#  Matching                                                                                       #
###################################################################################################

# masterSchedule holds times and users with the time slot
masterSchedule = dict()
for id in ids:
  
  times = usersDict[id]['matchInfo']['times']
  # times = []
  # if 'matchInfo' in usersDict[id].keys():
  #   times = usersDict[id]['matchInfo']['times']

  for t in times:
    if t not in masterSchedule.keys():
      masterSchedule[t] = []
    masterSchedule[t].append(id)

# Sort keys to make sure earliest times are matched first
masterSchedule_sorted_keys = list(masterSchedule.keys())
masterSchedule_sorted_keys = sorted(masterSchedule_sorted_keys, key=toDatetime)

### Match people with same time slot and shared interests
matched = set()
# For each time where at least one user is available
for time in masterSchedule_sorted_keys:
  timeUsers = masterSchedule[time]
  # For every user in this time
  for u in timeUsers:
    # Make sure they haven't matched yet
    if u not in matched:
      # For every potential match for the first user
      for v in timeUsers:
        if v not in matched and u != v:
          sharedCats = getSharedCategories(u, v)
          sharedActs = getSharedActivities(u, v)
          sharedTimes = getSharedTimes(u, v)
          if len(sharedCats) > k_matching_threshold \
            and len(sharedActs) > 0:
            response = match([u, v], sharedCats, sharedActs, sharedTimes)
            print(response)
            matched.add(u)
            matched.add(v)
            if options_email: 
              notifier = MatchingNotifier()
              notifier.match([usersDict[u]['profile'], usersDict[v]['profile']], sharedTimes, sharedCats, sharedActs)
            break







### Create groups between matched people
## Expects matches to be a dictionary
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
