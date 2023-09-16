from django.db import models
from accounts.models import *
from jobs.models import Job
from applications.models import *

class Screening(models.Model):
	class TypeChoices(models.TextChoices):
		Test = 'Test', 'test'
		Interview = 'Interview', 'interview'
	application = models.ForeignKey(Application, on_delete=models.CASCADE)
	hruser = models.ForeignKey(HRUserMore, on_delete=models.CASCADE)	
	screening_type = models.CharField(max_length=10, choices=TypeChoices.choices, default='Interview')
	schedule = models.DateTimeField()
	place = models.CharField(max_length=255)

	class Meta:
		unique_together = ('application', 'screening_type')