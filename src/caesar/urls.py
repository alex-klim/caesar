from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index, name='home'),
	url(r'^json/$', views.json_answer),
	url(r'^json_guess/$', views.guess_json_answer),
]
