import fullstackapi.discogs_auth
import requests

# Defines calls a Shop will use in adding records to their Inventory
# Flows as follows: Shop searches for an artist -> Shop selects an artist -> artist's master releases are returned -> 
# Shop selects a master release -> all release versions for a master are returned -> 
# Shop selects the release version that matches the product they are adding to their inventory -> 
# information about that specific release is returned -> options for suggested selling price by condition are provided by 
# a separate function

# Shop provides a search query, Discogs returns list of artists
def search_artist(artist_query):
    url = 'https://api.discogs.com/database/search' 
    params = {'q': artist_query, 'type': 'artist'}
    headers = {'Authorization': 'oauth_token=""'}
    r = requests.get(url, params=params)
    artists = r.json()
    return artists

# Shop clicks an artist returned in search_artist, the artist ID is passed into an API call to return a list 
# of all master releases for that specific artist
def get_artist_masters(artist_id):
    url = 'http://api.discogs.com/artists/{artist_id}/releases'
    headers = {'Authorization': discogs_auth} 
    r = requests.get(url)
    masters = r.json()
    masters_list = {'masters':masters['results']}
    return masters_list

# Shop clicks the desired master release returned in get_artist_masters, master ID is passed into an API call to 
# return a list of all versions, pressings, editions, etc, of that specific master release
def get_master_releases(master_id):
    url = 'https://api.discogs.com/masters/{master_id}/versions'
    headers = {'Authorization': discogs_auth} 
    r = requests.get(url)
    releases = r.json()
    releases_list = {'releases':releases['results']}
    return releases_list

# Shop clicks the desired release version returned in get_master_releases, release ID is passed into an API call to 
# return information about that specific release version
def get_release_information(release_id):
    url = 'https://api.discogs.com/releases/{release_id}'
    headers = {'Authorization': discogs_auth} 
    r = requests.get(url)
    release = r.json()
    return release

# Along with database information about selected release, suggestions for pricing based on condition are provided when a 
# Shop clicks the desired release version returned by get_master_releases
def get_price_suggestions(release_id):
    url = 'http://api.discogs.com/marketplace/price_suggestions/{release_id}'
    headers = {'Authorization': discogs_auth} 
    r = requests.get(url)
    price_suggestions = r.json()
    price_suggestions_list = {'price_suggestions':price_suggestions['results']}
    return price_suggestions_list