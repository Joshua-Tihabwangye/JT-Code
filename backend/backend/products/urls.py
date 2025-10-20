from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet


# Create a router and register our viewsets with it.
router = DefaultRouter()

# The 'products' argument defines the URL prefix, e.g., /products/
router.register(r'products', ProductViewSet, basename='create-product')


# The API URLs are now determined automatically by the router.
urlpatterns = router.urls