from django.db import models
from django.utils.text import slugify
from departments.models import Department
from django.utils.timezone import now
from datetime import datetime


class Job(models.Model):
    class EmpTypes(models.TextChoices):
        PERMANENT = 'Permanent', 'PERMANENT'
        TEMPORARY = 'Temporary', 'TEMPORARY'

    class GenderTypes(models.TextChoices):
        Male = 'Male'
        Female = 'Female'
        Any = 'Any'

    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    work_unit = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    employment_type = models.CharField(max_length=100, choices=EmpTypes.choices, default=EmpTypes.PERMANENT)
    description = models.TextField()
    experience_required = models.PositiveIntegerField()
    branch = models.CharField(max_length=255)
    grade = models.CharField(max_length=10, blank=True, null=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    vacant = models.PositiveIntegerField()
    gender_required = models.CharField(max_length=8, choices=GenderTypes.choices, default=GenderTypes.Any)
    date_created = models.DateTimeField(default=now)
    deadline = models.DateField()
    is_published = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Job, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    @property
    def icon(self):
        return self.department.icon

    @property
    def is_active(self):
        return self.deadline > datetime.today().date()

    class Meta:
        unique_together = ('title', 'is_published', 'branch', 'department')


class EducationalRequirements(models.Model):
    class QualificationTypes(models.TextChoices):
        NONE = 'None required'
        G8 = 'Grade 8'
        G10 = 'Grade 10'
        G12 = 'Grade 12'
        Diploma = 'Diploma'
        BSc = 'BSc', 'BSC'
        MSc = 'MSc', 'MSC'
        MScBSc = 'MSc/BSc', 'MSC/BSC'

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='educational_requirement')
    qualification_type = models.CharField(max_length=255, choices=QualificationTypes.choices,
                                          default=QualificationTypes.NONE)
    qualification_department = models.TextField(blank=True, null=True)
    minimum_grade_required = models.DecimalField(max_digits=4, decimal_places=1, blank=True, null=True)
