from rest_framework import serializers
from .models import Screening
from applications.serializers import ApplicationListSerializer

class ScreeningSerializer(serializers.ModelSerializer):
    application = ApplicationListSerializer()

    class Meta:
        model = Screening
        fields = ["application", "place", "schedule", "screening_type"]

class ScheduleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Screening
		fields = '__all__'