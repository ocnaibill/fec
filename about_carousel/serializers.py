
from rest_framework import serializers
from .models import CarouselImage

class CarouselImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CarouselImage
        fields = ['id', 'title', 'image_url']

    def get_image_url(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            domain = "https://feconomiacriativa.catolica.edu.br"
            
            relative_url = obj.image.url
            
            return f"{domain}{relative_url}"
            
        return None