from datetime import datetime, timedelta

import jwt
from django.core.mail import send_mail
from django.db import IntegrityError
from rest_framework import serializers, status
from rest_framework.response import Response
# serailizers
from eventmanagementBackend import settings
from .models import *


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"

    def create(self, validated_data):
        email = validated_data.get('email')
        if Users.objects.filter(email=email).exists():
            return Response({'errorcode': 1000, 'status': 'already'}, status=status.HTTP_400_BAD_REQUEST)
        user = super().create(validated_data)
        #self.send_registration_email(user)
        return user

    def send_registration_email(self, user):
        subject = 'Welcome to Our Platform'
        message = f'Hi {user.name},\n\nThank you for registering at our platform.'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)

    def send_password_reset_email(self, user):
        token = self.generate_jwt_token(user)
        reset_link = f"127.0.0.1:3000/reset-password?token={token}"

        subject = 'Password Reset Request'
        message = f'Hi {user.name},\n\nClick the link below to reset your password:\n{reset_link}'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)

    def generate_jwt_token(self, user):
        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=1),  # Token expires in 1 hour
            'iat': datetime.utcnow(),
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token


class EventRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event_Register
        fields = '__all__'

    def create(self, validated_data):
        user_id = validated_data.get('userId')
        event_id = validated_data.get('eventId')

        if Event_Register.objects.filter(userId=user_id, eventId=event_id).exists():
            # Raise an exception to be handled by the view
            raise serializers.ValidationError(
                {"detail": "You have already registered for this event."}
            )

        # Proceed with creating a new registration
        return super().create(validated_data)




class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    inclusive = serializers.SerializerMethodField()
    exclusive = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"

    def get_inclusive(self, obj):
        return obj.inclusive_list()

    def get_exclusive(self, obj):
        return obj.exclusive_list()

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admins
        fields = '__all__'