from django.urls import path

from users.api.views import CurrentUserDisplayView

urlpatterns= [
    path("user/", CurrentUserDisplayView.as_view(), name="current-user")
]