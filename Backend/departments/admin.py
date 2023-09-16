from django.contrib import admin
from .models import Department

class DepartmentAdmin(admin.ModelAdmin):
	list_display = ('name', 'no_of_employees', 'icon')
	list_display_links = ('name', )
	search_fields = ('name', )
	list_per_page = 25

admin.site.register(Department, DepartmentAdmin)