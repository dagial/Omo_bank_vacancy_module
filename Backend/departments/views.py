from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework import permissions
from .models import Department
from .serializers import DepartmentSerializer
from jobs.permissions import IsStaff

class DepartmentView(ListAPIView):
	permission_classes = (permissions.IsAuthenticated, )
	queryset = Department.objects.all()
	serializer_class = DepartmentSerializer
