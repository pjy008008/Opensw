from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

#Django의 BaseUserManager를 상속받아 사용자를 생성하고 관리하는 역할을 담당
#UserManager는 사용자 관리와 관련된 로직을 분리하여 중복을 피하고, 
# appuser 클래스는 실제 사용자 모델을 정의하여 사용자의 필드와 메서드를 구현합니다.
class UserManager(BaseUserManager):
    #일반 사용자 생성
    def create_user(self, email, password,realname,age,major,gender,phone, **extra_fields):
        if not realname:
            raise ValueError(_('Must have a name'))
        if not email:
            raise ValueError(_('The Email must be set'))
        
        email = self.normalize_email(email) 
        #이메일을 일반화 하는것으로 대소문자 구분을 없에는것
        #NAVER.COM 과 naver.com을 같은 메일로 인식
        
        user = self.model(
            email=email, 
            realname=realname,
            age=age,
            major=major,
            gender=gender,
            phone=phone,
            **extra_fields,
            ) #필요한 정보를 나타내고 구체적인 형식이나 길이 등은 appuser를 통해 구현
        
        user.set_password(password)
        user.save()
        return user

    #관리자 생성
    def create_superuser(self, email, password):
        if not email:
            raise ValueError(_('The Email must be set'))
        
        user = self.model(
            email = email
        )  
        
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
      
        user.set_password(password)
        user.save(using=self._db)
        return user

    
    
class appuser(AbstractBaseUser):
    #미리 정의한 UserManager를 통해서 유저 관리
    #실제 사용자 모델로 필요한 정보.인증 등을 관리한다
    objects = UserManager()
    
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female')
    ] #성별을 M or F 양자택일
    usernaem = None #username은 사용하지 않으며 유저를 구분할때 email이용 (settings에 설정 되어있음)
    email = models.EmailField(_('email address'), unique=True) #email은 unigue=T 로 유일하게 설정
    realname = models.CharField(default='', max_length=100, null=False, blank=False)
    age = models.IntegerField(default=20,null=False, blank=False)
    major = models.CharField(default='', max_length=100, null=True, blank=True)
    gender = models.CharField(default='M',max_length=1, choices=GENDER_CHOICES, null=False, blank=False)#choices를 통해 미리 정의한 GENDER_CHOICES에서 선택하게함
    phone = models.CharField(default='',max_length=30,null=False, blank=False)


    USERNAME_FIELD = 'email' #유저를 구분할 떄 email로 구분
    REQUIRED_FIELDS = []

    is_admin = models.BooleanField(default=True)    
    is_active = models.BooleanField(default=True)    
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)    

#이 부분은 회원가입 시 권한을 부여하는 부분으로 일단 모든 권한을 부여하고 있으며 이부분 없으면 회원가입 실행 안됨
    def has_module_perms(self, app_label):
        # 필요한 권한 확인 로직을 구현하세요
       return True
    def has_perm(self, perm, obj=None):
        # 필요한 권한 확인 로직을 구현하세요
        return True 
    
    def __str__(self):
        return self.email
    