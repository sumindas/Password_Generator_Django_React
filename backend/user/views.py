from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status,generics,permissions
from .models import User,Passwords
from .serializers import UserSerializer,LoginUserSerializer,PasswordSerializer
import re
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


# Create your views here.


def is_valid_email(email):
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if(re.search(regex,email)):
        return True
    else:
        return False


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
        
class StorePasswordView(generics.CreateAPIView):
    queryset = Passwords.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [IsAuthenticated]
    print(IsAuthenticated)
    
    def perform_create(self, serializer):
        print(self.request.user,"------")
        serializer.save(user=self.request.user)

class RetrievePasswordView(generics.ListAPIView):
    serializer_class = PasswordSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Passwords.objects.filter(user=self.request.user)
    
class DeletePasswordView(generics.DestroyAPIView):
    queryset = Passwords.objects.all()
    print("--------",queryset)
    serializer_class = PasswordSerializer
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        password_id = kwargs.get('pk')
        print(password_id,"----")
        password = get_object_or_404(Passwords,id=password_id,user=self.request.user)
        password.delete()
        return Response(status=204)