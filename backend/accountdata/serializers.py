from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import appuser
from django.contrib.auth.forms import UserCreationForm
#이메일 인증
#from .models import get_activation_link


#회원가입 커스텀(username이 회원가입 폼에 표시되지만 입력시 가입이 되지 않는다)
class CustomRegisterSerializer(RegisterSerializer):
    #회원가입 페이지에서 추가적으로 받고 싶은 정보들
    age = serializers.IntegerField()
    gender = serializers.ChoiceField(choices=appuser.GENDER_CHOICES)
    phone = serializers.CharField()
    major = serializers.CharField()
    realname = serializers.CharField()
    
    def save(self, request): #사용자 저장
        user = super().save(request)#기본 회원가입 로직을 수행
        self.custom_signup(request, user) #추가적인 사용자 정보를 저장
        return user
    
    def validate_email(self, email): #이메일 도메인 제한
            # 허용할 이메일 도메인
        allowed_domains = ['chungbuk.ac.kr', 'cbnu.ac.kr']
     
        # 이메일 주소에서 도메인 부분 추출
        domain = email.split('@')[1]
        
        if domain not in allowed_domains:
            raise serializers.ValidationError('This email domain is not allowed.')
        
        return email
    
    def custom_signup(self, request, user):
        #save애서 이 메서드를 호출함(사용자 저장)
        user.age = self.validated_data['age']
        user.gender = self.validated_data['gender']
        user.phone = self.validated_data['phone']
        user.major = self.validated_data['major']
        user.realname = self.validated_data['realname']
        user.save()

    def get_cleaned_data(self):#validated구현위한 메서드
        #정보를 받아올때 유효한 정보인지 확인하기 휘해 validated가 필요한데
        #모델에서 사용할때는 validated를 사용하나
        #여기선 내가 재정의 하는 느낌임
        data = super().get_cleaned_data()
        data['realname'] = self.validated_data.get('realname', '')
        data['age'] = self.validated_data.get('age', '')
        data['major'] = self.validated_data.get('major', '')
        data['gender'] = self.validated_data.get('gender', '')
        data['phone'] = self.validated_data.get('phone', '')
        return data
    
    class Meta(UserCreationForm.Meta):
        #내가 정의한 모델 appuser를 사용해서 회원가입을 커스텀마이즈 할거임을 알리는 부분?
        model = appuser
        fields = ('email', 'password', 'realname', 'age', 'major', 'gender', 'phone')
