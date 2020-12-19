import json
from django.http import HttpResponse
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from fullstackapi.models import Profile, Shop, Customer


@csrf_exempt
def login_user(request):
    '''Handles the authentication of a profile

    Method arguments:
    request -- The full HTTP request object
    '''

    req_body = json.loads(request.body.decode())

    # If the request is a HTTP POST, try to pull out the relevant information.
    if request.method == 'POST':

        # Use the built-in authenticate method to verify
        username = req_body['username']
        password = req_body['password']
        authenticated_user = authenticate(username=username, password=password)

        # If authentication was successful, respond with their token
        if authenticated_user is not None:
            token = Token.objects.get(user=authenticated_user)
            data = json.dumps({"valid": True, "token": token.key})
            return HttpResponse(data, content_type='application/json')

        else:
            # Bad login details were provided. So we can't log the user in.
            data = json.dumps({"valid": False})
            return HttpResponse(data, content_type='application/json')


@csrf_exempt
def register_user(request):
    '''Handles the creation of a new profile for authentication

    Method arguments:
    request -- The full HTTP request object
    '''

    # Load the JSON string of the request body into a dict
    req_body = json.loads(request.body.decode())

    # Create a new user by invoking the `create_user` helper method
    # on Django's built-in User model
    new_user = User.objects.create(
        username=req_body['username'],
        email=req_body['email'],
        password=req_body['password'],
        first_name=req_body['first_name'],
        last_name=req_body['last_name']
    )

    # Now save the extra info in the fullstackapi_profile table
    profile = Profile.objects.create(
        profile_type=req_body['profile_type'],
        user=new_user
    )

    if profile.profile_type == 1:
        new_user.save()
        profile.save()

    # TO-DO Make sure all info is present before saving!! If profile_type = 2 save Shop info
    if profile.profile_type == 2:
        shop = Shop.objects.create(
            profile = profile,
            verified = False,
            address = req_body['address'],
            city = req_body['city'],
            state = req_body['state'],
            zip_code = req_body['zip_code'],
            contact_phone = req_body['contact_phone'],
            contact_email = req_body['contact_email']
        )
        shop.save()
        new_user.save()
        profile.save()

    # TO-DO Make sure all info is present before saving!! If profile_type = 3 save Customer info
    elif profile.profile_type == 3:
        customer = Customer.objects.create(
            profile = profile,
            default_zip = req_body['default_zip'],
            phone = req_body['phone']
        )
        new_user.save()
        profile.save()
        customer.save()

    # Use the REST Framework's token generator on the new user account
    token = Token.objects.create(user=new_user)

    # Return the token to the client
    data = json.dumps({"token": token.key})
    return HttpResponse(data, content_type='application/json')
