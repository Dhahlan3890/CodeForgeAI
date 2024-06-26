from django.urls import path
from .views import RegisterView, AnalyzeView, ModifyAnalyzeView, AdvancedAnalyzeView, MyTokenObtainPairView, ProfileDetailView
# from .views import ProfileDetail
from .views import protectedView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('analyze/', AnalyzeView.as_view(), name='analyze'),
    path('advancedanalyze/', AdvancedAnalyzeView.as_view(), name='advancedanalyze'),
    path('modify/', ModifyAnalyzeView.as_view(), name='modify_analyze'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileDetailView.as_view(), name='profile-detail'),
    path('test/', protectedView, name="test"),

]
