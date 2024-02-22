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
    active BOOLEAN NOT NULL DEFAULT 0,
    CHECK (reduction BETWEEN 0 AND 1),
    created_at TIMESTAMP NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    CHECK (start_date <= end_date),
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id)
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

INSERT INTO Users(email, password, user_level_id)
VALUES ('juuso@gmail.com', 'juuso', 2),
    ('sofia@gmail.com', 'sofia1', 3),
    ('jaska@gmail.com', 'jaska1', 3),
    ('simosimo@gmail.com', 'simosimo', 3),
    ('Jakem@gmail.com', 'jakem', 3),
    ('anni@gmail.com', 'juuso', 1);

INSERT INTO Categories(category_name)
VALUES ('Jäätelöt'), ('Leivonnaiset'), ('Kakut'), ('Kylmät juomat'), ('Kuumat juomat');

INSERT INTO Dishes(dish_name, dish_price, description, category_id, dish_photo)
VALUES('Mango-meloni', 3.5, 'Laktoositon, Gluteeniton', 1, 'd70016c421cf929684c5c3c2e14efbf7'),
    ('Vanilja', 3.5, 'Laktoositon, Gluteeniton', 1, 'd5b3351da9701bf7183875ccf6ab157b'),
    ('Suklaa', 3.5, 'Laktoositon, Gluteeniton', 1, 'fb6973e94f78bb02a294ae826bda2c3d'),
    ('Voisilmäpulla', 2.9, 'Tehty omassa leipomossa', 2, 'b0da2e948a3a605412c874bf55b07081'),
    ('Korvapuusti', 2.9, 'Tehty omassa leipomossa', 2, '617d8f21a3b55fdaef0c76e0e4d7f33a'),
    ('Dallaspulla', 2.9, 'Laktoositon', 2, '76740e1797c1b618e66fe39066cd0a03'),
    ('Pullapitko', 2.9, 'Tehty omassa leipomossa', 2, 'f5b94a86e791e137f92cc73b359ac07f'),
    ('Kinuskikakku', 4.5, 'Laktoositon', 3, 'e3d6948eaf321a45cfa61f264efdf9a3'),
    ('Punainen sametti', 4.0, 'Vegaaninen', 3, 'c038ded38adcf04863130b976fa13b2b'),
    ('Mansikka täytekakku', 4.0, 'Gluteeniton', 3, 'fc59ad5ee62ad782a375e932f7ed1183'),
    ('Coca-cola', 3.5, 'Halutessa sokeriton', 4, '8bd62f93f91f8f5fda2d5cdbd738a078'),
    ('Fanta', 3.5, 'Halutessa sokeriton', 4, '52ab0cada95b493a4897fedb1cd51c3e'),
    ('Sprite', 3.5, 'Halutessa sokeriton', 4, 'dbb0a4dbdf7526414d366ef2f410a1bf'),
    ('Americano', 3.5, 'Piristys päivään', 5, '7fda39be6fac103af0a5eb3ce9cdadfb'),
    ('Latte', 3.5, 'Pyydettäessä erikois maitoon', 5, 'cbc141b3cd0dbedac60dfa7d8dfbbdf1'),
    ('Mocha', 3.5, 'Pyydettäessä erikois maitoon', 5, '56f8c57e52f4f55adcc459a5ccd94d76');




-- ORDER START: 1. 1pulla(dish id 5) first
INSERT INTO Orders (order_status, total_amount, payment_status, user_id)
    VALUES('preparing', 2.9, 'unpaid', 2);
INSERT INTO OrderTicket(order_num, dish_id, dish_price, quantity)
VALUES(1, 5, 2.9, 1);

-- then: 2. add more capacchino (dish id 12)
INSERT INTO OrderTicket(order_num, dish_id, dish_price, quantity)
VALUES(1, 12, 3.5, 1);
-- update Orders (added more item)
----calculate total_amount
SELECT SUM(OrderTicket.quantity * OrderTicket.dish_price) as totalAmount
FROM Orders, OrderTicket
WHERE Orders.order_num = OrderTicket.order_num;
---- 3. update Orders
UPDATE Orders SET total_amount=6.4
WHERE order_num=1;

-- 4. payment is done
UPDATE Orders SET payment_status='paid', order_status='preparing'
WHERE order_num=1;

-- 5. valmis noudettavaksi
UPDATE Orders SET order_status='ready'
WHERE order_num=1;
-- ORDER END HERE


-- Kysely
-- Valitse kakki katergoriat
SELECT category_name FROM Categories;

--Valitse kakki tarjouksen annosten nimet, hinnat ja kuvaus
SELECT Dishes.dish_id, Dishes.dish_name, offer_price, description
FROM Dishes, Offers
WHERE Offers.dish_id=Dishes.dish_id;

-- Valitse kaikki annosten nimet ja niiden ale hinnat sekä normaalihinnat, kuvaus
-- järjestys kategorian id:n mukaan
SELECT
    Dishes.dish_id,
    dish_name,
    ROUND((1-Offers.reduction)*dish_price,2) AS offer_price,
    dish_price,
    dish_photo,
    description,
    Categories.category_name
FROM
    Dishes
