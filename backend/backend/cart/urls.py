from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet

# Create a router and register our ViewSets with it.
router = DefaultRouter()

# Register the CartViewSet under the path 'carts'
router.register(r'carts', CartViewSet, basename='cart')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
