from djoser.serializers import UserCreateSerializer
from djoser.serializers import UserSerializer
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from .models import UserAccount, Experience, Qualification, RecruitMore, Recruit, HRUser, DepartmentUser, DepartmentUserMore, HRUserMore

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
	class Meta(UserCreateSerializer.Meta):
		model = User
		fields = ('id', 'first_name', 'middle_name', 'last_name', 'phone', 'email', 'password')

class ExperienceSerializer(ModelSerializer):
	class Meta:
		model=Experience
		exclude=["user"]

class QualificationSerializer(ModelSerializer):
	class Meta:
		model=Qualification
		exclude=['user']

class RecruitMoreSerializer(ModelSerializer):
	class Meta:
		model = RecruitMore
		exclude=["user"]

class DepartmentUserMoreSerializer(ModelSerializer):
	class Meta:
		model = DepartmentUserMore
		exclude = ["user"]

class HRUserMoreSerializer(ModelSerializer):
	class Meta:
		model = HRUserMore
		exclude = ['user']

class CustomUserSerializer(UserSerializer):
	user_type = serializers.CharField()
	recruit = RecruitMoreSerializer()
	departmentuser = DepartmentUserMoreSerializer()
	hruser = HRUserMoreSerializer()

	class Meta(UserSerializer.Meta):
		fields = UserSerializer.Meta.fields + ('user_type', 'recruit', 'departmentuser', 'hruser')

class USerializer(ModelSerializer):
	qualification=QualificationSerializer(many=True,read_only=True)
	recruit=RecruitMoreSerializer(read_only=True)
	experience=ExperienceSerializer(many=True,read_only=True)

	class Meta:
		model=UserAccount
		fields=["recruit","qualification","experience"]

class ApplicantSerializer(UserSerializer):
	qualification = QualificationSerializer(many=True, read_only=True)
	recruit = RecruitMoreSerializer(read_only=True)
	experience = ExperienceSerializer(many=True, read_only=True)

	class Meta(UserSerializer.Meta):
		fields = UserSerializer.Meta.fields + ('recruit', 'qualification', 'experience')