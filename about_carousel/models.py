from django.db import models

class CarouselImage(models.Model):
    title = models.CharField(max_length=100, help_text="Título da imagem (para SEO e acessibilidade)")
    image = models.ImageField(upload_to='about_carousel/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Imagem do Carrossel"
        verbose_name_plural = "Imagens do Carrossel"