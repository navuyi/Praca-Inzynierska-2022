USE yourtour;
DROP TABLE IF EXISTS tour_has_tags CASCADE;
DROP TABLE IF EXISTS tour_has_places CASCADE;
DROP TABLE IF EXISTS tour_images;
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
    tour_id INT DEFAULT NULL, /* This field will be filled with tour_id if message is connected with some tour*/
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    topic varchar(255) NOT NULL DEFAULT '[Brak tematu]',
    content varchar(1024) NOT NULL,
    time DATETIME NOT NULL,
    was_read BOOLEAN NOT NULL DEFAULT 0,
    sender_deleted BOOLEAN NOT NULL DEFAULT 0,
    receiver_deleted BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE tours (
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    header VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    guide_id INT NOT NULL, /* indicates guide of the tour */
    price INT NOT NULL,
    person_limit INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
   
    FOREIGN KEY (guide_id) REFERENCES users(id)
);

CREATE TABLE tour_images(
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tour_id INT NOT NULL,
    path VARCHAR(255) NOT NULL UNIQUE,
    is_main BOOLEAN NOT NULL DEFAULT 0,

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


