"""diet_plan URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import views
from django.contrib import admin
from django.urls import path,include
from longivity.views import SamApi,MamApi,sam,mam
from .views import signin,logout_view,home
from chatbot.views import chatbot



urlpatterns = [
    path('',include('diet.urls')),
    path('',signin, name ='login' ),
    path('home/',home,name='home'),
    path('admin/', admin.site.urls),
    path('api/sam/',SamApi.as_view()),
    path('api/mam/',MamApi.as_view()),   
    path('api/',include('rest_framework.urls')), 
    path('api/',include('chatbot.urls')),
    path('logout/',logout_view, name ='logout'),
    path('sam/',sam,name='sam'),
    path('mam/',mam,name='mam'),
    path('chatbot/',chatbot,name='chatbot'),
]
