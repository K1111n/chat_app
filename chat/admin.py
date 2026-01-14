from django.contrib import admin
from .models import Chat

# Register your models here.

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ['name', 'message', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'message']
