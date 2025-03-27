from django.db import models

class Property(models.Model):
    location = models.CharField(max_length=255)
    size = models.FloatField()  # in square feet
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    amenities = models.TextField()  # Comma-separated list
    price = models.FloatField()  # This will store actual price (for training)

    def __str__(self):
        return f"{self.location} - {self.size} sqft"