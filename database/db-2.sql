DROP DATABASE IF EXISTS dessert;
CREATE DATABASE dessert;
USE dessert;


CREATE TABLE UserLevels (
    user_level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);


CREATE TABLE Users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_level_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(user_level_id)
);

ALTER TABLE Users AUTO_INCREMENT=1001;

CREATE TABLE Categories (
    category_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255)
);

CREATE TABLE Dishes (
    dish_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dish_price DECIMAL(6,2) NOT NULL,
    dish_name VARCHAR(255) NOT NULL,
    dish_photo VARCHAR(255) NOT NULL,
    filesize INT NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    category_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Offers (
    offer_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dish_id INT NOT NULL,
    reduction DECIMAL(6,2) NOT NULL,
    active BOOLEAN NOT NULL,
    CHECK (reduction BETWEEN 0 AND 1),
    created_at TIMESTAMP NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    CHECK (start_date <= end_date),
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id) ON DELETE CASCADE
);

-- payment_status: 'paid' tai 'unpaid'/ DEFAULT 'unpaid'
-- order_status: 'pending', 'ready', 'picked up' / DEFAULT 'not ready'
CREATE TABLE Orders (
    order_num INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    total_amount VARCHAR(255),
    payment_status ENUM('paid', 'unpaid') DEFAULT 'unpaid',
    order_status ENUM('preparing', 'ready', 'picked up') DEFAULT 'preparing',
    created_at TIMESTAMP NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE OrderTicket (
    ticket_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_num INT NOT NULL,
    dish_id INT NOT NULL,
    dish_price DECIMAL(6,2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (order_num) REFERENCES Orders(order_num),
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id)
);

-- Lisää mock data
INSERT INTO UserLevels(name, description)
VALUES ('super admin', 'kaikki oikeus'),
    ('admin', 'admin hallinta paitsi poista/luoda käyttäjä'),
    ('user', 'normaali käyttäjä');


INSERT INTO Categories(category_name)
VALUES ('Jäätelöt'), ('Leivonnaiset'), ('Kakut'), ('Kylmät juomat'), ('Kuumat juomat');

INSERT INTO Dishes(dish_price, dish_name, dish_photo, filesize, media_type, description, category_id)
VALUES (3.50,'Mango-meloni','9aaf7d80c19f07da157f91c6015c0721',519145,'image/png','Laktoositon, Gluteeniton',1),
(3.50,'Vanilja','5506defd5fe4b6206319908607252095',2453083,'image/png','Laktoositon, Gluteeniton',1),
(3.50,'Suklaa','5f05f018a33a8124e683ed57e417ee65',591211,'image/png','Laktoositon, Gluteeniton',1),
(2.90,'Voisilmäpulla','350ca8be38d9f4b2f58d70742c1cd84a',1270866,'image/png','Tehty omassa leipomossa',2),
(2.90,'Korvapuusti','fed951a512639fd51371003c50238a0f',2086723,'image/png','Tehty omassa leipomossa',2),
(2.90,'Dallaspulla','8ea479c065736dbe6879922da35dc794',1174465,'image/png','Laktoositon',2),
(2.90,'Pullapitko','5134a386887a03d4e19ad10bbf634f89',841058,'image/png','Tehty omassa leipomossa',2),
(4.50,'Kinuskikakku','8a82e7b460655a99541735a6712b092a',553390,'image/png','Laktoositon',3),
(4.00,'Punainen sametti','74713c87091a3b5782d78ef5b3f1bce1',413896,'image/png','Vegaaninen',3),
(4.00,'Mansikka täytekakku','a7b26c48385dc491c0ff50dd85f52e44',958408,'image/png','Gluteeniton',3),
(3.50,'Coca-cola','68d246bd77567a35a2bfaded21529ba7',71542,'image/png','Halutessa sokeriton',4),
(3.50,'Fanta','219eb9174a3a2b36b5cbfe5fd6b5dfe8',91165,'image/png','Halutessa sokeriton',4),
(3.50,'Sprite','7ff7d04592071734f57388ac34cef083',115057,'image/png','Halutessa sokeriton',4),
(3.50,'Americano','904b37025a834d570a2c0f368b3285c5',3662441,'image/png','Piristys p├ñiv├ñ├ñn',5),
(3.50,'Latte','1df333deb57c595cd5d7d263b22bc4af',425403,'image/png','Pyydettäessä erikois maitoon',5),
(3.50,'Mocha','b4fe0d8920675a1572fa273fcd28c1a1',36688,'image/png','Pyydettäessä erikois maitoon',5);
INSERT INTO Offers(dish_id, reduction, start_date, end_date, active)
VALUES(1, 0.2, '2023-12-07', '2023-12-31', 1);
INSERT INTO Offers(dish_id, reduction, start_date, end_date, active)
VALUES(2, 0.7, '2023-12-07', '2023-12-31', 1);
INSERT INTO Offers(dish_id, reduction, start_date, end_date, active)
VALUES(2, 0.1, '2023-12-07', '2023-12-31', 0);
INSERT INTO Offers(dish_id, reduction, start_date, end_date, active)
VALUES(15, 0.1, '2023-12-07', '2023-12-31', 1);

UPDATE Offers
SET active = 0
WHERE dish_id = 5;
INSERT INTO Offers(dish_id, reduction, start_date, end_date, active)
VALUES(5, 0.1, '2023-12-07', '2023-12-31', 1);

UPDATE Offers
SET active = 0
WHERE dish_id = 4 AND end_date > '2023-12-18';
INSERT INTO Offers(dish_id, reduction, start_date, end_date, active)
VALUES(4, 0.5, '2023-12-18', '2023-12-18', 1);


DELETE FROM Dishes WHERE dish_id = 2;

INSERT INTO Dishes(dish_price, dish_name, dish_photo, filesize, media_type, description, category_id)
VALUES(2.90,'Korvapuusti','fed951a512639fd51371003c50238a0f',2086723,'image/png','Tehty omassa leipomossa',2);
