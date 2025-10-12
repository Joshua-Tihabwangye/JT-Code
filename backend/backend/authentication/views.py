from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, LoginSerializer, UserUpdateSerializer, FullUserUpdateSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from drf_spectacular.utils import extend_schema  # Import extend_schema
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import generics, permissions
from django.contrib.auth.models import User

from authentication.models import PasswordResetToken
from django.contrib.auth import get_user_model
from django.utils import timezone
import secrets
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from urllib.parse import urljoin



class SignupView(APIView):
    """
    View to register a new user.

    This endpoint allows users to create a new account by providing a username, password, email, first name, and last name.
    """
    authentication_classes = [JWTAuthentication]  # Ensure ONLY JWT is used
    permission_classes = [AllowAny]


    @extend_schema(request=UserSerializer)  # Specify request body schema
    def post(self, request):
        """
        Registers a new user.

        - **Request Body:** Requires username, password, password2, email, first_name, and last_name.
        - **Response:** Returns the created user data on success, or error details on failure.
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    View to log in an existing user.

    This endpoint allows users to log in with their username and password and receive an authentication token.
    """
    authentication_classes = [JWTAuthentication]  # Ensure ONLY JWT is used
    permission_classes = [AllowAny] 


    @extend_schema(request=LoginSerializer)  # Specify request body schema
    def post(self, request):
        """
        Logs in a user and returns an authentication token.

        - **Request Body:** Requires username and password.
        - **Response:** Returns an authentication token on success, or an error message on invalid credentials.
        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
            if user:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


    def post(self, request):
        try:
            # Extract the refresh token from the request data
            refresh_token = request.data.get('refresh_token')

            if refresh_token:
                # Blacklist the refresh token
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
            else:
                # Handle the case where the refresh token is missing (optional)
                return Response({"detail": "Logged out Successfully."}, status=status.HTTP_200_OK)

        except TokenError as e:
            # Handle invalid refresh token
            return Response({"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Handle other errors
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

        

class UserUpdateView(generics.UpdateAPIView):
    """
    View to update the currently authenticated user's profile.
    Requires JWT authentication.
    """
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return FullUserUpdateSerializer # Use the full serializer for PUT
        return UserUpdateSerializer # Use the partial serializer for PATCH

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


# add the user delete view
class UserDeleteByUsernameView(generics.DestroyAPIView):
    serializer_class = UserSerializer

    def destroy(self, request, username, *args, **kwargs):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(request=PasswordResetRequestSerializer)
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                token = secrets.token_urlsafe(50)
                expires_at = timezone.now() + timezone.timedelta(hours=1)
                PasswordResetToken.objects.create(user=user, token=token, expires_at=expires_at)

                # Generate the reset link (without the token)
                reset_link = urljoin(settings.FRONTEND_URL, "/reset-password")

                # Include the token in the email body
                email_body = f"""
                    Click the following link to reset your password: {reset_link}

                    For security reasons, please also use the following token to confirm your password reset:

                    {token}

                    This token will expire in 1 hour.
                """

                send_mail(
                    'Password Reset Request',
                    email_body,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return Response({'message': 'Password reset link sent to your email.'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(request=PasswordResetConfirmSerializer)
    def post(self, request): # Removed 'token' from URL parameter
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data.get('token') # Expect token in the request body
            new_password = serializer.validated_data['new_password']

            if not token:
                return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                reset_token = PasswordResetToken.objects.get(token=token, expires_at__gt=timezone.now())
                user = reset_token.user

                user.set_password(new_password)
                user.save()
                reset_token.delete()

                return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
            except PasswordResetToken.DoesNotExist:
                return Response({'message': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)