DROP TABLE IF EXISTS client, staff, orders, restaurant, meal, meal_order;

CREATE TABLE client(
	login VARCHAR(20) PRIMARY KEY,
	password VARCHAR(60) NOT NULL,
	active boolean
);

CREATE TABLE restaurant(
	name VARCHAR(50) PRIMARY KEY,
	address VARCHAR (50) ,
	category VARCHAR(20),
	manager_login VARCHAR(20) NOT NULL,
	manager_password VARCHAR(60) NOT NULL
);

CREATE TABLE staff(
	login VARCHAR(20) PRIMARY KEY,
	password VARCHAR(60) NOT NULL,
	active BOOLEAN NOT NULL,
	restaurant VARCHAR(50) REFERENCES restaurant(name)
);

CREATE TABLE orders(
	id SERIAL PRIMARY KEY,
	time TIMESTAMP,
	total_price INT,
	active BOOLEAN,
	rating SMALLINT,
	client VARCHAR(20) REFERENCES client(login) ON UPDATE CASCADE,
	staff VARCHAR (20) REFERENCES staff(login) ON UPDATE CASCADE,
	restaurant VARCHAR(50) REFERENCES restaurant(name)
);

CREATE TABLE meal(
	name VARCHAR(40) PRIMARY KEY,
	description VARCHAR(200),
	price INT,
	category VARCHAR(20),
	available BOOLEAN,
	restaurant VARCHAR(50) REFERENCES restaurant(name)
);

CREATE TABLE meal_order(
	id INT,
	name VARCHAR(40),
	quantity INT,
	FOREIGN KEY(name) REFERENCES meal(name),
	FOREIGN KEY(id) REFERENCES orders(id)
);
