from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status,filters, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import *
from .models import *
from jobs.models import Job
from jobs.serializers import *
from jobs.permissions import IsRecruit, IsStaff
from applications.models import *
from applications.serializers import *

serializer_mapper={
        "recruit": RecruitMoreSerializer,
        "qualification": QualificationSerializer,
        "experience": ExperienceSerializer
    }
class RegisterView(CreateAPIView):

    permission_classes = (permissions.IsAuthenticated, IsRecruit)

    def get_serializer_class(self, *args, **kwargs):
        mapper_value=self.request.data.get("serializer")
        serializer=serializer_mapper[mapper_value]
        return serializer
    def perform_create(self, serializer):

        serializer.save(user=self.request.user)

class StaffView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, IsStaff)

    def get_serializer_class(self):
        user_type = self.request.user.user_type
        if (user_type == "HR USER"):
            return HRUserMoreSerializer
        return DepartmentUserMoreSerializer
    
    def get_object(self):
        pk=self.kwargs[self.lookup_field]
        if (self.request.user.user_type == "HR USER"):
            return HRUserMore.objects.get(pk=pk)
        return DepartmentUserMore.objects.get(pk=pk)

class StaffCreateView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsStaff)

    def get_serializer_class(self):
        user_type = self.request.user.user_type
        if (user_type.lower() == "hr user"):
            serializer_type = HRUserMoreSerializer
            return serializer_type
        serializer_type = DepartmentUserMoreSerializer
        return serializer_type

    def perform_create(self, serializer_type):
        serializer_type.save(user=self.request.user)


class StaffUpdateView(UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsStaff)

    def get_serializer_class(self):
        user_type = self.request.user.user_type
        if (user_type == "HR USER"):
            serializer_type = HRUserMoreSerializer
            return serializer_type
        serializer_type = DepartmentUserMoreSerializer
        return serializer_type

    def get_object(self):
        if (self.request.user.user_type == "HR USER"):
            return HRUserMore.objects.get(user=self.request.user)
        return DepartmentUserMore.objects.get(user=self.request.user)

class RegistrationEditView(RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsRecruit)

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method=="GET":
            return USerializer
        else:
            mapper_value=self.request.data.get("serializer")
            serializer=serializer_mapper[mapper_value]
            return serializer

    def get_object(self):
        print(self.request.data.get("serializer"))
        if self.request.method == "GET":
            filte=self.kwargs[self.lookup_field]
            return UserAccount.objects.get(pk=filte)
        serializer_value=self.request.data.get("serializer")
        if self.request.data.get('pk'):
            if serializer_value=="qualification":
                return Qualification.objects.get(pk=self.request.data.get("pk"))
            elif serializer_value=="experience":
                return Experience.objects.get(pk=self.request.data.get("pk"))
            elif serializer_value=="recruit":
                return RecruitMore.objects.get(pk=self.request.data.get("pk"))

    def patch(self,*args, **kwargs):
        if self.request.data.get("deletable"):
            return self.delete(self,*args,**kwargs)
        if not self.request.data.get("pk"):
            return self.post(self,*args,**kwargs)
        return super().patch(*args,**kwargs)

    def post(self,*args,**kwargs):
        serializer=self.get_serializer(data=self.request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response("Created",status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self,*args,**kwargs):
        print(self.request.data)
        obj=self.get_object()
        print(obj)
        obj.delete()
        return Response("deleted",status=status.HTTP_200_OK)

    def retrieve(self,*args,**kwargs):
        obj=self.get_object()
        serializer=self.get_serializer(obj)
        return Response(serializer.data)


class CustomSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        param = request.query_params.get("Model")
        if param=="Job":
            return ['title', 'work_unit', 'department__name', 'branch']
        elif param=="Candidate" or param == "Application":
            return [
                "user__first_name",
                "user__middle_name",
                "user__last_name",
                "job__title",
                "job__department__name",
                "job__branch",
                "job__work_unit"]
        return super().get_search_fields(view,request)


class SearchView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    filter_backends = [CustomSearchFilter]
    queryset = Job.objects.filter(is_published=True)
    serializer_class = JobSerializer
    search_fields = ['title', 'work_unit', 'department__name', 'branch']
    def get_queryset(self):
        param=self.request.query_params.get("Model")
        if param=="Job":
            return Job.objects.all()
        if param=="Candidate":
            return Application.objects.filter(is_candidate=True)
        if param=="Application":
            return Application.objects.all()
        return super().get_queryset()

    def get_serializer_class(self):
        param=self.request.query_params.get("Model")
        if param=="Job":
            return JobSerializer
        if param=="Candidate" or param== "Application":
            return ApplicationListSerializer

        return super().get_serializer_class()
