from dotenv import load_dotenv
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.utils import formatdate
import ssl

class DayZeroGmail:
    def __init__(self):
        load_dotenv()
        self.mail_address = os.getenv('EMAIL_ADDRESS')

    def send(self, recipients, subject, body, img=None):
        msg = MIMEMultipart()
        msg['Subject'] = subject
        msg['From'] = self.mail_address
        msg['To'] = ', '.join(recipients)
        msg['Date'] = formatdate()
        text = MIMEText(body)
        msg.attach(text)
        if img:
            image_data = open(img, 'rb').read()
            image = MIMEImage(image_data, name=os.path.basename(img))
            msg.attach(image)

        smtpobj = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
        smtpobj.login(self.mail_address, os.getenv('PASSWORD'))
        smtpobj.sendmail(self.mail_address, recipients, msg.as_string())
        smtpobj.close()