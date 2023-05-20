from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

#이메일 인증
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
# Create your models here.

class UserManager(BaseUserManager):

    def create_user(self, email, password,realname,age,major,gender,phone, **extra_fields):

        if not realname:
            raise ValueError('Must have a user name')
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        
        user = self.model(
            email=email, 
            realname=realname,
            age=age,
            major=major,
            gender=gender,
            phone=phone,
            **extra_fields,
            )
        
        user.set_password(password)
        user.save()
        return user

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
    objects = UserManager()
    
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    usernaem = None
    email = models.EmailField(_('email address'), unique=True)
    realname = models.CharField(default='', max_length=100, null=False, blank=False)
    age = models.IntegerField(default=20,null=False, blank=False)
    major = models.CharField(default='', max_length=100, null=True, blank=True)
    gender = models.CharField(default='M',max_length=1, choices=GENDER_CHOICES, null=False, blank=False)
    phone = models.CharField(default='',max_length=30,null=False, blank=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    is_admin = models.BooleanField(default=True)    
    is_active = models.BooleanField(default=True)    
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)    

    def has_module_perms(self, app_label):
        # 필요한 권한 확인 로직을 구현하세요
       return True
    def has_perm(self, perm, obj=None):
        # 필요한 권한 확인 로직을 구현하세요
        return True 
    
    def __str__(self):
        return self.email
    