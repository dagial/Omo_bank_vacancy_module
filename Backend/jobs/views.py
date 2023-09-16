from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework import permissions
from .models import Job
from .serializers import JobSerializer, JobDetailSerializer, JobUpdateSerializer, JobCreateSerializer, EducationalCreateSerializer
from .permissions import IsDepartmentUser, IsHRUser, IsStaff
from rest_framework import status
from rest_framework.response import Response

class JobListView(ListAPIView):
	permission_classes = (permissions.AllowAny, )
	queryset = Job.objects.order_by('-date_created').filter(is_published=True)
	serializer_class = JobSerializer

class JobView(RetrieveAPIView):
	permission_classes = (permissions.IsAuthenticated, )
	queryset = Job.objects.filter(is_published=True)
	serializer_class = JobDetailSerializer

class RequestListView(ListAPIView):
	permission_classes = (permissions.IsAuthenticated, IsStaff)
	serializer_class = JobDetailSerializer

	def get_queryset(self):
		if (self.request.user.user_type.lower() == 'department user'):
			udepartment = self.request.user.departmentuser.department
			return Job.objects.order_by('-date_created').filter(is_published=False)\
			.filter(department=udepartment)
		else:
			return Job.objects.order_by('-date_created').filter(is_published=False)

class JobUpdateView(UpdateAPIView):
	permission_classes = (permissions.IsAuthenticated, IsStaff)
	queryset = Job.objects.all()
	serializer_class = JobUpdateSerializer

class JobCreateView(CreateAPIView):
	permission_classes = (permissions.IsAuthenticated, IsStaff)
	
	def post(self, *args, **kwargs):
		if(self.request.data.get('job')):
			serializer = JobCreateSerializer(data=self.request.data.get('job'))
			if (serializer.is_valid()):
				serializer.save()
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		if (self.request.data['educational_requirements']):
			serializer = EducationalCreateSerializer(data=self.request.data.get('educational_requirements'))
			if (serializer.is_valid()):
				serializer.save(job=Job.objects.last())
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		return Response("Successful", status=status.HTTP_201_CREATED)

class JobCensorView(UpdateAPIView):
	permission_classes = (permissions.IsAuthenticated, IsHRUser)
	serializer_class = JobCreateSerializer
	queryset = Job.objects.all()