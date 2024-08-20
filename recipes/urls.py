from django.urls import path
from .views import RecipeListCreate, RecipeRetrieveUpdateDestroy

urlpatterns = [
    path('recipes/', RecipeListCreate.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeRetrieveUpdateDestroy.as_view(), name='recipe-detail-update-destroy'),
]