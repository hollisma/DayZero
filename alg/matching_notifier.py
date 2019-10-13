from dayzero_gmail import DayZeroGmail
import textwrap

class MatchingNotifier:
    def __init__(self):
        self.email = DayZeroGmail()

    def match(self, names):
        recipient_emails = [n for n in names]
        subject = "You've matched!"
        self.email.send(recipient_emails, subject, self.matching_message(names))

    def matching_message(self, names):
        # Please feel free to change the content of message using the information in profiles
        recipient_names = [n for n in names]
        recipient_names_str = "{} and {}".format(', '.join(recipient_names[:-1]), recipient_names[-1])
        body = """
        Hello, {}!
        You've matched on DayZero based on your interest! Please talk about what you are interested in via email!
        """.format(recipient_names_str)
        return textwrap.dedent(body).strip()

