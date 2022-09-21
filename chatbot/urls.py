from django.urls import path
from .views import *

urlpatterns = [
    path('hindi/',ChatHindi.as_view()),
    path('english/',ChatEnglish.as_view()),
    path('bangali/',ChatBengali.as_view()),
    path('tamil/',ChatTamil.as_view()),
    path('telugu/',ChatTelugu.as_view()),
    path('malayalam/',ChatMalayalam.as_view()),
    path('kannada/',ChatKannada.as_view()),
    path('marathi/',ChatMarathi.as_view()),
    path('odia/',ChatOdia.as_view()),
    path('gujurati/',ChatGujurati.as_view()),
]
