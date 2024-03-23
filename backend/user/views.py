from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from .models import User,Passwords
from .serializers import UserSerializer,LoginUserSerializer
import re
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny

# Create your views here.


def is_valid_email(email):
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if(re.search(regex,email)):
        return True
    else:
        return False


class SignUpView(APIView):
    def post(self,request):
        data = request.data
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        
        print("Request-data:",email,"--",username,"--",password)
        
        
        if not is_valid_email(email) or not email.strip():
            return Response({'error': 'Please Enter Valid Email'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not username or not username.strip(): 
            return Response({'error': 'Username cannot be blank or contain only spaces'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not password or not password.strip(): 
            return Response({'error': 'Password cannot be blank or contain only spaces'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email Already Exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=data)
        
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({
                'status': 200,
                'message': 'Registration Successful',
                'data': serializer.data
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
class RegisterUser(generics.CreateAPIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        username = request.data.get('username')
        print(email,username)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        response = super().create(request, *args, **kwargs)
        return Response({
            'data': response.data,
            'message': 'account created successfully'
        }, status=status.HTTP_201_CREATED)

        
        
class LoginView(generics.CreateAPIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = LoginUserSerializer
    
    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(
            data=request.data,context={'request':request}
        )
        print(serializer,"==data")
        if serializer.is_valid():
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

