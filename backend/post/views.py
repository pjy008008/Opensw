from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer

class ListPost(generics.ListCreateAPIView): # 작성
    queryset = Post.objects.all() # 객체 설정
    serializer_class = PostSerializer # 직렬화 (json으로 변경)
    permission_classes = [permissions.IsAuthenticated] # 인증된 사용자인지 확인

    def perform_create(self, serializer): # user 필드를 현재 사용자로 설정
        user = self.request.user
        serializer.save(user = user,
                        phone=user.phone,
                        age=user.age,
                        gender=user.gender,
                        major=user.major,
                        realname=user.realname,
                        )

class DetailPost(generics.RetrieveUpdateDestroyAPIView): # 세부정보, 수정, 삭제
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self): # 로그인 대상이 맞는지 확인(user 필드 비교)
        obj = super().get_object()
        if obj.user != self.request.user:
            raise permissions.PermissionDenied
        return obj