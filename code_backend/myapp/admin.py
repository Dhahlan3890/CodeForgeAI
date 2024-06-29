from django.contrib import admin
from myapp.models import Profile, User
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['username','email']

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['full_name', 'user', 'verified']

# class HistoryAdmin(admin.ModelAdmin):
#     list_display = ['id', 'user', 'created_at','result', 'image']  # Adjust fields as per your History model
#     list_filter = ['user', 'created_at']  # Optionally, add filters
#     list_editable = ['result', 'image']

admin.site.register(User,UserAdmin)
admin.site.register(Profile, ProfileAdmin)
# admin.site.register(History, HistoryAdmin)