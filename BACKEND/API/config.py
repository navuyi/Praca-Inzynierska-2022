from os import environ

# Database configuration
DATABASE_HOST = 'localhost'
DATABASE_NAME = 'yourtour'
DATABASE_USER = 'api_operator'
DATABASE_PASSWORD = "loremipsumDB"
CHARSET = 'utf8mb4'
COLLATION = 'utf8mb4_unicode_ci'
AUTOCOMMIT_ENABLED = True

# Cors configuration
ORIGINS = [
    "http://167.99.143.194",
    "http://localhost:3000"
]

# Image upload configuration
HOST = "http://167.99.143.194"

TOUR_IMAGES_UPLOAD_DIRECTORY = "/home/rfiglus/app/app/storage/tour_images"
TOUR_IMAGES_DOWNLOAD_DIRECTORY = HOST+"/storage/tour_images/"
AVAILABLE_EXTENSIONS = ['.jpg', '.png', '.gif', '.tif', '.tiff', '.jpeg', '.bmp']
MAX_CONTENT_LENGTH = 16 * 1000 * 1000
TOUR_IMAGES_LIMIT = 20

# ReCAPTCHA
RECAPTCHA_ENABLED = True    # Enable/disable reCAPTCHA verification
RECAPTCHA_SECRET_KEY = "6LcQltwbAAAAALw8n8WyiflolEo-Bc_Sg9dxrWBE"