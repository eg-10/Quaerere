from django.urls import path, include

from rest_framework.routers import DefaultRouter

from questions.api import views as qv

router = DefaultRouter()
router.register(r"questions", qv.QuestionViewSet)

urlpatterns = [
    path("", include(router.urls)),

    path("questions/<slug:slug>/answers/",
         qv.AnswerListView.as_view(),
        name="answer-list"),

    path("questions/<slug:slug>/answer/",
         qv.AnswerCreateView.as_view(),
        name="create-answer"),
]