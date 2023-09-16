from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('omo_bank/', include('djoser.urls')),
    path('omo_bank/', include('djoser.urls.jwt')),
    path('omo_bank/jobs/', include('jobs.urls')),
    path('omo_bank/user/', include('accounts.urls')),
    path('omo_bank/applications/', include('applications.urls')),
    path('omo_bank/schedule/', include('recruit_screenings.urls')),
    path('omo_bank/departments/', include('departments.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
