from django.shortcuts import render
from django.core.mail import EmailMessage
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from jobs.permissions import IsStaff
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from datetime import datetime
from django.db.models import Q

class ScheduleView(CreateAPIView):
	permission_classes = (permissions.IsAuthenticated, IsStaff)
	serializer_class = ScheduleSerializer
	
	def perform_create(self, serializer):
		instance = serializer.save()
		date = instance.schedule.strftime("%B %d, %Y %I:%M %p")
		subject = 'Screening Schedule'
		message = f'Our recruitment team has reviewed your application for {instance.application.job.title} position.\
		\nYou are scheduled for a screening {instance.screening_type} on {date} at our {instance.place} branch.\
		\nBest of luck!\n\nRegards,\nOmo Bank Recruitment Team'
		to_email = instance.application.user.email
		email = EmailMessage(subject, message, to=[to_email])
		email.send()

class CalendarView(APIView):
	permission_classes = (permissions.IsAuthenticated, )

	def get(self,*args,**kwargs):
		date=self.request.query_params.get("date")
		print(date)
		date = date.split(' ')
		date[-1] = date[0][:10]
		date = " ".join(date)
		date=datetime.strptime(date,"%Y-%m-%d")
		schedule=Screening.objects.filter(Q(application__user=self.request.user)| Q(hruser__user=self.request.user))\
		.filter(schedule__year="2023",schedule__month=date.month,schedule__day=date.day)
		serializer=ScreeningSerializer(schedule,many=True)
		return Response(serializer.data,status=status.HTTP_200_OK)
