from rest_framework import generics
from .models import Post
from .serializers import PostSerializer


class PostListView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(is_published=True)


class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.filter(is_published=True)
    lookup_field = "slug"