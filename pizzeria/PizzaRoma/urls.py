from django.urls import path

from . import views

urlpatterns = [
    #ruta, vista, nombre interno
    path('',views.index, name='index'),
    path('login/',views.login, name='login'),
    path('menu/',views.menu, name='menu'),
    path('register/',views.registro,name='registro'),
    path('estadisticas/',views.estadisticas,name='estadisticas'),
    path('procesar_pedido/', views.procesar_pedido, name='procesar_pedido'),
    path('obtener_datos_grafico/', views.obtener_datos_grafico, name='obtener_datos_grafico'),
]