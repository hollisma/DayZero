from dayzero_gmail import DayZeroGmail
import textwrap


class MatchingNotifier:
    def __init__(self):
        self.email = DayZeroGmail()

    def match(self, profiles, times, categories):
        recipient_emails = [p['user']['email'] for p in profiles]
        subject = "You've matched!"
        # self.email.send(recipient_emails, subject, self.matching_message(profiles, times, categories), "logo.svg")
        self.email.send(recipient_emails, subject,
                        self.matching_message(profiles, times, categories))

    def matching_message(self, profiles, times, categories):
        recipient_names = [p['user']['name'] for p in profiles]
        recipient_names_str = "{} and {}".format(', '.join(recipient_names[:-1]), recipient_names[-1])
        times = list(map(formatTime, times))
        times_str = "{}, and {}".format(', '.join(times[:-1]), times[-1])
        categories_str = "{}, and {}".format(', '.join(categories[:-1]), categories[-1])
        body = """
        Hey {}!

        I'm really excited to be introducing you two. You guys seemed like such a great fit 
        it would've been a crime for you not to meet! Now that you have each other's
        emails, you can trade numbers or use this email thread to schedule a specific
        time and place. 
        
        You both are interested in: {}
        You both are free for meals for {}

        Hope you have a blast meeting each other!

        Sincerely, 

        Day Zero

        """.format(recipient_names_str, categories_str, times_str)
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
