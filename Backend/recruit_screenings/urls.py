from django.urls import path
from .views import *

urlpatterns = [
	path('', ScheduleView.as_view(), name='schedule'),
	path('get/', CalendarView.as_view(), name='calendar'),
]