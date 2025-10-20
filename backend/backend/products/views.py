from rest_framework import viewsets
from rest_framework import permissions
from .models import Product
from .serializers import UpdateProductSerializer, CreateProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    A unified ViewSet for CRUD operations on Product.
    """
    
    queryset = Product.objects.all()


    # 1. Correct method for handling Permissions
    def get_permissions(self):
        # CRUD operations (create, update, delete) require authentication
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Must return a list of permission instances
            return [permissions.AllowAny()]  # Change to IsAuthenticated() in production
        
        # Read operations (list, retrieve) have no specific permission check (allows all)
        return [] 

    # 2. Correct method for handling Serializers
    def get_serializer_class(self):
        # Use the Update serializer for PUT/PATCH requests
        if self.action in ['update', 'partial_update']:
            return UpdateProductSerializer
        
        # Use the Create serializer for POST requests
        if self.action == 'create':
            return CreateProductSerializer

        return self.serializer_class