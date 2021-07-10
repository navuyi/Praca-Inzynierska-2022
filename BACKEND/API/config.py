from os import environ

# Database configuration
DATABASE_HOST = 'localhost'
DATABASE_NAME = 'yourtour'
DATABASE_USER = 'api_operator'
DATABASE_PASSWORD = environ["FLASK_DB_PASSWORD"]
CHARSET = 'utf8mb4'
COLLATION = 'utf8mb4_unicode_ci'
AUTOCOMMIT_ENABLED = True

# Cors configuration
ORIGINS = [
    "http://167.99.143.194",
    "http://localhost:3000"
]

# Image upload configuration
TOUR_IMAGES_DIRECTORY = "/home/rfiglus/BACKEND/API/storage/tour_images"
AVAILABLE_EXTENSIONS = ['.jpg', '.png', '.gif', '.tif', '.tiff', '.jpeg', '.bmp']

