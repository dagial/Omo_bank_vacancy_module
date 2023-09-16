from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from departments.models import Department


class UserAccountManager(BaseUserManager):
	def create_user(self, first_name, middle_name, last_name, phone, email, password=None):
		if not email:
			raise ValueError('User must have an email address')

		email = email.lower()
		user = self.model(email=email, first_name=first_name, middle_name=middle_name, last_name=last_name, phone=phone)
		user.set_password(password)
		user.is_active=True
		user.save()
		return user

	def create_superuser(self, first_name, middle_name, last_name, phone, email, password=None):
		user = self.create_user(first_name, middle_name, last_name, phone, email, password)
		user.is_staff = True
		user.is_superuser = True
		user.save()
		return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
	
	class Types(models.TextChoices):
		RECRUIT = 'RECRUIT', 'Recruit'
		DEPARTMENT_USER = 'DEPARTMENT USER', 'Department User'
		HR_USER = 'HR USER', 'HR User'
		SYSTEM_ADMIN = 'SYSTEM ADMIN', 'System Admin'

	first_name = models.CharField(max_length=255)
	middle_name = models.CharField(max_length=255)

	last_name = models.CharField(max_length=255)
	email = models.EmailField(max_length=255, unique=True)
	phone = PhoneNumberField(unique=True, null=False, blank=False)
	is_active = models.BooleanField(default=True)
	user_type = models.CharField(max_length=50, choices=Types.choices, default=Types.RECRUIT)
	is_staff = models.BooleanField(default=False)

	objects = UserAccountManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'middle_name', 'last_name', 'phone']

	def get_full_name(self):
		return self.first_name+" "+self.middle_name

	def get_short_name(self):
		return self.first_name

	def __str__(self):
		return self.email

class RecruitManager(models.Manager):
	def get_queryset(self, *args, **kwargs):
		return super().get_queryset(*args, **kwargs).filter(user_type=UserAccount.Types.RECRUIT)

class RecruitMore(models.Model):
	user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='recruit')
	photograph = models.ImageField(upload_to="Recruits/")
	id_photo = models.ImageField(upload_to="IDs/")
	date_of_birth = models.DateField()
	gender_choices = (("Male", "Male"), ("Female", "Female"),)
	gender = models.CharField(max_length=8, choices=gender_choices)
	marital_choices = (("single", "Single"), ("married", "Married"), ("divorced", "Divorced"), ("widow/er", "Widow/er"),)
	marital_status = models.CharField(max_length=20, choices=marital_choices)
	region = models.CharField(max_length=255)
	city = models.CharField(max_length=255)
	zone = models.CharField(max_length=255)
	resume = models.FileField()	

class Recruit(UserAccount):
	base_type = UserAccount.Types.RECRUIT
	objects = RecruitManager()

	@property
	def more(self):
		return self.recruitmore

	class Meta:
		proxy = True

class Qualification(models.Model):

	class QualificationTypes(models.TextChoices):
		G8 = 'Grade 8'
		G10 = 'Grade 10'
		G12 = 'Grade 12'
		Diploma = 'Diploma'
		Award = 'Award'
		BSc = 'BSc', 'BSC'
		MSc = 'MSc', 'MSC'

	user = models.ForeignKey(Recruit, on_delete=models.CASCADE, related_name='qualification')
	institution = models.CharField(max_length=255)
	qualification_type = models.CharField(max_length=50, choices=QualificationTypes.choices, default=QualificationTypes.BSc)
	department = models.CharField(max_length=255)
	grade = models.DecimalField(max_digits=5, decimal_places=2)
	start_date = models.DateField()
	date_received = models.DateField()
	certificate = models.FileField()
	transcript = models.FileField()

class Experience(models.Model):
	user = models.ForeignKey(Recruit, on_delete=models.CASCADE, related_name='experience')
	experience_letter = models.FileField()
	employer = models.CharField(max_length=255)
	job_category = models.CharField(max_length=255)
	job_title = models.CharField(max_length=255)
	start_date = models.DateField()
	end_date = models.DateField()

	@property
	def acquired_experience(self):
		return (self.end_date-self.start_date).days/365
	
class DepartmentUserManager(models.Manager):

	def create_user(self, first_name, middle_name, last_name, phone, email, password=None):
		if not email:
			raise ValueError('User must have an email address')

		email = email.lower()
		user = self.model(email=email, first_name=first_name, middle_name=middle_name, last_name=last_name, phone=phone)
		user.set_password(password)
		user.save()
		return user

	def get_queryset(self, *args, **kwargs):
		return super().get_queryset(*args, **kwargs).filter(user_type=UserAccount.Types.DEPARTMENT_USER)

class DepartmentUserMore(models.Model):
	user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='departmentuser')
	department = models.ForeignKey(Department, on_delete=models.CASCADE)
	title = models.CharField(max_length=255)
	branch = models.CharField(max_length=255)

class DepartmentUser(UserAccount):
	base_type = UserAccount.Types.DEPARTMENT_USER
	objects = DepartmentUserManager()
	
	@property
	def more(self):
		return self.departmentusermore
	
	class Meta:
		proxy = True

class HRUserManager(models.Manager):

	def create_user(self, first_name, middle_name, last_name, phone, email, password=None):
		if not email:
			raise ValueError('User must have an email address')

		email = email.lower()
		user = self.model(email=email, first_name=first_name, middle_name=middle_name, last_name=last_name, phone=phone)
		user.set_password(password)
		user.save()
		return user
	
	def get_queryset(self, *args, **kwargs):
		return super().get_queryset(*args, **kwargs).filter(user_type=UserAccount.Types.HR_USER)

class HRUserMore(models.Model):
	user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='hruser')
	department = models.ForeignKey(Department, on_delete=models.CASCADE, default="HR")
	title = models.CharField(max_length=255)
	branch = models.CharField(max_length=255)

class HRUser(UserAccount):
	base_type = UserAccount.Types.HR_USER
	objects = HRUserManager()

	@property
	def more(self):
		return self.hrusermore

	class Meta:
		proxy = True
