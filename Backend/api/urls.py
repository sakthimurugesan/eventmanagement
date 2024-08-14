from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'event_register', EventRegisterViewSet)
router.register(r'contactus', ContactViewSet)
router.register(r'review', ReviewViewSet)
router.register(r'admins', AdminsViewSet)
router.register(r'events', EventViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
