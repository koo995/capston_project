from .common import *

INSTALLED_APPS += [
    "debug_toolbar",
]

MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",  # 이 부분이 제일 처음에 들어가야 하니까 이런식으로 구성한다.
] + MIDDLEWARE

INTERNAL_IPS = [
    "127.0.0.1",
]

# 개발환경에서만 쓰기 위함
CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]
