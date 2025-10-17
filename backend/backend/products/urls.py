from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CreateProductViewSet
from .views import UpdateProductViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()

# The 'products' argument defines the URL prefix, e.g., /products/
router.register(r'Create', CreateProductViewSet, basename='create-product')
router.register(r'Update', UpdateProductViewSet, basename='update-product')

# The API URLs are now determined automatically by the router.
urlpatterns = router.urls