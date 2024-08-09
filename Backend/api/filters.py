from django_filters import rest_framework as filters
from .models import *


class UserFilter(filters.FilterSet):
    email = filters.CharFilter(field_name="email", lookup_expr='icontains')
    id = filters.NumberFilter(field_name="id", lookup_expr='icontains')

    class Meta:
        model = Users
        fields = ['email', 'id']


class ContactFilter(filters.FilterSet):
    email = filters.CharFilter(field_name="email", lookup_expr='icontains')
    id = filters.NumberFilter(field_name="id", lookup_expr='icontains')
    name = filters.CharFilter(field_name="name", lookup_expr='icontains')
    class Meta:
        model = Contact
        fields = ['email', 'id','name']


class EventRegisterFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name="id", lookup_expr='icontains')
    email = filters.CharFilter(field_name="email", lookup_expr='icontains')
    firstName = filters.CharFilter(field_name="firstName", lookup_expr='icontains')
    lastName = filters.CharFilter(field_name="lastName", lookup_expr='icontains')
    age = filters.NumberFilter(field_name="age", lookup_expr='icontains')
    businessName = filters.CharFilter(field_name="businessName", lookup_expr='icontains')
    organizationName = filters.CharFilter(field_name="organizationName", lookup_expr='icontains')
    businessAddress = filters.CharFilter(field_name="businessAddress", lookup_expr='icontains')
    city = filters.CharFilter(field_name="city", lookup_expr='icontains')
    state = filters.CharFilter(field_name="state", lookup_expr='icontains')
    zipcode = filters.CharFilter(field_name="zipcode", lookup_expr='icontains')

    class Meta:
        model = Event_Register
        fields = [
            'firstName',
            'lastName',
            'email',
            'age',
            'businessName',
            'organizationName',
            'businessAddress',
            'city',
            'state',
            'zipcode',
            'id'
        ]


class EventFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name="id", lookup_expr='icontains')

    class Meta:
        model = Event
        fields = ['id']
