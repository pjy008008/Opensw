from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer
from rest_framework import status
from django.db.models import Q
from rest_framework.response import Response
from chat.models import ChatRoom


class ListPost(generics.ListCreateAPIView): # 작성
    queryset = Post.objects.all() # 객체 설정
    serializer_class = PostSerializer # 직렬화 (json으로 변경)
    permission_classes = [permissions.IsAuthenticated] # 인증된 사용자인지 확인

    def get(self, request):
        current_user = request.user
        if request.user.is_authenticated:
            posts = Post.objects.filter(Q(match=0) | (Q(match=1) & (Q(user=current_user) | Q(reciveuser=current_user))))
            serializer = PostSerializer(posts, many=True, context={'request': request})
            return Response(serializer.data)    
        else: 
            return Response({'detail': '로그인 하십시오.'}, status=status.HTTP_401_UNAUTHORIZED)

    def perform_create(self, serializer): # user 필드를 현재 사용자로 설정
        user = self.request.user
        serializer.save(user = user,
                        phone=user.phone,
                        age=user.age,
                        gender=user.gender,
                        major=user.major,
                        realname=user.realname,
                        roomid = 0,
                        match = 0,
                        recivename = '',
                        )

class DetailPost(generics.RetrieveUpdateDestroyAPIView): # 세부정보, 수정, 삭제
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated] # 인증된 사용자인지 확인

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if instance.match == 1:
        
            return Response({'detail': 'matched'},
                                status=status.HTTP_403_FORBIDDEN)
        
        elif instance.match == 0:
            print("match=0")
            if instance.user == request.user:
                return Response({'detail': '수정 불가'},
                                status=status.HTTP_403_FORBIDDEN)
            
            elif instance.user != request.user:
                chat_room = ChatRoom.objects.create()
                instance.reciveuser = request.user 
                chat_room.participants.set([instance.user, instance.reciveuser]) # user1과 user2를 채팅방에 추가
                chat_room.save()
                print(instance.reciveuser)
                print("채팅방 생성")
                print(chat_room.id)

                print("시리얼라이저")
                serializer = self.get_serializer(instance, data=request.data, partial=partial)
                print("시리얼라이저 실행")
                serializer.is_valid(raise_exception=True)
                print("오류 는 ")
                print(serializer.errors)
                self.perform_update(serializer)
                serializer.save(instance=instance)
                
                instance.recivename = request.user.realname
                instance.reciveuser = request.user  # reciveuser_id 설정
                instance.roomid = chat_room.id
                instance.match=1
                instance.save() 
                
                if getattr(instance, '_prefetched_objects_cache', None):
                    instance._prefetched_objects_cache = {}
    
                return Response(serializer.data, status=status.HTTP_200_OK)