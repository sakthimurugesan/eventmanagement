from django.contrib import admin
from django.utils.safestring import mark_safe
from django_summernote.admin import SummernoteModelAdmin

from .views import *


class EventAdmin(SummernoteModelAdmin):
    list_display = ('name', 'date', 'organizer', 'image_preview')
    list_filter = ['name']
    search_fields = ['name', 'type']
    readonly_fields = ('image_preview',)
    summernote_fields = ['description', 'organization_details', 'inclusions', 'exclusions']

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" style="max-height: 200px;"/>')
        return "No image available"

    image_preview.short_description = 'Image Preview'


class ContactAdmin(SummernoteModelAdmin):
    summernote_fields = ['message']


admin.site.register(Event, EventAdmin)
# Register your models here.
admin.site.register(Users)
admin.site.register(Event_Register)
admin.site.register(Contact, ContactAdmin)
