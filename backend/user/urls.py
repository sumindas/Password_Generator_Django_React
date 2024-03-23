from django.urls import path
from .views import RegisterUser,LoginView,StorePasswordView,RetrievePasswordView,DeletePasswordView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/',RegisterUser.as_view(),name='signup'),
    path('login/',LoginView.as_view(),name='login'),
    path('token/refresh',TokenRefreshView.as_view(),name= 'token_refresh'),
    path('store-password/', StorePasswordView.as_view(), name='store-password'),
    path('retrieve-passwords/', RetrievePasswordView.as_view(), name='retrieve-passwords'),
    path('delete-password/<int:pk>/', DeletePasswordView.as_view(), name='delete-password'),
]
