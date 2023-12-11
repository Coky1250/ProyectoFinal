from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import NewUserForm
from django.http import JsonResponse
from django.db import transaction
from .models import Pizza


def index(request):
    return render(request, "index.html")

def estadisticas(request):
    return render(request, 'estadisticas.html')

@login_required
def menu(request):
    return render(request, "Menu.html")

def login(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            print(f"Usuario autenticado: {request.user.is_authenticated}")
            messages.success(request, "Inicio de sesión exitoso")
            return redirect('menu')
    return render(request, 'login.html', context={'form': NewUserForm()})

def registro(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user) 
            messages.success(request, "Registro Exitoso")
            return redirect('index')
        messages.error(request, "No fue posible el Registro. Información Invalida")
    form = NewUserForm()
    context = {"register_form": form}
    return render(request, "register.html", context=context)


def procesar_pedido(request):
    # Obtén datos del pedido, incluido el tipo de pizza y el precio
    tipo_pizza = request.POST.get('tipo_pizza')
    precio = int(request.POST.get('precio'))

    try:
        # Intenta convertir el precio a un entero
        precio_entero = int(precio)
    except ValueError as e:
        print("Error al convertir a entero:", e)
        return JsonResponse({"mensaje": "Error en la solicitud."})

    # Busca si ya existe una pizza del mismo tipo en la base de datos
    pizza_existente = Pizza.objects.filter(tipo_pizza=tipo_pizza).first()

    if pizza_existente:
        # Si existe, incrementa la cantidad vendida
        pizza_existente.cantidad_vendida += 1
        pizza_existente.save()
    else:
        # Si no existe, crea una nueva pizza
        pizza_nueva = Pizza.objects.create(tipo_pizza=tipo_pizza, precio=precio_entero)
        pizza_nueva.cantidad_vendida += 1
        pizza_nueva.save()

    return JsonResponse({'mensaje': 'Pedido procesado con éxito.'})
    
def obtener_datos_grafico(request):
    # Obtener datos de la base de datos (usando el modelo Pizza)
    pizzas = Pizza.objects.all()
    
    # Crear listas para etiquetas y datos
    labels = []
    data = []

    for pizza in pizzas:
        labels.append(str(pizza.tipo_pizza))
        data.append(pizza.cantidad_vendida)  # Cambiado a cantidad_vendida

    # Devolver datos en formato JSON
    return JsonResponse({
        'labels': labels,
        'data': data,
    })