from django.urls import path
from .views import RegisterView, LoginView, AnalyzeView, ModifyAnalyzeView
from .views import protected_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/analyze/', AnalyzeView.as_view(), name='analyze'),
    path('api/modify/', ModifyAnalyzeView.as_view(), name='modify_analyze'),
    path('api/protected/', protected_view, name='protected'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
