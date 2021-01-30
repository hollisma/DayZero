from dayzero_gmail import DayZeroGmail
import textwrap


class MatchingNotifier:
    def __init__(self):
        self.email = DayZeroGmail()

    def match(self, profiles, times, categories, activities):
        recipient_emails = [p['user']['email'] for p in profiles]
        subject = "You've matched!"
        self.email.send(recipient_emails, subject,
          self.matching_message(profiles, times, categories, activities))
        
        # self.email.send(recipient_emails, subject, self.matching_message(profiles, times, categories, activities), "logo.svg")
        
        print(self.matching_message(profiles, times, categories, activities))

    def matching_message(self, profiles, times, categories, activities):

        recipient_names = [p['user']['name'] for p in profiles]
        recipient_names_str = str_list_format(recipient_names)
        times = list(map(formatTime, times))
        times_str = str_list_format(times)
        categories_str = str_list_format(categories)
        activities_str = str_list_format(activities)
        
        body = """
        Hey {}!

        We're really excited to be introducing you two. You guys seemed like such a great fit 
        it would've been a crime for you not to meet! Now that you have each other's
        emails, you can trade numbers or use this email thread to schedule a specific
        time and place. 
        
        Interests you share: {}
        
        Activities you share: {}

        Times you share: {}

        Hope you have a blast meeting each other!

        Cheers, 

        Day Zero

        """.format(recipient_names_str, categories_str, activities_str, times_str)
        return textwrap.dedent(body).strip()

def formatTime(s):
    arr = s.split(',')
    meal = arr[1]
    timesArr = arr[0].split('-')
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month = months[int(timesArr[0])-1]
    day = timesArr[1]
    result = arr[1] + ' on ' + month + ' ' + day
    return result

def str_list_format(list): 
    if len(list) > 2: 
        return "{}, and {}".format(', '.join(list[:-1]), list[-1])
    elif len(list) == 2: 
        return "{} and {}".format(list[0], list[1])
    elif len(list) == 1: 
        return "{}".format(list[0])


### Old message
# Hey {}!

# I'm really excited to be introducing you two. You guys seemed like such a great fit 
# it would've been a crime for you not to meet! Now that you have each other's
# emails, you can trade numbers or use this email thread to schedule a specific
# time and place. 

# You both are interested in: {}
# You both are free for {}

# Hope you have a blast meeting each other!

# Sincerely, 

# Day Zero
