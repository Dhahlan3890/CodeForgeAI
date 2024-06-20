from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
# from .serializers import UserSerializer, HistorySerializer
import bcrypt
import jwt
import datetime
from django.conf import settings
from rest_framework.parsers import MultiPartParser, JSONParser
from gradio_client import Client
import os
import tempfile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import re
from .genini import chat, image_prompt
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
import logging
# from rest_framework import generics


logger = logging.getLogger(__name__)

class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({'msg': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the token with Google
            id_info = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
            email = id_info.get('email')
            name = id_info.get('name')

            # Check if the user exists, if not, create a new one
            user, created = User.objects.get_or_create(email=email, defaults={'name': name})
            if created:
                user.set_unusable_password()  # Optional: make sure the user can't log in with a password
                user.save()

            # Generate a JWT token for the user
            jwt_token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }, settings.SECRET_KEY, algorithm='HS256')

            return Response({'token': jwt_token}, status=status.HTTP_200_OK)
        except ValueError:
            return Response({'msg': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# 
# client1 = Client("eswardivi/Phi-3-mini-128k-instruct")



def extract_html_content(text):
    pattern = re.compile(r'<html.*?>(.*?)</html>', re.DOTALL)
    match = pattern.search(text)
    if match:
        return match.group(1).strip()
    else:
        return "No HTML content found"
    
def extract_code_content(text):
    pattern = re.compile(r'<head.*?>.*?</head>', re.DOTALL | re.IGNORECASE)
    cleaned_text = re.sub(pattern, '', text)
    return cleaned_text.strip()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "This is a protected view"})

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return Response({'msg': 'Please enter all fields'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'msg': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        user = User(name=name, email=email, password=hashed_password)
        user.save()

        return Response({'msg': 'User registered successfully'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return Response({'msg': 'Please enter all fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'msg': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }, settings.SECRET_KEY, algorithm='HS256')

            return Response({'token': token}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

class AnalyzeView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        if 'file' not in request.FILES:
            return Response({'msg': 'No file part'}, status=status.HTTP_400_BAD_REQUEST)
        file = request.FILES['file']
        if file.name == '':
            return Response({'msg': 'No selected file'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.name)[1]) as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
                image_path = temp_file.name

            # result = client.predict(image_path, api_name="/model_inference")
            result = image_prompt(image_path)
            result = extract_html_content(result)
            os.remove(image_path)

            # history = History.objects.create(
            #     user=request.user,
            #     image=file,
            #     result=result
            # )
            # history.save()

            return Response({'result': result}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error during file processing: {e}", exc_info=True)
            return Response({'msg': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AdvancedAnalyzeView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        if 'file' not in request.FILES:
            return Response({'msg': 'No file part'}, status=status.HTTP_400_BAD_REQUEST)
        file = request.FILES['file']
        if file.name == '':
            return Response({'msg': 'No selected file'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.name)[1]) as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
                image_path = temp_file.name

            client = Client("https://huggingfacem4-screenshot2html.hf.space/--replicas/xt2tt/", hf_token="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")
            result = client.predict(image_path, api_name="/model_inference")
            os.remove(image_path)

            # history = History.objects.create(
            #     user=request.user,
            #     image=file,
            #     result=result
            # )
            # history.save()

            return Response({'result': result[0]}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error during file processing: {e}", exc_info=True)
            return Response({'msg': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class ModifyAnalyzeView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        if 'text' not in request.data:
            return Response({'msg': 'No text input provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        text_input = request.data['text']
        if text_input == '':
            return Response({'msg': 'No text input provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # result = client1.predict(message=text_input,
            #                         request=0.8,
            #                         param_3=True,
            #                         param_4=1024,
            #                         api_name="/chat")
            result = chat(text_input)
            
            # Extract the HTML content from the tuple result
            if isinstance(result, tuple) and len(result) > 1 and isinstance(result[1], list) and len(result[1]) > 0 and isinstance(result[1][0], list) and len(result[1][0]) > 1:
                result = result[1][0][1]
            
            result = extract_html_content(result)
            result = extract_code_content(result)
            
            return Response({'result': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class UserHistoryView(generics.ListAPIView):
#     serializer_class = HistorySerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return History.objects.filter(user=self.request.user).order_by('-created_at')
        

        

