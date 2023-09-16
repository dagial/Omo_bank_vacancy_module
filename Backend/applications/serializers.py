from rest_framework import serializers
from .models import Application
from accounts.serializers import ApplicantSerializer
from jobs.serializers import JobSerializer
from django.http import multipartparser
class ApplicationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Application
		fields = '__all__'

class ApplicationListSerializer(serializers.ModelSerializer):
	user = ApplicantSerializer()
	job = JobSerializer()
	
	class Meta:
		model = Application
		fields = ('id', 'application_date', 'is_candidate', 'is_shortlisted', 'user', 'job')