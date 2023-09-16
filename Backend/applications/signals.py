from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Application
from accounts.models import *
from jobs.models import *


@receiver(post_save, sender=Application)
def create_candidate(instance,*args, **kwargs):
    recruit=Recruit.objects.get(id=instance.recruit.id)
    candidate=PickCandidate()
    valid_candidate=candidate.screen(recruit,instance.job)
    if valid_candidate:
        instance.save(commit=False)
        instance.is_candidate=True
        instance.save()
        return print("candidate_created")


class PickCandidate:

    def compare_department(self,job_q,recruit_q):
        for q in recruit_q:
            found_department = job_q.filter(qualification_department__icontains=q.department).first()
            if found_department :
                if q.qualification_type==found_department.qualification_type \
                        and q.grade>=found_department.minimum_grade_required:

                    return found_department
        return False

    def screen(self,recruit,job):

        qualification=Qualification.objects.filter(user=recruit)
        experience=Experience.objects.filter(user=recruit)
        job_qualification=EducationalRequirements.objects.filter(job=job)
        screen_department=self.compare_department(job_qualification,qualification)
        if screen_department:
            return self.compare_experience(experience, job)
        return False

    def compare_experience(self,recruit_exp,job_exp):
        for e in recruit_exp:
            if e.acquired_experience>=job_exp.experience_required:
                return e
        return False
