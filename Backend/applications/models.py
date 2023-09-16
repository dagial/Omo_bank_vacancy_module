from django.db import models
from jobs.models import *
from accounts.models import *
from django.utils.timezone import now
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import EmailMessage
	


class Application(models.Model):
	user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
	job = models.ForeignKey(Job, on_delete=models.CASCADE)
	application_date = models.DateTimeField(default=now)
	is_candidate=models.BooleanField(default=False)
	is_shortlisted=models.BooleanField(default=False)
	email_sent = models.BooleanField(default=False)

	class Meta:
		unique_together = ('user', 'job')

	def save(self,*args,**kwargs):
		recruit = RecruitMore.objects.get(user=self.user)
		if create_candidate(instance=self):
			self.is_candidate=True

		if not self.email_sent and not self.is_candidate:
			subject = 'Progress on your application'
			message = f'Congratulations!\nYou are shortlisted as one of the candidates for the {self.job.title} position.\
			 \nOur team will review your application and get back to you shortly.\n\
			 \nRegards,\nOmo Bank Recruitment Team'
			to_email = self.user.email
			email = EmailMessage(subject, message, to=[to_email])
			email.send()
			self.email_sent = True

		super().save(*args,**kwargs)

def create_candidate(instance,*args, **kwargs):
	user = Recruit.objects.get(id=instance.user.id)
	candidate = PickCandidate()
	valid_candidate = candidate.screen(user, instance.job)
	return valid_candidate


class PickCandidate:
	def compare_department(self, job_q, recruit_q):
		for q in recruit_q:
			found_department = job_q.filter(qualification_department__icontains=q.department). \
			filter(qualification_type__icontains=q.qualification_type).first()
			if found_department:
				if q.grade >= found_department.minimum_grade_required:
					return found_department
		return False

	def screen(self, recruit, job):

		qualification = Qualification.objects.filter(user=recruit)
		experience = Experience.objects.filter(user=recruit)
		job_qualification = EducationalRequirements.objects.filter(job=job)
		screen_department = self.compare_department(job_qualification, qualification)
		if screen_department:
			return self.compare_experience(experience, job)
		return False

	def compare_experience(self, recruit_exp, job_exp):
		for e in recruit_exp:
			if e.acquired_experience >= job_exp.experience_required:
				return e
		return False

