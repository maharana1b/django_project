from . import views
from django.urls import path
from .views import diet,DietAPIView

urlpatterns = [
    path('diet/',diet,name='diet'),
    path('api/da/',DietAPIView.as_view()),
]