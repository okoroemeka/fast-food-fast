DROP DATABASE IF EXISTS fast_food_fast_db;
CREATE DATABASE fast_food_fast_db;
\c fast_food_fast_db;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	fullname VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	password VARCHAR  NOT NULL,
    status VARCHAR DEFAULT 'regular',
	image_url VARCHAR,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- INSERT INTO users(fullname,email,telephone,password,status) VALUES('EMEKA OKORO', 'okoroEmeka@gmail.com','08062680531','Wise214@','admin');

CREATE TABLE menus(
    id SERIAL PRIMARY KEY,
    food VARCHAR NOT NULL,
    price INT NOT NULL,
    food_image VARCHAR NOT NULL,
    createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TYPE order_status AS ENUM('New','Processing','Cancelled','Complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    delivary_address VARCHAR NOT NULL,
    telephone text NOT NULL,
    quantity INT  NOT NULL,
    order_status VARCHAR DEFAULT 'New', 
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    menu_id INT REFERENCES menus(id) ON DELETE CASCADE,
    createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);