from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import appuser
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
#이메일 인증
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
#from .models import get_activation_link


#회원가입 커스텀(username이 회원가입 폼에 표시되지만 입력시 가입이 되지 않는다)
class CustomRegisterSerializer(RegisterSerializer):
    age = serializers.IntegerField()
    gender = serializers.ChoiceField(choices=appuser.GENDER_CHOICES)
    phone = serializers.CharField()
    major = serializers.CharField()
    realname = serializers.CharField()
    
    def save(self, request):
        user = super().save(request)
        self.custom_signup(request, user)  # 수정된 부분
        return user
    
    def validate_email(self, email):
        # 특정 메일 주소를 허용하고 나머지는 거부하는 로직을 구현합니다.
            # 허용할 이메일 도메인
        allowed_domains = ['chungbuk.ac.kr', 'cbnu.ac.kr']
        
        # 이메일 주소에서 도메인 부분 추출
        domain = email.split('@')[1]
        
        if domain not in allowed_domains:
            raise serializers.ValidationError('This email domain is not allowed.')
        
        return email
    
    def custom_signup(self, request, user):
        
        user.age = self.validated_data['age']
        user.gender = self.validated_data['gender']
        user.phone = self.validated_data['phone']
        user.major = self.validated_data['major']
        user.realname = self.validated_data['realname']
        user.save()

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['realname'] = self.validated_data.get('realname', '')
        data['age'] = self.validated_data.get('age', '')
        data['major'] = self.validated_data.get('major', '')
        data['gender'] = self.validated_data.get('gender', '')
        data['phone'] = self.validated_data.get('phone', '')
        return data
    
    class Meta(UserCreationForm.Meta):
        model = appuser
        fields = ('email', 'password', 'realname', 'age', 'major', 'gender', 'phone')
