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
        #Please feel free to change the content of message using the information in profiles
        recipient_names = [p['user']['name'] for p in profiles]
        recipient_names_str = "{} and {}".format(', '.join(recipient_names[:-1]), recipient_names[-1])
        body = """
        Hello, {}!
        You've matched on DayZero based on your interest! Please talk about what you are interested in via email!
        """.format(recipient_names_str)
        return textwrap.dedent(body).strip()

