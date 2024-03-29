import mysql.connector
from mysql.connector import Error
import config
from datetime import datetime, timedelta
import smtplib
from email.message import EmailMessage

try:

    # Open database connection
    conn = mysql.connector.connect(
        host=config.DATABASE_HOST,
        database=config.DATABASE_NAME,
        user=config.DATABASE_USER,
        password=config.DATABASE_PASSWORD
    )
    conn.autocommit = True

    # Open email connection
    smtp_server = config.MAIL_SERVER
    port = config.MAIL_PORT
    sender_email = config.MAIL_USERNAME
    password = config.MAIL_PASSWORD

    server = smtplib.SMTP(smtp_server, port)
    server.ehlo()  # Can be omitted
    server.starttls()
    server.login(sender_email, password)

    if conn.is_connected():
        cursor = conn.cursor(dictionary=True)


        ### Perform email confirmation test ###
        cursor.execute(f"SELECT id, is_confirmed, token_expiration FROM users")
        users = cursor.fetchall()
        for user in users:
            now = datetime.now()
            if user["is_confirmed"] !=1 and (now > user["token_expiration"]):
                # Delete that account
                print(f"Deleting unconfirmed account with ID {user['id']}")
                cursor.execute(f"DELETE FROM users WHERE id=%s", (user["id"], ))



        ### Perform payment check ###
        cursor.execute(f"SELECT id, creation_date, email, amount_payable FROM enrollments")
        enrollments = cursor.fetchall()

        for enrollment in enrollments:
            deadline = enrollment["creation_date"] + timedelta(hours=24)  # hours=24
            now = datetime.now()

            cursor.execute(f"SELECT COALESCE(sum(amount_paid), 0) as amount_paid FROM payments WHERE enrollment_id={enrollment['id']}")
            enrollment["amount_paid"] = cursor.fetchone()["amount_paid"]

            if(now > deadline and enrollment["amount_paid"] < enrollment["amount_payable"]):
                print("Payment deadline exceeded. Deleting this enrollment")
                enrollment_id = enrollment["id"]
                print(enrollment_id)
                cursor.execute(f"DELETE FROM enrollment_participants WHERE enrollment_id={int(enrollment_id)}")
                cursor.execute(f"DELETE FROM enrollments WHERE id={enrollment_id}")

                msg = EmailMessage()
                msg.set_content("Twój zapis na ofertę nie został opłacony w ciągu 24 godzin od jego utworzenia. Z tego powodu zostaje on unieważniony.")
                msg["Subject"] = "Minął termin zapłaty"
                msg["From"] = config.MAIL_USERNAME
                msg["To"] = enrollment["email"]
                server.send_message(msg)
            else:
                pass
except Error as e:
    print(e)
finally:
    if conn.is_connected():
        cursor.close()
        conn.close()
        server.quit()

