from os import environ

# Database configuration
DATABASE_HOST = 'localhost'
DATABASE_NAME = 'yourtour'
DATABASE_USER = 'api_operator'
DATABASE_PASSWORD = "loremipsumDB"
CHARSET = 'utf8mb4'
COLLATION = 'utf8mb4_unicode_ci'
AUTOCOMMIT_ENABLED = True

# Email configuration
MAIL_SERVER = 'smtp.googlemail.com'
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_PASSWORD = "lubiejesc123"
MAIL_USERNAME = "webappengthesis@gmail.com"

# Email confirmation
TOKEN_EXPIRATION = 60 * 1

# BitPay and payments
BITPAY_SECRET_KEY = "8LXkLrUS3usBvckvHY6tECAfbbejJsyBC2PsN5xhq5RU"  # This is the API token from BitPay merchant account
PAYMENT_DEADLINE = "24h"

# Cors configuration
ORIGINS = [
    "http://167.99.143.194",
    "http://localhost:3000",
    "https://www.figlus.pl",
    "https://figlus.pl"
]

# Image upload configuration
HOST = "https://figlus.pl"

TOUR_IMAGES_UPLOAD_DIRECTORY = "/home/rfiglus/app/app/storage/tour_images"
TOUR_IMAGES_DOWNLOAD_DIRECTORY = HOST+"/storage/tour_images/"
AVAILABLE_EXTENSIONS = ['.jpg', '.png', '.gif', '.tif', '.tiff', '.jpeg', '.bmp']
MAX_CONTENT_LENGTH = 16 * 1000 * 1000   # This is max request size
MAX_IMAGE_SIZE = 3 * 1000 * 1000
TOUR_IMAGES_LIMIT = 8

# ReCAPTCHA
RECAPTCHA_ENABLED = True    # Enable/disable reCAPTCHA verification
RECAPTCHA_SECRET_KEY = "6LcQltwbAAAAALw8n8WyiflolEo-Bc_Sg9dxrWBE"

# Thread message return limit
MESSAGES_LIMIT = 10
