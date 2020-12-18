import services
class ArtistSearch(generic.TemplateView):
    def get(self,request):

        artist = request.data["artist"]

        artist_list = services.search_artist(artist)
        
        serializer = ArtistSearchSerializer(
            artist_list, many=True, context={'request': request})
        return Response(serializer.data)

class ArtistSearchSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id')