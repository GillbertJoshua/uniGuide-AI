import random
from django.conf import settings
from django.core.mail import EmailMessage
from .models import *


def generateOtp():
  otp = ""

  for i in range(6):
    otp +=str(random.randint(1,9)) 
    
  return otp

def send_code_to_user(email):
  Subject = "One Time passcode for Email verification"
  otp_code =generateOtp()
  print(otp_code)
  print("Sending OTP to:", email)
  user = User.objects.get(email =email)
  current_site= 'myAuth.com'
  email_body =  f"""
                    Hi,
                    {user.first_name} {user.last_login}
                    Welcome to UniGuide AI!


                    To complete your registration, please use the OTP below:

                    🔐 OTP Code: {otp_code}

                    This code will expire in 5 minutes.

                    For your security, do not share this code with anyone.

                    If you didn’t request this, you can safely ignore this email.
                    Thanks for signing {current_site}
                    Best regards,
                    UniGuide AI Team
                    """
  from_email=settings.DEFAULTS_FROM_EMAIL

  OneTimePassword.objects.create(user = user ,code = otp_code)

  d_email = EmailMessage(subject= Subject , body = email_body ,from_email =  from_email , to = [email])
  d_email.send(fail_silently=True)
  print("Sending OTP to:", email)

                      
def send_normal_email(data):
  email = EmailMessage(
    subject= data['email_subject'],
    body = data['email_body'],
    from_email = settings.EMAIL_HOST_USER,
    to = [data['to_email']]
  )
  email.send()


