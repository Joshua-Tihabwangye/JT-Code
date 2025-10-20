from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny 
from django.contrib.auth import get_user_model

# Import models from the current app
from .models import Cart, CartItem 

from .serializers import (
    CartSerializer, 
    AddItemSerializer, 
    UpdateItemSerializer, 
    CartItemSerializer
)

User = get_user_model()


class CartViewSet(viewsets.GenericViewSet):
    """
    A ViewSet for managing the user's active shopping cart.
    Allows both authenticated and anonymous users to perform cart operations.
    """
    # Allows any user (authenticated or anonymous) access to all endpoints
    permission_classes = [AllowAny] 
    
   
    serializer_class = CartSerializer 

    def get_cart(self):
        """
        Helper to get or create the current user's cart based on their User object.
        Works seamlessly for authenticated and anonymous users.
        """
        user = self.request.user
        # The user object is present even for anonymous users, allowing get_or_create to work.
        cart, created = Cart.objects.get_or_create(user=user)
        return cart


    # 1. VIEW CART (Equivalent to list/retrieve)
    def list(self, request):
        """Displays the contents of the current user's cart."""
        cart = self.get_cart()
        serializer = CartSerializer(cart) 
        return Response(serializer.data)

    # 2. ADD ITEM TO CART (Custom action)
    @action(detail=False, methods=['post'], url_path='add', serializer_class=AddItemSerializer)
    def add_item(self, request):
        """Adds a product to the cart or increases the quantity of an existing item."""
        
        # We use self.get_serializer() because we defined serializer_class in the @action decorator
        serializer = self.get_serializer(data=request.data) 
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']
        cart = self.get_cart()

        # Check stock (assuming your real Product model has a 'stock' field)
        if hasattr(product, 'stock') and product.stock < quantity:
            return Response(
                {"error": f"Only {product.stock} units of {product.name} are available in stock."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Try to find existing item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, 
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            # If item already exists, increase quantity
            cart_item.quantity += quantity
            cart_item.save()

        # Use the Item output serializer for the response
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    # 3. CHANGE ITEM QUANTITY (Custom action)
    @action(detail=False, methods=['patch'], url_path='update', serializer_class=UpdateItemSerializer)
    def update_item(self, request):
        """Changes the quantity of a specific cart item (or deletes if quantity is 0)."""
        
        # We use self.get_serializer() because we defined serializer_class in the @action decorator
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        cart_item_instance = serializer.validated_data['cart_item_id']
        new_quantity = serializer.validated_data['quantity']
        cart = self.get_cart()

        try:
            # Ensure the CartItem belongs to the current user's cart
            cart_item = cart.items.get(id=cart_item_instance.id)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "Cart item not found in your cart."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        if new_quantity <= 0:
            # If quantity is zero, delete the item 
            cart_item.delete()
            return Response(
                {"success": "Item removed from cart."},
                status=status.HTTP_204_NO_CONTENT
            )
        else:
            # Update quantity
            product = cart_item.product
            # Check stock
            if hasattr(product, 'stock') and product.stock < new_quantity:
                return Response(
                    {"error": f"Cannot set quantity to {new_quantity}. Only {product.stock} available."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            cart_item.quantity = new_quantity
            cart_item.save()
            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)

  
    # DELETE /carts/clear/
    @action(detail=False, methods=['delete'])
    def clear(self, request):
        """Removes all items from the cart."""
        cart = self.get_cart()
        cart.items.all().delete()
        
        return Response(
            {"success": "Cart cleared successfully."},
            status=status.HTTP_204_NO_CONTENT
        )
