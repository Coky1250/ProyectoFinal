# Generated by Django 4.2.7 on 2023-12-10 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PizzaRoma', '0003_pizza_delete_pizzacompra'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pizza',
            name='precio',
            field=models.IntegerField(),
        ),
    ]