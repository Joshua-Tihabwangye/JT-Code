from rest_framework import viewsets
from rest_framework import permissions
from .models import CreateProduct
from .models import UpdateProduct
from .serializers import UpdateProductSerializer
from .serializers import CreateProductSerializer


class CreateProductViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for creating new products. Only accessible to authenticated users.
    """
    
    queryset = CreateProduct.objects.all()

    serializer_class = CreateProductSerializer

    #Only authenticated users can create products
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ['post', 'head', 'options']  # Limit to POST requests only

    def perform_create(self, serializer):
        """
        Save the new product instance.
        """
        serializer.save() 


class UpdateProductViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for updating existing products. Only accessible to authenticated users.
    """
    
    queryset = CreateProduct.objects.all()

    serializer_class = UpdateProductSerializer

    #Only authenticated users can update products
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ['put', 'patch', 'head', 'options']  # Limit to PUT and PATCH requests only

    def perform_update(self, serializer):
        """
        Update the product instance.
        """
        serializer.save()

"""class DeleteProductViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for deleting products. Only accessible to authenticated users.
    """
    
    queryset = CreateProduct.objects.all()

    serializer_class = DeleteProductSerializer

    #Only authenticated users can delete products
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ['delete', 'head', 'options']  # Limit to DELETE requests only

    def perform_destroy(self, instance):
        """
        Delete the product instance.
        """
        instance.delete()