from rest_framework import serializers
from .models import CreateProduct
from .models import UpdateProduct
#from .models import DeleteProduct

class CreateProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model. 
    Defines the fields to be included in the API response.
    """
    
    # Optional: Use a SerializerMethodField for custom output, e.g., displaying currency
    formatted_price = serializers.SerializerMethodField()

    class Meta:
        # The model that the serializer should use
        model = CreateProduct
        # The fields that should be exposed in the API
        fields = (
            'id', 
            'name', 
            'slug', 
            'description', 
            'price', 
            'formatted_price', # Include the custom field
            'stock', 
            'available', 
            'created_at'
        )
        # Fields that should only be readable (e.g., automatically managed fields)
        read_only_fields = ('slug', 'created_at', 'updated_at')
        
    def get_formatted_price(self, obj):
        """
        Custom method to format the price for better presentation.
        """
        # A simple example: Ugx-500.00
        return f"Ugx-{obj.price:.2f}"


class UpdateProductSerializer(serializers.ModelSerializer):
    """
    Serializer for updating existing products.
    Only allows updating certain fields.
    """
    
    class Meta:
        model = CreateProduct
        fields = (
            'name', 
            'description', 
            'price', 
            'stock', 
            'available'
        )
        read_only_fields = ('slug', 'created_at', 'updated_at')

        def validate_price(self, value):
            """
            Ensure the price is non-negative.
            """
            if value < 0:
                raise serializers.ValidationError("Price must be a non-negative value.")
            return f"Ugx-{value:.2f}"


"""class DeleteProductSerializer(serializers.ModelSerializer):
    """
    Serializer for deleting products.
    Only requires the ID of the product to be deleted.
    """
    
    class Meta:
        model = CreateProduct
        fields = ('id',)    