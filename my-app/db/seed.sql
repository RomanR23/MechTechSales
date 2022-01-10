CREATE TABLE site_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE site_cart(
id SERIAL PRIMARY KEY,
product_id INT REFERENCES site_products(id),
product_name VARCHAR(50) NOT NULL,
product_price DECIMAL,
product_quantity INT,
product_image TEXT,
user_id INT REFERENCES site_users(id),
date_added TIMESTAMP
);

CREATE TABLE site_products(
id SERIAL PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
product_price DECIMAL,
product_image TEXT,
product_quantity INT
);




INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('MSI GeForce RTX 2070', 549.99, 'https://c1.neweggimages.com/ProductImage/14-137-365-V08.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('ASUS ROG Crosshair VIII', 449.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/13-119-362-V06.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('SAMSUNG Odyssey G9', 989.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/24-022-902-01.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Corsair iCUE 4000x RGB', 110.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/11-139-159-V01.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('AUKEY Mechanical Gaming Keyboard', 69.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/AWR7D210324VWBJY.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Logitech G502 LIGHTSPEED Mouse', 94.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/26-197-336-V01.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('CORSAIR Vengeance RGB Pro 32GB', 134.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/20-236-607-01.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('AUKEY RGB Gaming Mouse Pad', 21.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/AWR7S2106245iiYP.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('EVGA SuperNOVA 1000 GT', 129.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/17-438-221-01.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Dual Monitor Stand Mount Kit', 46.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/AJDSS200521TESMO.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('TaoTronics LED Desk Lamp', 29.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/AP08S210720FoVD8.jpg', 0);

INSERT INTO site_products
(product_name, product_price, product_image, product_quantity)
VALUES
('AMD Ryzen 5 5600G Series', 259.99, 'https://c1.neweggimages.com/ProductImageCompressAll1280/19-113-683-V01.jpg', 0);