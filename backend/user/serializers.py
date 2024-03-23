from rest_framework import serializers
from .models import User,Passwords
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','username','password']
        extra_kwargs = {
            'password': {'write_only':True}
        }
        
        def create(self, validated_data):
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                instance.set_password(password)
            instance.save()
            return instance

class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=25)
    password = serializers.CharField(max_length=128,write_only=True)
    access_token = serializers.CharField(max_length=255,read_only=True)
    refresh_token = serializers.CharField(max_length=255,read_only=True)
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['email','password','access_token','refresh_token']
        
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        print(email,password,"---------")
        user = User.objects.filter(email=email).first()
        print("User:",user)
        if user is None:
            raise serializers.ValidationError("User does not exist.")
        if not user.is_active:
            raise AuthenticationFailed("User Blocked!")
        
        if user.password != password:
            raise serializers.ValidationError("incorrect Password")
        user_token = user.tokens()
        return {
            'email': user.email,
            'access_token': str(user_token.get('access')),
            'refresh_token': str(user_token.get('refresh')),
            'username':user.username
        }
    
class PasswordSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Passwords
        fields = ['user','password']