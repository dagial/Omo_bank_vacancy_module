from rest_framework import serializers
from .models import Job, EducationalRequirements
from departments.models import Department

class JobSerializer(serializers.ModelSerializer):
	icon = serializers.ImageField(use_url=True)

	class Meta:
		model = Job
		fields = ('id', 'title', 'deadline', 'department', 'employment_type', 'vacant', 'date_created', 'salary', 'description', 'icon', 'branch' )
		many = True


class EducationalCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = EducationalRequirements
		exclude = ['job']

class JobDetailSerializer(serializers.ModelSerializer):
	is_active = serializers.ReadOnlyField()
	icon = serializers.ImageField(use_url=True)
	educational_requirement = EducationalCreateSerializer(many=True)
	
	class Meta(JobSerializer.Meta):
		fields = ('id', 'title', 'work_unit', 'department', 
			'deadline', 'vacant', 'branch', 'grade', 'salary', 
			'gender_required', 'date_created', 'employment_type',
			 'description', 'is_active', 'icon', 'experience_required', 'educational_requirement', 'is_published' )

class JobUpdateSerializer(serializers.ModelSerializer):
	educational_requirement = EducationalCreateSerializer(many=True)
	
	class Meta(JobSerializer.Meta):
		fields = ('id', 'title', 'work_unit', 'department', 
			'deadline', 'vacant', 'branch', 'grade', 'salary', 
			'gender_required', 'date_created', 'employment_type',
			 'description', 'experience_required', 'educational_requirement' )

	def update(self, instance, validated_data):
		educational_data = validated_data.pop('educational_requirement')
		instance.title = validated_data.get('title', instance.title)
		instance.work_unit = validated_data.get('work_unit', instance.work_unit)
		instance.department = validated_data.get('department', instance.department)
		instance.deadline = validated_data.get('deadline', instance.deadline)
		instance.vacant = validated_data.get('vacant', instance.vacant)
		instance.branch = validated_data.get('branch', instance.branch)
		instance.grade = validated_data.get('grade', instance.grade)
		instance.salary = validated_data.get('salary', instance.salary)
		instance.gender_required = validated_data.get('gender_required', instance.gender_required)
		instance.employment_type = validated_data.get('employment_type', instance.employment_type)
		instance.description = validated_data.get('description', instance.description)
		instance.experience_required = validated_data.get('experience_required', instance.experience_required)
		instance.save()
		requirements_with_same_job_instance = EducationalRequirements.objects.filter(job=instance.pk).values_list('id', flat=True)
		requirements_id_pool = []

		for ed_data in educational_data:
			if "id" in ed_data.keys():
				if EducationalRequirements.objects.filter(id=ed_data['id']).exists():
					educational_instance = EducationalRequirements.objects.get(id=ed_data['id'])
					educational_instance.qualification_type = ed_data.get('qualification_type', educational_instance.qualification_type)
					educational_instance.qualification_department = ed_data.get('qualification_department', educational_instance.qualification_department)
					educational_instance.minimum_grade_required = ed_data.get('minimum_grade_required', educational_instance.minimum_grade_required)
					educational_instance.save()
					requirements_id_pool.append(educational_instance.id)
				else:
					continue
			else:
				educational_instance = EducationalRequirements.objects.create(job=instance, **ed_data)
				requirements_id_pool.append(educational_instance.id)
		for requirement_id in requirements_with_same_job_instance:
			if requirement_id not in requirements_id_pool:
				EducationalRequirements.objects.filter(pk=requirement_id).delete()
		return instance

class JobCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Job
		fields = '__all__'