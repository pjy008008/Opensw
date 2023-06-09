from django.urls import path, include
#from . import views
from rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer
from .views import get_name


urlpatterns =[
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/',include('rest_auth.urls')),
    #path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('', include('allauth.urls')),
    path('rest-auth/registration/', RegisterView.as_view(serializer_class=CustomRegisterSerializer), name='rest_register'),
    path('get/', get_name, name='get_username'),
 ]