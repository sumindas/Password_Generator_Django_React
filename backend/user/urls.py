from django.urls import path
from .views import RegisterUser,LoginView,SignUpView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/',RegisterUser.as_view(),name='signup'),
    path('login/',LoginView.as_view(),name='login'),
    path('token/refresh',TokenRefreshView.as_view(),name= 'token_refresh'),
    path('create/',SignUpView.as_view(),name='signup')
]
