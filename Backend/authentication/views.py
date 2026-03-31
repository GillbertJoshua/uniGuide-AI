from .serializers import *
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .utils import *


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        print("REQUEST DATA:", request.data)

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()  # ✅ FIX

            send_code_to_user(user.email)

            return Response({
                'data': serializer.data,
                'message': f"{user.first_name} thanks for signing up, a passcode was sent",
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)