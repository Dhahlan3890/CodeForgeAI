from rest_framework_simplejwt.tokens import Token
from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Profile, Image, ChatHistory
import base64
import io

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MyTOPS(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio

        return token
    

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'username', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password':"Password Fields Didn't Match"}
            )
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])

        user.save()

        if "full_name" in validated_data:
            user.profile.full_name = validated_data['full_name']
            user.profile.save()

        return user
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'full_name', 'bio', 'verified']


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = '__all__'

    # @staticmethod
    # def get_image_format(image_bytes):
    #     from PIL import Image
    #     try:
    #         image = Image.open(io.BytesIO(image_bytes))
    #         return image.format.lower()  # Returns 'png', 'jpeg', etc.
    #     except Exception as e:
    #         print(f"Error determining image format: {e}")
    #         return None

    def get_image(self, obj):
        if obj.image:
            # If obj.image is already a base64 string, return it directly
            print(f"Type of obj.image: {type(obj.image)}")  # Debugging
            if isinstance(obj.image, str) and obj.image.startswith('data:'):
                print("Returning obj.image directly")  # Debugging
                return obj.image
            # If obj.image is bytes, encode it as base64
            elif isinstance(obj.image, bytes):
                print("Encoding obj.image as base64")
                # image_format = self.get_image_format(obj.image)
                # if image_format:
                base64_string = base64.b64encode(obj.image).decode('utf-8')
                base64_string = f"data:image/jpeg;base64,{base64_string}"
                print(f"Base64 string: {base64_string[:40]}")  # Debugging
                return base64_string

            # If obj.image is a string (but not base64), convert it to bytes first
            elif isinstance(obj.image, str):
                print("Converting obj.image to bytes and encoding as base64")
                return base64.b64encode(obj.image.encode('utf-8')).decode('utf-8')
        return None

class ChatHistorySerializer(serializers.ModelSerializer):
    image = ImageSerializer(required=False)

    class Meta:
        model = ChatHistory
        fields = '__all__'
        read_only_fields = ['user']


# class HistorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = History
#         fields = ['id', 'user', 'result', 'image', 'created_at']
#         read_only_fields = ['id', 'user', 'created_at']