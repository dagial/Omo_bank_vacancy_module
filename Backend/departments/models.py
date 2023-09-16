from django.db import models


class Department(models.Model):
	name = models.CharField(max_length=255, unique=True, primary_key=True)
	icon = models.ImageField(upload_to='departments/', blank=True, null=True)
	no_of_employees = models.IntegerField()
