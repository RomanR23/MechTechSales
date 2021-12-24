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
product_name VARCHAR(50) NOT NULL,
product_price INT,
product_quantity INT,
product_image TEXT,
user_id INT REFERENCES site_users(id),
date_added TIMESTAMP
);

CREATE TABLE site_products(
id SERIAL PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
product_price INT,
product_image TEXT
);


INSERT INTO site_products
(product_name, product_price, product_image)
VALUES
('MSI GeForce RTX 2070', 549.99, 'https://c1.neweggimages.com/ProductImage/14-137-365-V08.jpg');