from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash



def hash_password(clearText):
    salt_length = 8
    return generate_password_hash(clearText, salt_length=salt_length)


def verify_password(hash, clearText):
    return check_password_hash(hash, clearText)