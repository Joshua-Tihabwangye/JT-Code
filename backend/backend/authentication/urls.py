# authentication/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import SignupView, LoginView, LogoutView, UserUpdateView, PasswordResetRequestView, PasswordResetConfirmView
from authentication import views

urlpatterns = [

    # 💥 THIS IS THE KEY ENDPOINT FOR GETTING BOTH TOKENS 💥
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    


    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    path('users/users/delete/<str:username>/', views.UserDeleteByUsernameView.as_view(), name='user-delete-username'),
    path('users/update/', UserUpdateView.as_view(), name='user-update'),

    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'), # Removed <str:token>
]