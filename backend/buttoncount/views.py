from django.shortcuts import render
from rest_framework import viewsets
from .models import Button
from .serializers import ButtonSerializer

from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
# Create your views here.


class ButtonView(viewsets.ModelViewSet):
    def GET(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)
    serializer_class = ButtonSerializer
    queryset = Button.objects.all()
