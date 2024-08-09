from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .filters import *
from .models import *
from .serializers import *


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class=EventFilter
class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter


class EventRegisterViewSet(viewsets.ModelViewSet):
    queryset = Event_Register.objects.all()
    serializer_class = EventRegisterSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = EventRegisterFilter


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ContactFilter
