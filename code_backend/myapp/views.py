from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
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

client = Client("https://huggingfacem4-screenshot2html.hf.space/--replicas/9yh0v/")
client1 = Client("Qwen/CodeQwen1.5-7b-Chat-demo")



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

            result = client.predict(image_path, api_name="/model_inference")
            os.remove(image_path)

            return Response({'result': result[0]}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ModifyAnalyzeView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        if 'text' not in request.data:
            return Response({'msg': 'No text input provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        text_input = request.data['text']
        if text_input == '':
            return Response({'msg': 'No text input provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            result = client1.predict(query=text_input, history=[], system="""You are a HTML web designer.
                                     you modify the given code according to the requirement.Give me only modified code.
                                     Dont give anything than modified code.""", api_name="/model_chat")
            
            # Extract the HTML content from the tuple result
            if isinstance(result, tuple) and len(result) > 1 and isinstance(result[1], list) and len(result[1]) > 0 and isinstance(result[1][0], list) and len(result[1][0]) > 1:
                result = result[1][0][1]
            
            result = extract_html_content(result)
            result = extract_code_content(result)
            
            return Response({'result': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)