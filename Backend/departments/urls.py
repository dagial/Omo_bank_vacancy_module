from django.urls import path
from .views import DepartmentView

urlpatterns = [
	path('', DepartmentView.as_view())
]