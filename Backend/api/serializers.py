from django.core.mail import send_mail
from rest_framework import serializers,status
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
        self.send_registration_email(user)
        return user

    def send_registration_email(self, user):
        subject = 'Welcome to Our Platform'
        message = f'Hi {user.name},\n\nThank you for registering at our platform.'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)

class EventRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event_Register
        fields = '__all__'

    def create(self, validated_data):
        user=super().create(validated_data)
        self.send_registration_email(user)
        return user

    def send_registration_email(self, user):
        subject = 'Thanks for registering'
        message = f'Hi {user.firstName},\n\nThank you for registering the event '
        
        message+=user.eventId.name+'\n\n Keep in touch for updates'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)






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

