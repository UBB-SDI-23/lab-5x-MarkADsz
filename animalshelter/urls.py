"""animalshelter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

import animalshelter.views.ViewsTakeCare
import animalshelter.views.ViewsCareTakers
import animalshelter.views.ViewsShelteredAnimals
import animalshelter.views.ViewsDepartments

from animalshelter import views
from drf_spectacular.views import SpectacularAPIView,SpectacularSwaggerView
# schema_view = get_schema_view(
#     openapi.Info(
#         title="Swagger API",
#         default_version='v1',
#         description="Sheltered Animals",
#         # terms_of_service="https://www.jaseci.org",
#         # contact=openapi.Contact(email="jason@jaseci.org"),
#         # license=openapi.License(name="Awesome IP"),
#     ),
#     public=True,
#     permission_classes=(permissions.AllowAny,),
# )



urlpatterns = [
    # re_path(r'^doc(?P<format>\.json|\.yaml)$',
    #         schema_view.without_ui(cache_timeout=0), name='schema-json'),  # <-- Here
    # path('doc/', schema_view.with_ui('swagger', cache_timeout=0),
    #      name='schema-swagger-ui'),  # <-- Here
    # path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
    #      name='schema-redoc'),  # <-- Here
    # path('api_schema',get_schema_view(title="API Schema",description="Guide for the REST API"),name='api_schema'),
    path('schema/',SpectacularAPIView.as_view(),name='schema'),
    path('schema/docs/',SpectacularSwaggerView.as_view(url_name='schema')),
    path('admin/', admin.site.urls),
    path('shelteredanimals/', views.ViewsShelteredAnimals.animal_list),
    path('shelteredanimals/<int:id>', views.ViewsShelteredAnimals.animal_detail),
    path('shelteredanimals/autocomplete', views.ViewsShelteredAnimals.animals_autocomplete),
    path('departments/', views.ViewsDepartments.department_list),
    path('departments/<int:id>', views.ViewsDepartments.department_detail),
    path('departments/autocomplete', views.ViewsDepartments.departments_autocomplete),
    path('caretakers/', views.ViewsCareTakers.caretaker_list),
    path('caretakers/autocomplete', views.ViewsCareTakers.caretakers_autocomplete),
    path('caretakers_ordered_years_experience/',
         views.ViewsCareTakers.caretaker_list_ordered_by_avg_years_experience),
    path('caretakers/<int:id>', views.ViewsCareTakers.caretaker_detail),
    path('takecare/', views.ViewsTakeCare.takecare_list),
    path('takecare/<int:id>', views.ViewsTakeCare.takecare_detail),
    path('departments_ordered_by_caretakers/', views.ViewsDepartments.departments_ordered_by_caretakers),
    path('shelteredanimals/<int:id>/caretakers', views.ViewsTakeCare.add_bulk_caretakers_to_animal),


]