from django.shortcuts import redirect, render
import json
from .services import get_token_balance, authenticate_challenge, verify_challenge
from django.http import HttpResponse
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.urls import reverse
from urllib.parse import quote_plus, urlencode

oauth = OAuth()

oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration"
)

def login(request):
    return oauth.auth0.authorize_redirect(
        request, request.build_absolute_uri(reverse("callback"))
    )

def callback(request):
    token = oauth.auth0.authorize_access_token(request)
    request.session["user"] = token
    return redirect(request.build_absolute_uri(reverse("index")))

def logout(request):
    request.session.clear()

    return redirect(
        f"https://{settings.AUTH0_DOMAIN}/v2/logout?"
        + urlencode(
            {
                "returnTo": request.build_absolute_uri(reverse("index")),
                "client_id": settings.AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus,
        ),
    )

def index(request):
    return render(
        request,
        "index.html",
        context={
            "session": request.session.get("user"),
            "pretty": json.dumps(request.session.get("user"), indent=4),
        },
    )

# Create your views here.
def get_balance(requests):
    address = requests.GET.get("address")
    result = get_token_balance(address)
    result_json = json.dumps(result)
    return HttpResponse(result_json, content_type="application/json")


def request_challenge(requests):
    chain_id = requests.GET.get("chainId")
    address = requests.GET.get("address")
    request_result = authenticate_challenge(chain_id, address)
    request_json = json.dumps(request_result)
    return HttpResponse(request_json, content_type="application/json")


def verify_challenge(requests):
    message = requests.GET.get("message")
    signature = requests.GET.get("signature")
    verify_result = verify_challenge(message, signature)
    verify_json = json.dumps(verify_result)
    return HttpResponse(verify_json, content_type="application/json")
