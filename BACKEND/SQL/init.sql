USE yourtour;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS tour_important_info CASCADE;
DROP TABLE IF EXISTS tour_price_list CASCADE;
DROP TABLE IF EXISTS tour_has_tags CASCADE;
DROP TABLE IF EXISTS tour_has_places CASCADE;
DROP TABLE IF EXISTS tour_images;
DROP TABLE IF EXISTS tour_plan_points;
DROP TABLE IF EXISTS tours CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;


/*
DROP TABLE IF EXISTS tour_tags CASCADE;
DROP TABLE IF EXISTS tour_places CASCADE;
*/

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(512) NOT NULL,
    phone_number CHAR(32), /* phone number is not necessary*/
    is_guide BOOLEAN NOT NULL DEFAULT 0, /* boolean means tinyint 1 for ture, 0 for false */
    is_confirmed BOOLEAN NOT NULL DEFAULT 0 /* mail confirmation status */
);


CREATE TABLE messages(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    thread_id INT NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    creation_date DATETIME NOT NULL DEFAULT NOW(),
    was_read BOOLEAN NOT NULL DEFAULT 0,
    sender_deleted BOOLEAN NOT NULL DEFAULT 0,
    receiver_deleted BOOLEAN NOT NULL DEFAULT 0,

    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (thread_id) REFERENCES message_threads(id)
);

CREATE TABLE message_threads(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    hidden BOOLEAN NOT NULL DEFAULT FALSE, /* Set to TRUE when thread is one of the threads created to multiple clients*/
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    tour_id INT DEFAULT NULL,                       /* This field will be filled with tour_id if thread is connected with a tour - in most cases it will*/
    topic VARCHAR(1024) NOT NULL DEFAULT '[Brak tematu]',
    creation_time DATETIME NOT NULL DEFAULT NOW(),
    sender_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    receiver_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

CREATE TABLE tours (
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    header VARCHAR(255) NOT NULL,
    description VARCHAR(1024) NOT NULL,
    guide_id INT NOT NULL, /* indicates guide of the tour */
    price INT NOT NULL,
    person_limit INT NOT NULL,
    creation_date DATETIME NOT NULL DEFAULT NOW(),  /* tour creation time - notice that it is UTC time  */
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,

    FOREIGN KEY (guide_id) REFERENCES users(id)
);

/* Information like first and last name, email address, phone number
    will be filled automatically in case of logged in client - user account
    quest has to fill it manually
*/
CREATE TABLE enrollments (
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    phone_number CHAR(32), /* phone number is not necessary*/
    email VARCHAR(255) NOT NULL,
    tickets INTEGER NOT NULL,

    user_id INTEGER DEFAULT NULL,  /* NULL in case client is guest - does not have an account */
    guide_id INTEGER NOT NULL,
    tour_id INTEGER NOT NULL,

    creation_date DATETIME NOT NULL DEFAULT NOW(),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (guide_id) REFERENCES users(id),
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

CREATE TABLE payments(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    enrollment_id INTEGER  NOT NULL,
    amount_paid INTEGER NOT NULL,
    created DATETIME NOT NULL DEFAULT NOW(),

    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id)
);


CREATE TABLE enrollment_participants(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    f_name VARCHAR (255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,

    enrollment_id INT NOT NULL,

    FOREIGN KEY(enrollment_id) REFERENCES enrollments(id)
);




DELIMITER $$
CREATE TRIGGER tickets_decrement
    AFTER DELETE ON enrollment_participants
    FOR EACH ROW
    BEGIN
        UPDATE enrollments e
        SET e.tickets = e.tickets - 1
        WHERE e.id <=> OLD.enrollment_id
        ;
    END$$
        DELIMITER ;

DELIMITER $$
CREATE TRIGGER tickets_increment
    AFTER INSERT ON enrollment_participants
    FOR EACH ROW
    BEGIN
        UPDATE enrollments e
            SET e.tickets = e.tickets + 1
            WHERE e.id <=> NEW.enrollment_id
            ;
        END$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER tickets_update
    AFTER UPDATE ON enrollment_participants
    FOR EACH ROW
    BEGIN
        IF NOT (NEW.enrollment_id <=> OLD.enrollment_id) THEN
        UPDATE enrollments e
            SET e.tickets = e.tickets - 1
            WHERE e.id <=> OLD.enrollment_id
            ;
        UPDATE enrollments e
            SET e.tickets = e.tickets + 1
            WHERE e.id <=> NEW.enrollment_id
            ;
        END IF;
        END $$
        DELIMITER ;

CREATE TABLE tour_images(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tour_id INT NOT NULL,
    path VARCHAR(1024) NOT NULL UNIQUE,
    filename VARCHAR (1024) NOT NULL UNIQUE,
    is_main BOOLEAN NOT NULL DEFAULT 0,

    FOREIGN KEY (tour_id) REFERENCES tours(id)
);
CREATE TABLE tour_plan_points(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tour_id INT NOT NULL,
    number INT NOT NULL,
    description VARCHAR(1024),

    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

CREATE TABLE tour_price_list(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tour_id INT NOT NULL,
    is_included BOOLEAN NOT NULL,
    description TEXT NOT NULL,

    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

CREATE TABLE tour_important_info(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tour_id INT NOT NULL,
    description TEXT NOT NULL,

    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

CREATE TABLE tour_tags(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tag varchar(255) NOT NULL UNIQUE
);
CREATE TABLE tour_places(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    place varchar(255) NOT NULL
);

CREATE TABLE tour_has_tags(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tour_id INT NOT NULL,
    tag_id INT NOT NULL,
    
    FOREIGN KEY (tour_id) REFERENCES tours(id),
    FOREIGN KEY (tag_id) REFERENCES tour_tags(id)
);
CREATE TABLE tour_has_places(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    place_id INT NOT NULL,
    tour_id INT NOT NULL,

    FOREIGN KEY (tour_id) REFERENCES tours(id),
    FOREIGN KEY (place_id) REFERENCES tour_places(id)
);









/* Four accounts for testingpurposes */
INSERT INTO users (f_name, l_name, email, phone_number, password) VALUES ("Andrew", "Golara", "andrewg@gmail.com", "568948473", "pbkdf2:sha256:150000$IDGI0NG6$6f8dd82605a62df6d40b2cae7f6bf276f24a47ed7a502559745dae3586e7225d");
INSERT INTO users (f_name, l_name, email, phone_number, password) VALUES ("Thomas", "Booba", "thomb@gmail.com", "5685648473", "pbkdf2:sha256:150000$IDGI0NG6$6f8dd82605a62df6d40b2cae7f6bf276f24a47ed7a502559745dae3586e7225d");
INSERT INTO users (f_name, l_name, email, phone_number, password) VALUES ("Lorence", "Lawg", "awrill@gmail.com", "128948473", "pbkdf2:sha256:150000$IDGI0NG6$6f8dd82605a62df6d40b2cae7f6bf276f24a47ed7a502559745dae3586e7225d");
INSERT INTO users (f_name, l_name, email, phone_number, password) VALUES ("Penny", "Gloria", "pennyg@gmail.com", "538948473", "pbkdf2:sha256:150000$IDGI0NG6$6f8dd82605a62df6d40b2cae7f6bf276f24a47ed7a502559745dae3586e7225d");

