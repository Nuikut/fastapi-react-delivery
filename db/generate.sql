DROP TABLE IF EXISTS client, staff, orders, restaurant, meal, meal_order;

CREATE TABLE client(
	login VARCHAR(20) PRIMARY KEY,
	password VARCHAR(60) NOT NULL,
	active boolean
);

CREATE TABLE restaurant(
	address VARCHAR (50) PRIMARY KEY,
	category VARCHAR(20),
	manager_login VARCHAR(20) NOT NULL,
	manager_password VARCHAR(60) NOT NULL
);

CREATE TABLE staff(
	login VARCHAR(20) PRIMARY KEY,
	password VARCHAR(60) NOT NULL,
	active BOOLEAN NOT NULL,
	restaurant VARCHAR(50) REFERENCES restaurant(address)
);

CREATE TABLE orders(
	id SERIAL PRIMARY KEY,
	time TIMESTAMP,
	total_price INT,
	active BOOLEAN,
	rating SMALLINT,
	client VARCHAR(20) REFERENCES client(login),
	staff VARCHAR (20) REFERENCES staff(login),
	restaurant VARCHAR(50) REFERENCES restaurant(address)
);

CREATE TABLE meal(
	name VARCHAR(40) PRIMARY KEY,
	description VARCHAR(200),
	image PATH,
	price INT,
	category VARCHAR(20),
	available BOOLEAN,
	restaurant VARCHAR(50) REFERENCES restaurant(address)
);

CREATE TABLE meal_order(
	id INT,
	name VARCHAR(40),
	quantity INT,
	FOREIGN KEY(name) REFERENCES meal(name),
	FOREIGN KEY(id) REFERENCES orders(id)
);


CREATE TABLE cart(
	login VARCHAR(20) PRIMARY KEY,
	meal VARCHAR(40) REFERENCES meal(name),
	quantity INT
);