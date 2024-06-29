from django.urls import path, include
from .views import RegisterView, AnalyzeView, ModifyAnalyzeView, AdvancedAnalyzeView, MyTokenObtainPairView, ProfileDetailView, ChatHistoryViewSet, ImageViewSet
# from .views import ProfileDetail
from .views import protectedView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'chathistory', ChatHistoryViewSet, basename='chathistory')
router.register(r'images', ImageViewSet, basename='images')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('analyze/', AnalyzeView.as_view(), name='analyze'),
    path('advancedanalyze/', AdvancedAnalyzeView.as_view(), name='advancedanalyze'),
    path('modify/', ModifyAnalyzeView.as_view(), name='modify_analyze'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileDetailView.as_view(), name='profile-detail'),
    # path('history/', HistoryListCreateView.as_view(), name='history-list-create'),
    path('test/', protectedView, name="test"),
    path('', include(router.urls)),

]
