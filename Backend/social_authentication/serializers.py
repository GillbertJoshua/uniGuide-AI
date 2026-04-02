from rest_framework import serializers   # DRF serializer base class
from .utils import Google , register_social_user   # Custom utility functions for Google auth
from django.conf import settings   # Access project settings (for client ID)
from rest_framework.exceptions import AuthenticationFailed   # Exception for auth failure


# Serializer for handling Google Sign-In
class GoogleSignInSerializers(serializers.Serializer):

  access_token = serializers.CharField(min_length = 6)   # Google access token sent from frontend

  # Custom validator for access_token field
  def validate_access_token(self ,access_token):

    google_user_data = Google.validate(access_token)   # Validate token with Google API and get user data

    try:
      userid = google_user_data['sub']   # Unique user ID from Google
    except :
      serializers.ValidationError("This token is invalid or has expired")   # Error if token invalid

    # Verify token audience matches your app's client ID
    if google_user_data['aud'] != settings.GOOGLE_CLIENT_ID:
      raise AuthenticationFailed(detail='Could not verify User')

    # Extract user details from Google response
    email = google_user_data['email']
    first_name = google_user_data['given_name']
    last_name = google_user_data['family_name']
    provider = "google"   # Authentication provider

    # Register or login user using social auth utility function
    return register_social_user(provider ,  email ,first_name, last_name )