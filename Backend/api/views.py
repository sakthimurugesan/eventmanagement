from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .filters import *
from .models import *
from .serializers import *


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = EventFilter


class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter


class AdminsViewSet(viewsets.ModelViewSet):
    queryset = Admins.objects.all()
    serializer_class = AdminSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AdminFilter

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReviewFilter

    def perform_create(self, serializer):
        user = self.request.user
        event_id = serializer.validated_data.get('eventId')
        user_id = serializer.validated_data.get('userId')
        print(event_id,user_id)
        # Check if the user has registered for the event
        print(Event_Register.objects.filter(userId=user_id, eventId=event_id).exists())
        if Event_Register.objects.filter(userId=user_id, eventId=event_id).exists():
            serializer.save()
        else:
            # Raise a ValidationError to inform the client that the review cannot be created
            raise serializers.ValidationError({'detail': 'User not registered for the event.'})

class EventRegisterViewSet(viewsets.ModelViewSet):
    queryset = Event_Register.objects.all()
    serializer_class = EventRegisterSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = EventRegisterFilter

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            # Send registration email (assuming `user` is available)
            user = request.user  # Adjust based on how you access the user
            print(request.data['firstName'])

            # self.send_registration_email(request.data['firstName'],request.data['email'],Event.objects.get(id=request.data['eventId']))
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_409_CONFLICT)
        except IntegrityError:
            return Response({"detail": "Integrity error occurred."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Log the error details for debugging
            print(f"Error: {e}")
            return Response({"detail": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def send_registration_email(self, firstName,email,event):
        subject = 'Thanks for registering'

        message = f'Hi {firstName},\n\nThank you for registering for the event {event}. Keep in touch for updates.'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [email]

        send_mail(subject, message, from_email, recipient_list)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ContactFilter


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Users.objects.get(email=email)
            serializer = UsersSerializer()
            token = serializer.generate_jwt_token(user)  # Generate the token
            serializer.send_password_reset_email(user)
            return Response({
                "status": "Password reset email sent",
                "token": token  # Include the token in the response
            }, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        print(new_password)
        print(token)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
            user = Users.objects.get(id=user_id)
            print(user_id)
            user.password = new_password
            user.save()
            return Response({"status": "Password has been reset successfully"}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)