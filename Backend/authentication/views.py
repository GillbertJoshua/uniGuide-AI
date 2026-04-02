from .serializers import *
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .utils import *
from .models import *
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str , DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        print("REQUEST DATA:", request.data)

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()

            send_code_to_user(user.email)

            return Response({
                'data': serializer.data,
                'message': f"{user.first_name} thanks for signing up, a passcode was sent",
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class VerifyUserEmail(APIView):
    def post(self, request):
        otpcode = request.data.get('otp')  

        if not otpcode:
            return Response({
                'message': 'OTP not provided'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_code_obj = OneTimePassword.objects.get(code=otpcode)
            user = user_code_obj.user

            if not user.is_verified:
                user.is_verified = True
                user.save()

                return Response({
                    'message': 'Account email verified successfully'
                }, status=status.HTTP_200_OK)

            return Response({
                'message': 'User already verified'
            }, status=status.HTTP_200_OK)

        except OneTimePassword.DoesNotExist:
            return Response({
                'message': 'Invalid OTP'
            }, status=status.HTTP_404_NOT_FOUND)
        
class LoginUerView(GenericAPIView):
    serializer_class = LoginSerializer
    def post(self ,request):
        serializer = self.serializer_class(data = request.data , context = {'request':request })
        serializer.is_valid(raise_exception= True)
        return Response(serializer.validated_data ,status=status.HTTP_200_OK)
    
    

class TestAuthenticationView(GenericAPIView):
    permission_classes = [IsAuthenticated]


    def get(self , request):
        data = { 
            'msg': 'Its Works'
        }
        return Response(data ,status=status.HTTP_200_OK)

class PasswordResetRequestView(GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [AllowAny]

    def post(self , request):
        serializers = self.serializer_class(data = request.data ,context = {'request' : request})
        serializers.is_valid(raise_exception=True)
        return Response ({
            'message' : 'A link has been sent to your email to reset your password'
        } , status= status.HTTP_200_OK)
    
class PasswordResetConfirm(GenericAPIView):
    def get(self , request ,uidb64 , token): 
        try:
            user_id= smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id = user_id)
            print("PASSWORD RESET EMAIL TRIGGERED")
            if not PasswordResetTokenGenerator().check_token(user , token):
                return Response({
                    'message' : 'token is invalid or has expired'
                } , status=status.HTTP_401_UNAUTHORIZED)
            return Response({
                'success' : True,
                'message' : "Credentials id valid ",
                'uidb64' : uidb64 ,
                'token' : token
            } , status= status.HTTP_200_OK)
        except DjangoUnicodeDecodeError:
            return Response({
                'message' : 'Token is invalid or has expired'
            },status= status.HTTP_401_UNAUTHORIZED)
        
class SetNewPassword(GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    def patch(self ,request):
        serializers = self.serializer_class(data = request.data)
        serializers.is_valid(raise_exception=True)
        return Response({
            'message' : "password reset successful",
             
        },status= status.HTTP_200_OK)
    

class LogOutUserView(GenericAPIView):
    serializer_class = LogOutUserSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializers = self.serializer_class(data = request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return Response(status= status.HTTP_204_NO_CONTENT)
    


    

        


