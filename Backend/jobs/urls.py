from django.urls import path
from .views import JobListView, JobView, JobCreateView, JobUpdateView, RequestListView, JobCensorView

urlpatterns = [
	path('', JobListView.as_view(), name='jobList'),
	path('<pk>', JobView.as_view(), name='getJob'),
	path('request/', JobCreateView.as_view(), name='request'),
	path('listrequests/', RequestListView.as_view(), name='listrequests'),
	path('censor/<pk>', JobCensorView.as_view(), name='censor-job'),
	path('update/<pk>', JobUpdateView.as_view(), name='update-job'),
]