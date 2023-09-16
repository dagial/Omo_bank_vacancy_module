from rest_framework.permissions import BasePermission

class IsDepartmentUser(BasePermission):
	def has_permission(self, request, view):
		return bool(request.user and request.user.user_type=='DEPARTMENT USER')

class IsHRUser(BasePermission):
	def has_permission(self, request, view):
		return bool(request.user and request.user.user_type=='HR USER')

class IsStaff(BasePermission):
	def has_permission(self, request, view):
		return bool(request.user and request.user.is_staff)

class IsRecruit(BasePermission):
	def has_permission(self, request, view):
		return bool(request.user and request.user.user_type=='RECRUIT')