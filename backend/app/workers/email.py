import os
import smtplib
from email.message import EmailMessage
from arq import Worker
from typing import Dict, Any

# A mock email sending function for now
async def send_email_task(ctx: Dict[Any, Any], to_email: str, subject: str, body: str):
    print(f"Mock sending email to {to_email}: {subject}")
    # In production, configure real SMTP here
    # msg = EmailMessage()
    # msg.set_content(body)
    # msg['Subject'] = subject
    # msg['From'] = os.getenv("SMTP_USER", "noreply@botanic.com")
    # msg['To'] = to_email
    # server = smtplib.SMTP(os.getenv("SMTP_HOST", "localhost"), int(os.getenv("SMTP_PORT", 587)))
    # server.starttls()
    # server.login(os.getenv("SMTP_USER", ""), os.getenv("SMTP_PASS", ""))
    # server.send_message(msg)
    # server.quit()
    return True
