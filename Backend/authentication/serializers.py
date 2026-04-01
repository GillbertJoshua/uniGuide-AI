from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate 
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import smart_str ,smart_bytes
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import *
from django.utils.encoding import smart_str , force_str
from django.utils.http import urlsafe_base64_encode , urlsafe_base64_decode
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password', '')
        password2 = attrs.get('password2', '')

        if password != password2:
            raise serializers.ValidationError("password do not match")

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            password=validated_data.get('password'),
        )

        return user
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=225)
    password = serializers.CharField(max_length=225, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        request = self.context.get('request')

        user = authenticate(request=request, email=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')

        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')

        tokens = user.tokens()

        return {
            'email': user.email,
            'full_name': user.get_full_name(),   # ✅ FIX
            'access_token': str(tokens.get('access')),
            'refresh_token': str(tokens.get('refresh')),  # ✅ FIX
        }
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 255)

    class Meta : 
        fields = {'email'}

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email =email)
            uidb64 =urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request = self.context.get('request')
            site_domain = get_current_site(request).domain
            relative_link = reverse('password-reset-confirm' ,kwargs={'uidb64' : uidb64 , 'token' : token})
            abslink = f"http://{site_domain}{relative_link}"
            email_body = f"""Subject: Reset Your Password - Uniguide AI

Hi,

We received a request to reset your password for your Uniguide AI account.

Click the link below to reset your password:
{abslink}

If you did not request this, please ignore this email. Your account is safe.

This link will expire in 10 minutes for security reasons.

Thanks,  
Uniguide AI Team"""
            
            data = {
                'email_body' : email_body,
                'email_subject' : "Rset Your Password - UniGuide AI ",
                'to_email' : user.email
            }
            send_normal_email(data)


        return super().validate(attrs) 
    
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length = 255 ,min_length = 6 , write_only = True)
    confirm_password = serializers.CharField(max_length = 255 ,min_length = 6 , write_only = True)
    uidb64 = serializers.CharField(write_only = True)
    token = serializers.CharField(write_only =True)

    class Meta:
        fields = ['password' , "confirm_password" ,'uidb64','token']

    def validate(self, attrs):
        try :
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')
            password = attrs.get('password')
            confirm_password = attrs.get('confirm_password')
            
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id = user_id)
            if not PasswordResetTokenGenerator().check_token(user , token):
                raise AuthenticationFailed("reset link is invalid or has expired" , 401)
            if password != confirm_password :
                raise AuthenticationFailed('Password do not match')
            user.set_password(password)
            user.save()
        except Exception as e :
            return AuthenticationFailed('Link is  invalid or expired')
         
        return user
    
