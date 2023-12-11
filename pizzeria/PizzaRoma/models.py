from django.db import models

class Pizza(models.Model):
    tipo_pizza = models.CharField(max_length=100)
    precio = models.IntegerField()
    cantidad_vendida = models.IntegerField(default=0)  # Nuevo campo para rastrear las cantidades vendidas

    def __str__(self):
        return self.tipo_pizza
