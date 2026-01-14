from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Chat

# Create your views here.

@csrf_exempt
def chat_view(request):
    if request.method == 'GET':
        # Alle Chat-Nachrichten abrufen
        messages = Chat.objects.all()
        data = []
        for msg in messages:
            data.append({
                'id': msg.id,
                'name': msg.name,
                'message': msg.message,
                'created_at': msg.created_at.isoformat()
            })
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        # Neue Chat-Nachricht erstellen
        try:
            body = json.loads(request.body)
            name = body.get('name')
            message = body.get('message')

            if not name or not message:
                return JsonResponse({'error': 'Name and message are required'}, status=400)

            chat = Chat.objects.create(name=name, message=message)
            return JsonResponse({
                'id': chat.id,
                'name': chat.name,
                'message': chat.message,
                'created_at': chat.created_at.isoformat()
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
