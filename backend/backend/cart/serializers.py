from rest_framework import serializers
from .models import Cart, CartItem 
from django.contrib.auth import get_user_model 
from products.models import Product 

from products.models import Product 

User = get_user_model() 

# --- Output Serializers ---

# Changed to ModelSerializer to correctly handle the imported Django Model.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # The Product model has these fields for display in the cart
        fields = ('id', 'name', 'price')


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) 
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity', 'total_price')

    def get_total_price(self, obj):
        # Calculation relies on the price field being correctly exposed by the Product foreign key
        return round(obj.quantity * obj.product.price, 2)

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.SerializerMethodField()
    cart_total = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField() 

    class Meta:
        model = Cart
        fields = ('id', 'user_id', 'items', 'total_items', 'cart_total', 'created_at')

    def get_user_id(self, obj):
        # Displays the user ID if logged in, otherwise 'Guest'
        return obj.user.id if obj.user else 'Guest'

    def get_total_items(self, obj):
        return obj.items.count()
    
    def get_cart_total(self, obj):
        total = sum(item.quantity * item.product.price for item in obj.items.all())
        return round(total, 2) 

# --- Input Serializers for Custom Actions ---

class AddItemSerializer(serializers.Serializer):
    product_id = serializers.PrimaryKeyRelatedField(
        # The queryset now directly references the imported Product model manager.
        queryset=Product.objects.all(), 
        label="Product ID"
    )
    quantity = serializers.IntegerField(min_value=1, default=1)

class UpdateItemSerializer(serializers.Serializer):
    cart_item_id = serializers.PrimaryKeyRelatedField(
        queryset=CartItem.objects.all(),
        label="Cart Item ID"
    )
    quantity = serializers.IntegerField(min_value=0) # 0 means deletion
