
from django.contrib import admin
from .models import Button

# Register your models here.


class ButtonAdmin(admin.ModelAdmin):
    list_display = ['id', 'count']


admin.site.register(Button, ButtonAdmin)
