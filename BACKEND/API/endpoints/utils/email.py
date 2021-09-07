from flask_mail import Message
from flask import current_app
from app import mail


def send_email(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender=("YourTour", "webappengthesis@gmail.com")
    )
    mail.send(msg)