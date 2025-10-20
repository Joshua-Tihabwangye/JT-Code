from django.db import models
from django.utils.text import slugify

class Product(models.Model):
    # Core Fields
    name = models.CharField(max_length=200, db_index=True)
    
    # This field MUST be unique
    slug = models.SlugField(max_length=200, db_index=True, unique=True) 
    
    description = models.TextField(blank=True)
    
    # Financial/Stock Fields
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    category = models.TextField()
    stock = models.PositiveIntegerField()
    available = models.BooleanField(default=True)
    
    # Audit Fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'product'
        verbose_name_plural = 'products'
        # Defining the index for better query performance
        indexes = [
            models.Index(fields=['slug',]),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """
        Overrides save() to ensure the slug is unique before saving the product.
        This handles two scenarios:
        1. Initial creation (self.slug is empty)
        2. Name change or manual slug attempt
        """
        # 1. If the slug is not set (typical for new object creation)
        if not self.slug:
            # Generate initial slug from the name
            base_slug = slugify(self.name)
            self.slug = base_slug
            
            # 2. Check for existence and increment if necessary
            i = 1
            
            while Product.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                # If a duplicate exists, append a number, e.g., 'new-product-1'
                self.slug = f'{base_slug}-{i}'
                i += 1
                
        # Call the original save method to commit to the database
        super().save(*args, **kwargs)