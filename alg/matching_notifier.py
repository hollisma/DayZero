from dayzero_gmail import DayZeroGmail
import textwrap


class MatchingNotifier:
    def __init__(self):
        self.email = DayZeroGmail()

    def match(self, profiles, times, categories):
        recipient_emails = [p['user']['email'] for p in profiles]
        subject = "You've matched!"
        self.email.send(recipient_emails, subject, self.matching_message(profiles, times, categories))

    def matching_message(self, profiles, times, categories):
        # Please feel free to change the content of message using the information in profiles
        recipient_names = [p['user']['name'] for p in profiles]
        recipient_names_str = "{} and {}".format(', '.join(recipient_names[:-1]), recipient_names[-1])
        times_str = "{} and {}".format(', '.join(times[:-1]), times[-1])
        categories_str = "{} and {}".format(', '.join(categories[:-1]), categories[-1])
        body = """
        Hey {}!
        I'm really excited to be introducing you two. You guys seemed like such a great fit 
        it would've been a crime for you two not to meet! Now that you guys have each other's
        emails, you can trade numbers or use this email thread to schedule a specific
        time and place. 
        
        You guys both said you were interested in: {}
        You guys both said you were free for meals on {}

        Go to dayzero.college to read your day zero's bio.
        """.format(recipient_names_str, times_str, categories_str)
        return textwrap.dedent(body).strip()
