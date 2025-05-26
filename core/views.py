from django.http import JsonResponse

def hello(request):
    return JsonResponse({"mensagem": "Olá do Django!"})
