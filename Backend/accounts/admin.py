from django.contrib import admin
from .models import UserAccount, HRUser, DepartmentUser, Recruit

class UserAccountAdmin(admin.ModelAdmin):
	list_display = ('id', 'first_name','middle_name','last_name', 'email', 'phone', 'user_type', 'is_active', 'is_staff', 'is_superuser')
	list_display_links = ('id', 'first_name')
	search_fields = ('first_name', 'email', 'phone')
	list_per_page = 25

admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(HRUser)
admin.site.register(DepartmentUser)
admin.site.register(Recruit)
