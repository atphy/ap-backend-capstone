#from fullstackapi.services import search_artist
# class ArtistSearch(generic.TemplateView):
#    def get(self,request):

#        artist = request.data["artist"]

#        artist_list = search_artist(artist)
        
#        serializer = ArtistSearchSerializer(
#            artist_list, many=True, context={'request': request})
#        return Response(serializer.data)

# class ArtistSearchSerializer(serializers.ModelSerializer):
#    class Meta:
#        fields = ('id', 'title', 'thumb')