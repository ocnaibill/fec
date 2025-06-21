from rest_framework import generics
from rest_framework.permissions import AllowAny 
from .models import CarouselImage
from .serializers import CarouselImageSerializer

class CarouselImageListView(generics.ListAPIView):
    queryset = CarouselImage.objects.all().order_by('uploaded_at')
    serializer_class = CarouselImageSerializer
    permission_classes = [AllowAny] 