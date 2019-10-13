from dayzero_gmail import DayZeroGmail
import textwrap


class MatchingNotifier:
    def __init__(self):
        self.email = DayZeroGmail()

    def match(self, profiles):
        recipient_emails = [p['user']['email'] for p in profiles]
        subject = "You've matched!"
        self.email.send(recipient_emails, subject, self.matching_message(profiles))

    def matching_message(self, profiles):
        # Please feel free to change the content of message using the information in profiles
        recipient_names = [p['user']['name'] for p in profiles]
        recipient_names_str = "{} and {}".format(', '.join(recipient_names[:-1]), recipient_names[-1])
        body = """
        Hey {}!
        I'm really excited to be introducing you two. You guys seemed like such a great fit 
        it would've been a crime for you two not to meet! Now that you guys have each other's
        emails, you can trade numbers or use this email thread to schedule a specific
        time and place. 
        
        You guys both said you were interested in: [insert topics]
        You guys both said you were free for meals on [type of meal on this date, type of meal on this date, etc.]

        Go to dayzero.college to read your day zero's bio.
        """.format(recipient_names_str)
        return textwrap.dedent(body).strip()
