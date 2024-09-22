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
from .genini import advanced_chat, modify_chat
from .models import Profile
# from .serializers import ProfileSerializer
from rest_framework import generics
from .models import Profile, Image, ChatHistory
from .serializers import ProfileSerializer, ImageSerializer, ChatHistorySerializer


logger = logging.getLogger(__name__)


from django.shortcuts import render
from .models import User
# Create your views here.

from .serializers import MyTOPS, RegistrationSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, viewsets

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protectedView(request):
    output = f"Welcome {request.user}, Authentication SUccessful"
    return Response({'response':output}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_routes(request):
    data = [
        'api/token/refresh/',
        'api/register/',
        'api/token/'
    ]

    return Response(data)



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

            # client = Client("https://huggingfacem4-screenshot2html.hf.space/--replicas/xt2tt/", hf_token="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")
            # result = client.predict(image_path, api_name="/model_inference")
            result = advanced_chat(image_path)
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

        
class ModifyAnalyzeView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        if 'text' not in request.data:
            return Response({'msg': 'No text input provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        text_input = request.data['text']
        if text_input == '':
            return Response({'msg': 'No text input provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if 'result' is provided in the request data (if necessary)
        if 'result' not in request.data:
            return Response({'msg': 'No result input provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        result_input = request.data['result']
        
        try:
            # result = client1.predict(message=text_input,
            #                         request=0.8,
            #                         param_3=True,
            #                         param_4=1024,
            #                         api_name="/chat")
            result = modify_chat(text_input, result_input)
            
            # Extract the HTML content from the tuple result
            # if isinstance(result, tuple) and len(result) > 1 and isinstance(result[1], list) and len(result[1]) > 0 and isinstance(result[1][0], list) and len(result[1][0]) > 1:
            #     result = result[1][0][1]
            
            # result = extract_html_content(result)
            # result = extract_code_content(result)
            
            return Response({'result': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ProfileDetailView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class ChatHistoryViewSet(viewsets.ModelViewSet):
    queryset = ChatHistory.objects.all()
    serializer_class = ChatHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter the chat history by the authenticated user
        return ChatHistory.objects.filter(user=self.request.user).order_by('-timestamp')

    def perform_create(self, serializer):
        image_data = self.request.data.get('image', None)
        if image_data:
            image_serializer = ImageSerializer(data={'image': image_data})
            if image_serializer.is_valid():
                image_instance = image_serializer.save()
                # image_instance = Image()
                # image_instance.save_image_as_array(image_data)
                serializer.save(user=self.request.user, image=image_instance)
            else:
                return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        image_instance = instance.image
        self.perform_destroy(instance)
        if image_instance:
            image_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]


# class HistoryListCreateView(generics.ListCreateAPIView):
#     serializer_class = HistorySerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return History.objects.filter(user=self.request.user).order_by('-created_at')

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


        
        

