from django.urls import path
from .views import RegisterView, StaffView, StaffCreateView, StaffUpdateView, SearchView, RegistrationEditView

urlpatterns = [
	path('register/', RegisterView.as_view(), name='register'),
	path('edit/<pk>', RegistrationEditView.as_view(), name='edit'),
	path('search/', SearchView.as_view(), name='search'),
	path('staff/<pk>', StaffView.as_view(), name='GetStaff'),
	path('staff/create/', StaffCreateView.as_view(), name='createStaff'),
	path('staff/update/<int:user>', StaffUpdateView.as_view(), name='updateStaff')
]