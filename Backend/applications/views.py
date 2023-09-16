from django.shortcuts import render
from django.core.mail import EmailMessage
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView
from jobs.permissions import *
from .serializers import ApplicationSerializer, ApplicationListSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime, timedelta
from rest_framework import status
from .models import Application
from accounts.models import *
from recruit_screenings.models import Screening
from jobs.models import Job
from django.conf import settings

class ApplicationView(CreateAPIView):
	permission_classes = (permissions.IsAuthenticated, IsRecruit)
	serializer_class = ApplicationSerializer

	def perform_create(self, serializer):
		instance = serializer.save()
		subject = 'Application Submitted'
		message = f'Your application for {instance.job.title} position has been submitted successfully.\
		 \nOur team will review your application and get back to you shortly.\n\
		 \nRegards,\nOmo Bank Recruitment Team'
		to_email = instance.user.email
		email = EmailMessage(subject, message, to=[to_email])
		email.send()

class ApplicationUpdateView(UpdateAPIView):
	permission_classes = (permissions.IsAuthenticated, IsHRUser)
	serializer_class = ApplicationSerializer
	queryset = Application.objects.all()

class ApplicationListView(ListAPIView):
	permission_classes = (permissions.IsAuthenticated, )
	serializer_class = ApplicationListSerializer
	
	def get_queryset(self):
		param = self.request.query_params.get("Type")
		if (self.request.user.user_type.lower() == 'recruit'):
			return Application.objects.filter(user=self.request.user)
		elif (self.request.user.user_type.lower() == 'department user'):
			department = self.request.user.departmentuser.department
			if (param == 'Application'):
				return Application.objects.filter(job__department=department).order_by('application_date')
			else:
				return Application.objects.filter(job__department=department)\
				.filter(is_candidate=True).order_by('application_date')
		else:
			if (param == 'Candidate'):
				return Application.objects.filter(is_candidate=True).order_by('application_date')
			elif (param == 'Shortlist'):
				return Application.objects.filter(is_shortlisted=True).order_by('application_date')
			return Application.objects.all().order_by('application_date')

class ApplicationRetrieveView(RetrieveAPIView):
	permission_classes = (permissions.IsAuthenticated, IsStaff)
	serializer_class = ApplicationListSerializer
	queryset = Application.objects.all()

class DisplayView(APIView):
	permission_classes = (permissions.IsAuthenticated, )
	def get(self,*args,**kwargs):
		if self.request.user.user_type.lower()=="department user":
			department = self.request.user.departmentuser.department
			end = datetime.now()
			start = end - timedelta(days=7)
			new_application = Application.objects.filter(job__department=department)\
			.filter(application_date__range=[start, end]).count()
			new_candidates= Application.objects.filter(job__department=department)\
			.filter(application_date__range=[start, end]).filter(is_candidate=True).count()
			invited_for_screening=Screening.objects.filter(application__job__department=department)\
			.filter(screening_type='Test').count()
			invited_for_interview=Screening.objects.filter(application__job__department=department)\
			.filter(screening_type='Interview').count()
			dict={
			"New applications":new_application,
			"New candidates":new_candidates,
			"Invited for test":invited_for_screening,
			"Invited for interview":invited_for_interview
			}
			return Response(dict,status=status.HTTP_200_OK)
		elif self.request.user.user_type.lower()=="hr user":
			end = datetime.now()
			start = end - timedelta(days=7)
			new_application = Application.objects.filter(application_date__range=[start, end]).count()
			new_candidates = Application.objects.filter(application_date__range=[start, end])\
			.filter(is_candidate=True).count()
			invited_for_screening = Screening.objects.filter(screening_type='Test').count()
			invited_for_interview = Screening.objects.filter(screening_type='Interview').count()
			dict = {
			"New applications": new_application,
			"New candidates": new_candidates,
			"Invited for test": invited_for_screening,
			"Invited for interview": invited_for_interview
			}
			return Response(dict, status=status.HTTP_200_OK)

		ongoing_applications=Application.objects.filter(user=self.request.user).filter(is_candidate=False).count()
		end = datetime.now()
		start = end - timedelta(days=7)
		new_jobs=Job.objects.filter(date_created__range=[start,end]).count()
		candidate_for=Application.objects.filter(user=self.request.user).filter(is_candidate=True).count()
		dict={
		"New jobs":new_jobs,
		"Ongoing applications":ongoing_applications,
		"Candidate for": candidate_for
		}
		return Response(dict,status=status.HTTP_200_OK)