DROP TABLE IF EXISTS client, staff, orders, restaurant, meal, meal_orders;

CREATE TABLE client(
	username VARCHAR(20) PRIMARY KEY,
	password VARCHAR(60) NOT NULL,
	active boolean
);

CREATE TABLE restaurant(
	address VARCHAR (30) PRIMARY KEY,
	category VARCHAR(20)
);

CREATE TABLE staff(
	login VARCHAR(20) PRIMARY KEY,
	passwrod VARCHAR(60) NOT NULL,
	active BOOLEAN NOT NULL,
	restaurant VARCHAR(30) REFERENCES restaurant(address)
);

CREATE TABLE orders(
	id INT8 PRIMARY KEY,
	time TIMESTAMP,
	total_price MONEY,
	active BOOLEAN,
	rating SMALLINT,
	client VARCHAR(20) REFERENCES client(username),
	staff VARCHAR (20) REFERENCES staff(login),
	restaurant VARCHAR(30) REFERENCES restaurant(address)
);

CREATE TABLE meal(
	name VARCHAR(20) PRIMARY KEY,
	description VARCHAR(20),
	image PATH,
	price MONEY,
	category VARCHAR(20),
	available BOOLEAN,
	restaurant VARCHAR(30) REFERENCES restaurant(address)
);

CREATE TABLE meal_order(
	name VARCHAR(20),
	id INT8,
	FOREIGN KEY(name) REFERENCES meal(name),
	FOREIGN KEY(id) REFERENCES orders(id)
);