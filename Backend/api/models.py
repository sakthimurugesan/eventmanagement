from django.db import models


class Event(models.Model):
    trend = models.PositiveIntegerField(help_text="1 for event to display in home page", default=0, blank=True)
    name = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    date = models.DateField()  # You might want to use DateField instead
    organizer = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='eventmanagement/img')

    capacity = models.IntegerField()
    small_description = models.TextField()
    location = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    guest = models.CharField(max_length=255)
    gmap = models.CharField(max_length=1000)
    organization_details = models.TextField()
    inclusions = models.TextField(help_text='Use semi-colon to separate')  # Store inclusions as a semicolon-separated string
    exclusions = models.TextField(help_text='Use semi-colon to separate')  # Store exclusions as a semicolon-separated string

    def inclusive_list(self):
        return self.inclusions.split('; ') if self.inclusions else []

    def exclusive_list(self):
        return self.exclusions.split('; ') if self.exclusions else []

    def __str__(self):
        return self.name


class Users(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    termsAccepted = models.BooleanField()

    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email


class Event_Register(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()
    userId = models.ForeignKey(Users, on_delete=models.CASCADE)
    eventId = models.ForeignKey(Event, on_delete=models.CASCADE)
    businessName = models.CharField(max_length=100)
    organizationName = models.CharField(max_length=100)
    businessAddress = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)

    def __str__(self):
        return "{} {}".format(self.eventId.name, self.userId.name)


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    sendCopy = models.BooleanField()

    def __str__(self): return self.email
