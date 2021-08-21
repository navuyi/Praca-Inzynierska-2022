from datetime import datetime

def dhm_from_seconds(enrollment_deadline):
    now = datetime.now()
    timedelta = enrollment_deadline-now
    seconds = timedelta.days * 24 * 3600 + timedelta.seconds

    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    days, hours = divmod(hours, 24)
    return [days, hours, minutes]