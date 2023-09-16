from django.contrib import admin
from .models import Job

class JobAdmin(admin.ModelAdmin):
	list_display = ('id', 'department', 'work_unit', 'title', 'description', 'experience_required', 'branch', 'grade', 'salary', 'vacant', 'gender_required', 'deadline', 'is_published')
	list_display_links = ('id', 'title')
	search_fields = ('title', 'description', 'branch', 'work_unit')
	list_per_page = 25

admin.site.register(Job, JobAdmin)