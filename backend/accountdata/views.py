from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

def activation_view(request):
    verification_code = request.GET.get('verification')
    return render(request, 'email_verify.html', {'verification_code': verification_code})


@login_required
def get_name(request):
    user = request.user
    realname = user.realname
    return JsonResponse(realname, safe=False)