LEFT JOIN Offers
ON Dishes.dish_id = Offers.dish_id
AND '2023-12-11' BETWEEN start_date AND end_date
AND Offers.active = 1
INNER JOIN Categories
ON Categories.category_id = Dishes.category_id
GROUP BY
    Dishes.dish_id, dish_name, dish_price, dish_photo, description, Categories.category_name
ORDER BY Dishes.category_id;


-- Käyttäjä tilaa annoksen, jolla id on 4 ????????? TODO: Miten lisää 2 taululle yhtä aika??
--- INSERT INTO Orders(order_status) VALUES(0);
INSERT INTO OrderTicket(order_num, dish_id, dish_price, quantity)
VALUES(5, 4, 4, 1);

-- Hallitsija muokkaa annoksen tietoa
UPDATE Dishes
SET dish_name = 'Uusi jäätelö nimi', dish_price = 3.9,
    description = 'Uusi jäätelö', category_id = 1
WHERE dish_id = 3;

-- Muokkaa tarjouksen tietoa:
UPDATE Offers
SET offer_price = 1.9 WHERE dish_id = 1;

-- Poista tarjousannos
DELETE FROM Offers
WHERE dish_id = 1;



LOCK TABLES `dishes` WRITE;
/*!40000 ALTER TABLE `dishes` DISABLE KEYS */;
INSERT INTO `dishes` VALUES
(1,3.50,'Mango-meloni','d70016c421cf929684c5c3c2e14efbf7',519145,'image/png','Laktoositon, Gluteeniton',1,'2023-12-07 12:32:01'),
(2,3.50,'Vanilja','d5b3351da9701bf7183875ccf6ab157b',2453083,'image/png','Laktoositon, Gluteeniton',1,'2023-12-07 12:33:19'),
(3,3.50,'Suklaa','fb6973e94f78bb02a294ae826bda2c3d',591211,'image/png','Laktoositon, Gluteeniton',1,'2023-12-07 12:34:29'),
(4,2.90,'Voisilmäpulla','b0da2e948a3a605412c874bf55b07081',1270866,'image/png','Tehty omassa leipomossa',2,'2023-12-07 12:37:27'),
(5,2.90,'Korvapuusti','617d8f21a3b55fdaef0c76e0e4d7f33a',2086723,'image/png','Tehty omassa leipomossa',2,'2023-12-07 12:38:39'),
(6,2.90,'Dallaspulla','76740e1797c1b618e66fe39066cd0a03',1174465,'image/png','Laktoositon',2,'2023-12-07 12:39:34'),
(8,4.00,'Kinuskikakku','e3d6948eaf321a45cfa61f264efdf9a3',553390,'image/png','Laktoositon',3,'2023-12-07 12:41:34'),
(9,4.00,'Punainen sametti','c038ded38adcf04863130b976fa13b2b',413896,'image/png','Vegaaninen',3,'2023-12-07 12:43:12'),
(10,4.00,'Mansikka täytekakku','fc59ad5ee62ad782a375e932f7ed1183',958408,'image/png','Gluteeniton',3,'2023-12-07 12:44:41'),
(11,3.50,'Coca-cola','8bd62f93f91f8f5fda2d5cdbd738a078',71542,'image/png','Halutessa sokeriton',4,'2023-12-07 12:46:10'),
(12,3.50,'Sprite','dbb0a4dbdf7526414d366ef2f410a1bf',115057,'image/png','Halutessa sokeriton',4,'2023-12-07 12:46:51'),
(13,3.50,'Fanta','52ab0cada95b493a4897fedb1cd51c3e',91165,'image/png','Halutessa sokeriton',4,'2023-12-07 12:48:32'),
(14,3.50,'Americano','7fda39be6fac103af0a5eb3ce9cdadfb',204754,'image/png','Piristys päivään',5,'2023-12-07 12:49:36'),
(15,3.50,'Latte','cbc141b3cd0dbedac60dfa7d8dfbbdf1',425403,'image/png','Pyydettäessä erikois maitoon',5,'2023-12-07 12:50:15'),
(16,3.50,'Mocha','56f8c57e52f4f55adcc459a5ccd94d76',36688,'image/png','Pyydettäessä erikois maitoon',5,'2023-12-07 12:50:56');
/*!40000 ALTER TABLE `dishes` ENABLE KEYS */;
UNLOCK TABLES;


INSERT INTO Offers(dish_id, reduction, start_date, end_date)
VALUES(1, 0.2, '2023-12-07', '2023-12-31');
INSERT INTO Offers(dish_id, reduction, start_date, end_date)
VALUES(2, 0.7, '2023-12-07', '2023-12-31');
INSERT INTO Offers(dish_id, reduction, start_date, end_date)
VALUES(15, 0.1, '2023-12-07', '2023-12-31');


SELECT Dishes.dish_id, dish_name, Dishes.dish_price,
ROUND(Dishes.dish_price*(1-reduction), 2) AS offer_price, description, dish_photo
FROM Offers, Dishes
WHERE Offers.dish_id = Dishes.dish_id
AND '2023-12-11' BETWEEN start_date AND end_date
GROUP BY Dishes.dish_id
ORDER BY MIN(offer_price);

