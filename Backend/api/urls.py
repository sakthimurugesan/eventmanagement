from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'event_register', EventRegisterViewSet)
router.register(r'contactus', ContactViewSet)
router.register(r'events', EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
