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
	staff VARCHAR (20) REFERENCES staff(login),
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

INSERT INTO restaurant VALUES
('Pasta and Pizza', 'Dumskaya St., 4, St. Petersburg', 'Italian', 'ElenaKuzmina', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Fish and Rice', 'Gorokhovaya St., 28, St. Petersburg', 'Japanese', 'ArtemGrigoryev', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Cajun', 'Zhukovskogo St., 10, St. Petersburg', 'Creole', 'OlgaSidorova', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Sharman', 'Marata St., 17, St. Petersburg', 'French', 'MaximLebedev', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Taco Land', 'Moscow Ave., 92, St. Petersburg', 'Mexican', 'AnnaOrlova', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Bavarian Courtyard', 'Sadovaya St., 5, St. Petersburg', 'German', 'ViktorNemtsov', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Shashlik Paradise', 'Vostaniya St., 42, St. Petersburg', 'Caucasian', 'TamaraAslanova', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Sabzi', 'Kollontai St., 55, St. Petersburg', 'Uzbek', 'RuslanSharipov', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Sea Breeze', 'Makarova Embankment, 8, St. Petersburg', 'Seafood', 'ElizavetaMorozova', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Texas Bar', 'Nevsky Ave., 50, St. Petersburg', 'American (grill)', 'AlexeyPavlov', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Delicious Life', 'Moiseenko St., 4, St. Petersburg', 'European', 'JohnDoe', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Pizza Mania', 'Rimskiy_Korsakov ave, 12, St. Petersburg', 'Italian', 'JaneSmith', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S'),
('Caucasian Restaurant', 'Novgorodskaya St, 27, St. Petersburg', 'Caucasian', 'AlexBrown', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S');

INSERT INTO meal VALUES
('BBQ Ribs', 'Slow-cooked pork ribs with house-made BBQ sauce', 18.99, 'Main Course', true, 'Texas Bar'),
('Texas Steak', '12 oz grilled ribeye steak served with garlic butter', 24.99, 'Main Course', true, 'Texas Bar'),
('Buffalo Wings', 'Crispy chicken wings tossed in spicy buffalo sauce', 10.99, 'Appetizer', true, 'Texas Bar'),
('Loaded Nachos', 'Corn tortilla chips topped with cheese, jalapeños, and salsa', 9.99, 'Appetizer', true, 'Texas Bar'),
('Chili con Carne', 'Classic Texan chili with beef and beans, served with cornbread', 12.99, 'Main Course', true, 'Texas Bar'),
('Tex-Mex Salad', 'Fresh greens with grilled chicken, avocado, and chipotle dressing', 11.99, 'Salad', true, 'Texas Bar'),
('Cowboy Burger', 'Juicy beef patty with cheddar, bacon, and smoky BBQ sauce', 14.99, 'Main Course', true, 'Texas Bar'),
('Sweet Potato Fries', 'Crispy sweet potato fries with chipotle mayo dip', 6.99, 'Side', true, 'Texas Bar'),
('Apple Pie', 'Classic American apple pie served with vanilla ice cream', 7.99, 'Dessert', true, 'Texas Bar'),
('Texas Iced Tea', 'Refreshing blend of iced tea, lemon, and a hint of mint', 3.99, 'Drink', true, 'Texas Bar');

INSERT INTO meal VALUES
('Margherita Pizza', 'Classic pizza with tomato sauce mozzarella and fresh basil', 9.99, 'Pizza', true, 'Pasta and Pizza'),
('Pepperoni Pizza', 'Pizza topped with pepperoni slices and mozzarella cheese', 11.99, 'Pizza', true, 'Pasta and Pizza'),
('Carbonara Pasta', 'Spaghetti with creamy carbonara sauce, bacon, and parmesan', 12.99, 'Pasta', true, 'Pasta and Pizza'),
('Bolognese Pasta', 'Classic spaghetti with a rich meat-based tomato sauce', 13.99, 'Pasta', true, 'Pasta and Pizza'),
('Four Cheese Pizza', 'Pizza with mozzarella, cheddar, parmesan, and gorgonzola', 12.49, 'Pizza', true, 'Pasta and Pizza'),
('Penne Arabbiata', 'Penne pasta with spicy tomato sauce, garlic, and chili flakes', 10.99, 'Pasta', true, 'Pasta and Pizza'),
('Lasagna', 'Layers of pasta with ground beef, tomato sauce, and melted cheese', 14.99, 'Pasta', true, 'Pasta and Pizza'),
('Caperese Salad', 'Fresh tomatoes, mozzarella, basil, and olive oil', 7.99, 'Salad', true, 'Pasta and Pizza'),
('Tiramissu', 'Traditional Italian dessert made with coffee-soaked ladyfingers and mascarpone', 5.99, 'Dessert', true, 'Pasta and Pizza'),
('Limoncello', 'Italian lemon liqueur served chilled', 4.99, 'Drink', true, 'Pasta and Pizza');

INSERT INTO meal VALUES
('Sushi Rolls', 'Fresh sushi rolls with tuna, salmon, avocado, and cucumber', 14.99, 'Sushi', true, 'Fish and Rice'),
('Salmon Sashimi', 'Thinly sliced fresh salmon served with soy sauce and wasabi', 12.99, 'Sushi', true, 'Fish and Rice'),
('Unagi Don', 'Grilled eel served over a bed of steamed rice with sweet soy sauce', 16.99, 'Rice Dish', true, 'Fish and Rice'),
('California Roll', 'Sushi roll with crab, avocado, and cucumber, wrapped in nori and rice', 13.49, 'Sushi', true, 'Fish and Rice'),
('Tempura Fish', 'Crispy battered fish served with a side of dipping sauce', 11.99, 'Appetizer', true, 'Fish and Rice'),
('Tuna Poke Bowl', 'Marinated tuna with avocado, cucumber, edamame, and rice', 15.49, 'Rice Bowl', true, 'Fish and Rice'),
('Fish TAcos', 'Soft tortillas filled with grilled fish, lettuce, and creamy sauce', 10.99, 'Main Course', true, 'Fish and Rice'),
('Miso Soup', 'Traditional Japanese soup made with miso paste, tofu, and seaweed', 4.99, 'Soup', true, 'Fish and Rice'),
('Matcha Cheesecake', 'Delicious matcha-flavored cheesecake with a graham cracker crust', 6.99, 'Dessert', true, 'Fish and Rice'),
('Green Tea', 'Freshly brewed green tea, served hot or iced', 2.99, 'Drink', true, 'Fish and Rice');

INSERT INTO meal VALUES
('Jambalaya', 'Classic Cajun dish with rice, shrimp, sausage, and chicken in a spicy sauce', 18.99, 'Main Course', true, 'Cajun'),
('Crawfish Étouffée', 'Spicy crawfish stew served with rice', 19.99, 'Main Course', true, 'Cajun'),
('Cajun Fried Chicken', 'Crispy fried chicken seasoned with Cajun spices', 14.49, 'Main Course', true, 'Cajun'),
('Gumbo', 'Traditional Louisiana gumbo with sausage, chicken, and okra in a thick broth', 16.99, 'Soup', true, 'Cajun'),
('Shrimp Po Boy', 'A sandwich filled with crispy shrimp, lettuce, and spicy mayo on a baguette', 12.99, 'Sandwich', true, 'Cajun'),
('Cajun Fries', 'Crispy fries seasoned with Cajun spices and served with dipping sauce', 5.99, 'Side', true, 'Cajun'),
('Cajun Grilled Salmon', 'Grilled salmon fillet with Cajun seasoning, served with rice and vegetables', 22.99, 'Main Course', true, 'Cajun'),
('Fried Catfish', 'Crispy fried catfish served with cornbread and coleslaw', 13.99, 'Main Course', true, 'Cajun'),
('Bread Pudding', 'Classic Southern bread pudding with rum sauce', 6.99, 'Dessert', true, 'Cajun'),
('Hurricane Cocktail', 'Tropical cocktail made with rum, passion fruit juice, and orange juice', 8.99, 'Drink', true, 'Cajun');

INSERT INTO meal VALUES
('Coq au Vin', 'Classic French dish with chicken braised in red wine, mushrooms, and onions', 22.99, 'Main Course', true, 'Sharman'),
('Bouillabaisse', 'Traditional Provençal fish stew with seafood, tomatoes, and saffron', 26.99, 'Soup', true, 'Sharman'),
('Ratatouille', 'Vegetable medley of eggplant, zucchini, peppers, and tomatoes, cooked in olive oil', 14.99, 'Main Course', true, 'Sharman'),
('Beef Bourguignon', 'Slow-cooked beef stew with red wine, carrots, onions, and garlic', 24.49, 'Main Course', true, 'Sharman'),
('Salmon en Papillote', 'Salmon fillet baked in parchment paper with herbs, garlic, and vegetables', 21.99, 'Main Course', true, 'Sharman'),
('Escargots de Bourgogne', 'Snails cooked in garlic butter and herbs, served with baguette', 13.99, 'Appetizer', true, 'Sharman'),
('Quiche Lorraine', 'Savory pie with bacon, cheese, and egg custard filling', 12.99, 'Appetizer', true, 'Sharman'),
('Crème Brûlée', 'Classic French dessert with vanilla custard topped with caramelized sugar', 7.99, 'Dessert', true, 'Sharman'),
('Tarte Tatin', 'Upside-down caramelized apple tart', 8.99, 'Dessert', true, 'Sharman'),
('French Wine', 'A selection of fine French wines from Bordeaux and Burgundy', 9.99, 'Drink', true, 'Sharman');

INSERT INTO meal VALUES
('Beef Tacos', 'Soft corn tortillas filled with seasoned beef, lettuce, cheese, and salsa', 9.99, 'Taco', true, 'Taco Land'),
('Chicken Quesadilla', 'Grilled flour tortilla filled with chicken, cheese, and served with guacamole', 11.49, 'Appetizer', true, 'Taco Land'),
('Fish tacos', 'Crispy battered fish fillets with cabbage slaw, cilantro, and lime', 12.99, 'Taco', true, 'Taco Land'),
('Carnitas Burrito', 'Flour tortilla stuffed with slow-cooked pork, rice, beans, and salsa', 13.49, 'Burrito', true, 'Taco Land'),
('Vegetarian Taco', 'Taco with black beans, grilled peppers, onions, lettuce, and avocado', 8.99, 'Taco', true, 'Taco Land'),
('Nachos Supreme', 'Tortilla chips topped with melted cheese, jalapeños, sour cream, and guacamole', 10.99, 'Side', true, 'Taco Land'),
('Churros', 'Fried dough pastry sprinkled with cinnamon sugar, served with chocolate dipping sauce', 5.99, 'Dessert', true, 'Taco Land'),
('Guacamole & Chips', 'Fresh guacamole served with crispy tortilla chips', 7.99, 'Side', true, 'Taco Land'),
('Taco Salad', 'Crispy tortilla bowl filled with seasoned beef, lettuce, cheese, sour cream, and salsa', 11.49, 'Salad', true, 'Taco Land'),
('Margarita', 'Classic cocktail made with tequila, lime juice, and orange liqueur, served on the rocks', 6.99, 'Drink', true, 'Taco Land');

INSERT INTO meal VALUES
('Wiener Schnitzel', 'Breaded and fried veal cutlet served with lemon, potato salad, and lingonberry sauce', 18.99, 'Main Course', true, 'Bavarian Courtyard'),
('Bratwurst', 'Grilled pork sausage served with sauerkraut and mustard', 14.49, 'Main Course', true, 'Bavarian Courtyard'),
('Pretzel', 'Soft and warm Bavarian pretzel served with mustard', 6.99, 'Appetizer', true, 'Bavarian Courtyard'),
('Kartoffelsalat', 'Traditional German potato salad with vinegar, bacon, and onions', 7.99, 'Side', true, 'Bavarian Courtyard'),
('Sauerbraten', 'Slow-cooked beef roast marinated in vinegar and spices, served with red cabbage and dumplings', 22.49, 'Main Course', true, 'Bavarian Courtyard'),
('Spätzle', 'Handmade egg noodles served with cheese and caramelized onions', 12.99, 'Side', true, 'Bavarian Courtyard'),
('Königsberger Klopse', 'German meatballs in a creamy caper sauce served with potatoes', 17.99, 'Main Course', true, 'Bavarian Courtyard'),
('Apfelstrudel', 'Classic German apple strudel with raisins, cinnamon, and a dusting of powdered sugar', 6.49, 'Dessert', true, 'Bavarian Courtyard'),
('Hefeweizen', 'Traditional Bavarian wheat beer, served cold and refreshing', 5.99, 'Drink', true, 'Bavarian Courtyard'),
('Biergarten Platter', 'Assorted sausages, pretzels, sauerkraut, and mustard served on a large platter', 20.99, 'Appetizer', true, 'Bavarian Courtyard');

INSERT INTO meal VALUES
('Lamb Shashlik', 'Succulent pieces of marinated lamb grilled to perfection and served with fresh vegetables', 15.99, 'Main Course', true, 'Shashlik Paradise'),
('Chicken Shashlik', 'Juicy pieces of chicken marinated in herbs and spices, grilled and served with a side of rice', 13.49, 'Main Course', true, 'Shashlik Paradise'),
('Pork Shashlik', 'Tender pork pieces marinated in a special sauce and grilled with onions, served with bread', 14.99, 'Main Course', true, 'Shashlik Paradise'),
('Vegetarian Shashlik', 'Grilled vegetables including bell peppers, zucchini, and tomatoes, served with a yogurt dip', 11.99, 'Main Course', true, 'Shashlik Paradise'),
('Shashlik Platter', 'A selection of mixed shashlik, including lamb, chicken, and pork, served with rice and salad', 18.49, 'Platter', true, 'Shashlik Paradise'),
('Samosas', 'Deep-fried pastry pockets filled with spiced potatoes and peas, served with a mint chutney', 5.99, 'Appetizer', true, 'Shashlik Paradise'),
('Lahmacun', 'Turkish flatbread topped with spiced minced meat, onions, and tomatoes, served with fresh herbs', 7.49, 'Appetizer', true, 'Shashlik Paradise'),
('Pilaf', 'Fragrant rice dish cooked with vegetables and spices, often served as a side to shashlik', 6.99, 'Side', true, 'Shashlik Paradise'),
('Grilled Bread', 'Freshly baked bread grilled and served with garlic butter', 3.99, 'Side', true, 'Shashlik Paradise'),
('Bakhlava', 'Sweet pastry made with layers of filo dough, filled with nuts and soaked in honey syrup', 4.99, 'Dessert', true, 'Shashlik Paradise');

INSERT INTO meal VALUES
('Kebab', 'Grilled minced meat skewers served with aromatic rice, grilled vegetables, and yogurt sauce', 17.99, 'Main Course', true, 'Sabzi'),
('Fesenjan', 'Persian stew with chicken, pomegranate, and walnut sauce, served with saffron rice', 19.49, 'Main Course', true, 'Sabzi'),
('Ghormeh Sabzi', 'Traditional Persian herb stew with lamb, kidney beans, and dried limes, served with rice', 18.99, 'Main Course', true, 'Sabzi'),
('Tahchin', 'Layered rice dish with saffron, chicken, and yogurt, baked to crispy perfection', 16.49, 'Main Course', true, 'Sabzi'),
('Dolmeh', 'Grape leaves stuffed with a mixture of rice, herbs, and ground meat, served with yogurt', 9.99, 'Appetizer', true, 'Sabzi'),
('Mirza Ghasemi', 'Smoked eggplant dip with tomatoes, garlic, and eggs, served with flatbread', 7.99, 'Appetizer', true, 'Sabzi'),
('Kuku Sabzi', 'Persian herb and vegetable frittata made with eggs and fresh herbs', 11.49, 'Appetizer', true, 'Sabzi'),
('Shirin Polow', 'Sweet rice with orange zest, saffron, nuts, and barberries, often served with lamb', 14.99, 'Side', true, 'Sabzi'),
('Bakllava', 'Rich and sweet pastry made of layers of filo dough, filled with nuts and soaked in syrup', 5.99, 'Dessert', true, 'Sabzi'),
('Persian Tea', 'Traditional Persian black tea served with sugar cubes and saffron', 2.99, 'Drink', true, 'Sabzi');

INSERT INTO meal VALUES
('Grilled Salmon', 'Freshly grilled salmon fillet served with a side of sautéed vegetables and mashed potatoes', 22.99, 'Main Course', true, 'Sea Breeze'),
('Lobster Tail', 'Succulent lobster tail served with melted butter, lemon wedges, and rice pilaf', 34.99, 'Main Course', true, 'Sea Breeze'),
('Seafood Paela', 'A traditional Spanish dish with a variety of seafood, rice, vegetables, and saffron', 28.99, 'Main Course', true, 'Sea Breeze'),
('Shrimp Cocktail', 'Chilled shrimp served with a tangy cocktail sauce and lemon slices', 12.99, 'Appetizer', true, 'Sea Breeze'),
('Fish Tacos', 'Soft tortillas filled with grilled fish, cabbage slaw, and a creamy chipotle sauce', 14.49, 'Taco', true, 'Sea Breeze'),
('Clam Chowder', 'Creamy soup made with fresh clams, potatoes, celery, and a blend of spices', 8.99, 'Soup', true, 'Sea Breeze'),
('Crab Cakes', 'Golden brown crab cakes served with a side of remoulade sauce and mixed greens', 15.99, 'Appetizer', true, 'Sea Breeze'),
('Grilled Octopus', 'Tender grilled octopus served with lemon, olive oil, and a side of Mediterranean salad', 18.99, 'Main Course', true, 'Sea Breeze'),
('Seafood Risotto', 'Creamy risotto with shrimp, scallops, and mussels, topped with Parmesan', 24.49, 'Main Course', true, 'Sea Breeze'),
('Key Lime Pie', 'A tangy and sweet key lime pie with a graham cracker crust and whipped cream', 6.99, 'Dessert', true, 'Sea Breeze');

INSERT INTO staff VALUES
('mario_chef', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Pasta and Pizza'),
('luigi_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Pasta and Pizza'),
('anna_waitress', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Pasta and Pizza');

INSERT INTO staff VALUES 
('john_sushi_chef', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Fish and Rice'),
('emily_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Fish and Rice'),
('ryan_waiter', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Fish and Rice');

INSERT INTO staff VALUES 
('louis_head_chef', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Cajun'),
('claire_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Cajun'),
('tyler_server', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Cajun');

INSERT INTO staff VALUES 
('ali_master_chef', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sharman'),
('layla_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sharman'),
('omar_waiter', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sharman');

INSERT INTO staff VALUES 
('carlos_head_chef', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Taco Land'),
('maria_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Taco Land'),
('javier_server', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Taco Land');

INSERT INTO staff VALUES 
('hans_head_chef', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Bavarian Courtyard'),
('greta_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Bavarian Courtyard'),
('lars_server', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Bavarian Courtyard');

INSERT INTO staff VALUES 
('dmitry_grill_master', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Shashlik Paradise'),
('elena_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Shashlik Paradise'),
('ivan_server', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Shashlik Paradise');

INSERT INTO staff VALUES 
('rahul_chef', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sabzi'),
('priya_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sabzi'),
('arjun_waiter', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sabzi');

INSERT INTO staff VALUES 
('linda_head_chef', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sea Breeze'),
('james_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sea Breeze'),
('sophia_waitress', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Sea Breeze');

INSERT INTO staff VALUES 
('mike_grill_master', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Texas Bar'),
('susan_manager', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Texas Bar'),
('jack_server', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Texas Bar');

INSERT INTO staff VALUES
-- Для ресторана Delicious Life
('MichaelScott', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Delicious Life'),
('EmilyDavis', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Delicious Life'),
('RyanReynolds', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Delicious Life');

INSERT INTO staff VALUES
('SophiaMiller', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Pizza Mania'),
('LiamWilson', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Pizza Mania'),
('OliviaBrown', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Pizza Mania');

INSERT INTO staff VALUES
('DanielHarris', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Caucasian Restaurant'),
('CharlotteLee', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Caucasian Restaurant'),
('EthanWalker', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S', true, 'Caucasian Restaurant');

INSERT INTO meal VALUES
-- Для ресторана Delicious Life
('Beef Wellington', 'Tender beef wrapped in puff pastry, served with a rich mushroom sauce.', 28.99, 'Main Course', true, 'Delicious Life'),
('Chicken Kiev', 'Chicken breast stuffed with garlic butter and herbs, breaded and fried.', 18.99, 'Main Course', true, 'Delicious Life'),
('Caesar Salad', 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.', 9.99, 'Salad', true, 'Delicious Life'),
('Borscht', 'Traditional beet soup served with sour cream and dill.', 7.99, 'Soup', true, 'Delicious Life'),
('Beef Stroganoff', 'Tender beef in a creamy mushroom sauce served with egg noodles.', 22.49, 'Main Course', true, 'Delicious Life'),
('Grilled Salmon with Asparagus', 'Salmon fillet grilled to perfection, served with steamed asparagus.', 21.49, 'Main Course', true, 'Delicious Life'),
('French Onion Soup', 'A rich onion broth topped with melted cheese and crusty bread.', 8.49, 'Soup', true, 'Delicious Life'),
('Chicken Alfredo', 'Fettuccine pasta served in a creamy Alfredo sauce with grilled chicken.', 19.99, 'Main Course', true, 'Delicious Life'),
('Coq Au Vin', 'Chicken braised in red wine with vegetables and herbs.', 24.99, 'Main Course', true, 'Delicious Life'),
('Shrimp Scampi', 'Shrimp cooked in garlic butter sauce with a hint of lemon, served with pasta.', 21.99, 'Main Course', true, 'Delicious Life'),
('Veal Schnitzel', 'Breaded and fried veal cutlet served with mashed potatoes and gravy.', 20.99, 'Main Course', true, 'Delicious Life'),
('Ratatouile', 'A vegetable medley of zucchini, eggplant, and tomatoes, stewed in olive oil and herbs.', 14.99, 'Side Dish', true, 'Delicious Life'),
('Duck ala Orange', 'Duck breast served with a sweet and tangy orange sauce.', 29.99, 'Main Course', true, 'Delicious Life'),
('Filet Mignon', 'Prime cut of beef, grilled to perfection and served with a rich sauce.', 34.99, 'Main Course', true, 'Delicious Life'),
('Tirramisu', 'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.', 8.99, 'Dessert', true, 'Delicious Life'),

-- Для ресторана Pizza Mania
('Margharita Pizza', 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.', 12.99, 'Pizza', true, 'Pizza Mania'),
('Pepperroni Pizza', 'Tomato sauce, mozzarella cheese, and pepperoni slices.', 14.99, 'Pizza', true, 'Pizza Mania'),
('Quattro Formaggi Pizza', 'Four cheese pizza with mozzarella, gorgonzola, parmesan, and ricotta.', 16.99, 'Pizza', true, 'Pizza Mania'),
('Calzone', 'Folded pizza stuffed with ricotta cheese, mozzarella, and your choice of toppings.', 15.49, 'Pizza', true, 'Pizza Mania'),
('Caprese Salad', 'Fresh tomatoes, mozzarella, basil, and balsamic vinegar.', 7.99, 'Salad', true, 'Pizza Mania'),
('Spaghetti Carbonara', 'Spaghetti pasta tossed in a creamy egg-based sauce with pancetta and parmesan.', 16.99, 'Pasta', true, 'Pizza Mania'),
('Lasagna Bolognese', 'Layers of pasta, beef bolognese sauce, and melted cheese.', 18.49, 'Pasta', true, 'Pizza Mania'),
('Risotto alla Milanese', 'Creamy risotto made with saffron and parmesan.', 17.99, 'Main Course', true, 'Pizza Mania'),
('Focaccia', 'Fluffy Italian bread with olive oil, garlic, and rosemary.', 6.99, 'Bread', true, 'Pizza Mania'),
('Penne Arrabbiata', 'Penne pasta served in a spicy tomato sauce with garlic and chili flakes.', 14.49, 'Pasta', true, 'Pizza Mania'),
('Bruschetta', 'Toasted bread topped with diced tomatoes, garlic, and basil.', 7.49, 'Appetizer', true, 'Pizza Mania'),
('Tiramisu', 'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.', 8.99, 'Dessert', true, 'Pizza Mania'),
('Panna Cotta', 'Vanilla-flavored cream dessert topped with berries.', 7.99, 'Dessert', true, 'Pizza Mania'),
('Cannoli', 'Crispy pastry filled with sweet ricotta cream and chocolate chips.', 5.99, 'Dessert', true, 'Pizza Mania'),

-- Для ресторана Caucasian Restaurant
('Shashlik', 'Grilled skewers of marinated meat served with vegetables and rice.', 19.99, 'Main Course', true, 'Caucasian Restaurant'),
('Khachapuri', 'Traditional Georgian bread filled with melted cheese and egg.', 13.99, 'Appetizer', true, 'Caucasian Restaurant'),
('Lobio', 'Stewed red beans with spices and herbs, served with bread.', 10.99, 'Side Dish', true, 'Caucasian Restaurant'),
('Plov', 'Rice pilaf with lamb, carrots, and spices.', 18.49, 'Main Course', true, 'Caucasian Restaurant'),
('Dolma', 'Grapevine leaves stuffed with rice, meat, and herbs, served with yogurt.', 12.99, 'Appetizer', true, 'Caucasian Restaurant'),
('Khinkali', 'Georgian dumplings filled with spiced meat and served with broth.', 14.49, 'Main Course', true, 'Caucasian Restaurant'),
('Mtsvadi', 'Grilled pork skewers marinated in wine and herbs, served with fresh vegetables.', 20.99, 'Main Course', true, 'Caucasian Restaurant'),
('Ajapsandali', 'A vegetable stew with eggplant, tomatoes, peppers, and garlic.', 13.49, 'Main Course', true, 'Caucasian Restaurant'),
('Chakapuli', 'Lamb stew cooked with herbs and tarragon in a wine sauce.', 22.49, 'Main Course', true, 'Caucasian Restaurant'),
('Pkhali', 'Vegetable pâté made from spinach, walnuts, and garlic.', 8.99, 'Appetizer', true, 'Caucasian Restaurant'),
('Satsivi', 'Chicken cooked in a walnut sauce with garlic and herbs.', 19.49, 'Main Course', true, 'Caucasian Restaurant'),
('Fried Trout', 'Grilled trout served with garlic and herbs.', 17.99, 'Main Course', true, 'Caucasian Restaurant'),
('Baklava', 'Sweet pastry made with layers of filo dough and honey, filled with nuts.', 6.99, 'Dessert', true, 'Caucasian Restaurant'),
('Churchela', 'Traditional Georgian candy made from nuts and grape juice.', 4.99, 'Dessert', true, 'Caucasian Restaurant');

INSERT INTO meal VALUES
('Grilled Tuna Steak', 'Fresh tuna steak grilled to perfection, served with a side of rice and vegetables.', 23.99, 'Main Course', true, 'Fish and Rice'),
('Salmon Sushimi', 'Thinly sliced raw salmon served with wasabi, soy sauce, and pickled ginger.', 16.49, 'Appetizer', true, 'Fish and Rice'),
('Seafood Paella', 'Traditional Spanish dish made with rice, shrimp, mussels, squid, and saffron.', 27.99, 'Main Course', true, 'Fish and Rice'),
('Rice Pudding with Mango', 'Creamy rice pudding served with fresh mango slices and a drizzle of honey.', 7.99, 'Dessert', true, 'Fish and Rice'),
('Miso Soup with Fish', 'A savory Japanese soup made with miso paste, fish, tofu, and seaweed.', 6.99, 'Soup', true, 'Fish and Rice');

INSERT INTO meal VALUES
('Chicken Tikka Masala', 'Tender chicken pieces cooked in a rich and creamy tomato-based sauce with Indian spices.', 18.99, 'Main Course', true, 'Sharman'),
('Lamb Biryani', 'Aromatic basmati rice cooked with tender lamb and seasoned with fragrant spices like cardamom and saffron.', 21.49, 'Main Course', true, 'Sharman'),
('Paneer Butter Masala', 'Cottage cheese cubes cooked in a rich and creamy tomato-based gravy with Indian spices.', 16.99, 'Main Course', true, 'Sharman'),
('Samosa', 'Crispy fried pastry filled with spiced potatoes, peas, and herbs.', 5.99, 'Appetizer', true, 'Sharman'),
('Mango Lassi', 'A refreshing yogurt-based drink blended with ripe mangoes and a touch of cardamom.', 4.99, 'Beverage', true, 'Sharman');

INSERT INTO meal VALUES
('Wiener Schnitziel', 'Crispy breaded veal cutlet served with lemon wedges, potato salad, and lingonberry jam.', 22.99, 'Main Course', true, 'Bavarian Courtyard'),
('Pretzel with Mustard', 'Soft, freshly baked Bavarian pretzel served with tangy mustard for dipping.', 6.99, 'Appetizer', true, 'Bavarian Courtyard'),
('Saerbraten', 'Marinated beef pot roast slow-cooked with onions, vinegar, and spices, served with red cabbage and potato dumplings.', 24.49, 'Main Course', true, 'Bavarian Courtyard'),
('Bratwurst with Sauerkraut', 'Grilled pork sausage served with tangy sauerkraut and mustard.', 18.99, 'Main Course', true, 'Bavarian Courtyard'),
('Kartoffelsalad', 'Traditional Bavarian potato salad made with potatoes, onions, bacon, and a tangy mustard dressing.', 8.49, 'Side Dish', true, 'Bavarian Courtyard'),
('Bavarian Beer Soup', 'A hearty and creamy soup made with beer, broth, cheese, and herbs, topped with croutons.', 9.99, 'Soup', true, 'Bavarian Courtyard'),
('Apfelztrudel', 'Warm apple strudel with cinnamon, raisins, and a flakey pastry crust, served with vanilla sauce.', 7.99, 'Dessert', true, 'Bavarian Courtyard');

INSERT INTO meal VALUES
('Taco al Pastor', 'Marinated pork cooked on a vertical rotisserie, served with pineapple, onions, cilantro, and salsa on a corn tortilla.', 10.99, 'Main Course', true, 'Taco Land'),
('Chicken Quesaddilla', 'Flour tortilla filled with grilled chicken, melted cheese, and served with guacamole and sour cream.', 12.49, 'Main Course', true, 'Taco Land'),
('Elote', 'Grilled corn on the cob coated with creamy mayo, cotija cheese, chili powder, and a squeeze of lime.', 5.99, 'Side Dish', true, 'Taco Land');

INSERT INTO meal VALUES
('Texas BBQ Ribs', 'Tender pork ribs slow-cooked and glazed with smoky barbecue sauce, served with coleslaw and cornbread.', 24.99, 'Main Course', true, 'Texas Bar'),
('Chili Con Carne', 'A hearty and spicy beef chili cooked with beans, tomatoes, and a blend of spices, served with cornbread.', 15.99, 'Main Course', true, 'Texas Bar'),
('Fried Pickles', 'Crispy battered and deep-fried dill pickle slices, served with ranch dipping sauce.', 7.99, 'Appetizer', true, 'Texas Bar');

INSERT INTO meal VALUES
('Lobster Thermidor', 'Lobster meat cooked in a creamy mustard sauce, served in the lobster shell, and gratinated.', 39.99, 'Main Course', true, 'Delicious Life'),
('Filet Mignon with Truffle Butter', 'Tender filet mignon grilled to perfection, served with a luxurious truffle butter sauce and mashed potatoes.', 45.99, 'Main Course', true, 'Delicious Life'),
('Pumpkin Soup', 'A velvety smooth pumpkin soup with a hint of cinnamon and nutmeg, garnished with roasted seeds.', 10.99, 'Soup', true, 'Delicious Life'),
('Tuna Tartare', 'Fresh tuna finely diced and mixed with avocado, sesame oil, and a light soy dressing.', 18.99, 'Appetizer', true, 'Delicious Life'),
('Roasted Rack of Lamb', 'Tender rack of lamb roasted with garlic, rosemary, and served with a rich red wine sauce and roasted vegetables.', 32.99, 'Main Course', true, 'Delicious Life'),
('Chocolate Soufflé', 'Light and airy chocolate soufflé, served with a side of vanilla ice cream.', 9.99, 'Dessert', true, 'Delicious Life');


INSERT INTO meal VALUES
('Shweinshaxe', 'Roasted pork knuckle served with crispy crackling, mashed potatoes, and sauerkraut.', 26.99, 'Main Course', true, 'Bavarian Courtyard'),
('Leberknödel', 'Traditional Bavarian liver dumplings served in a rich beef broth with a side of sauerkraut.', 15.49, 'Main Course', true, 'Bavarian Courtyard'),
('Bavarian Sausage Platter', 'A selection of assorted grilled sausages, served with mustard, sauerkraut, and warm pretzels.', 21.99, 'Main Course', true, 'Bavarian Courtyard'),
('Käsespätzle', 'Bavarian-style egg noodles with melted cheese, topped with crispy onions and served with a side salad.', 14.49, 'Main Course', true, 'Bavarian Courtyard'),
('Zwiebelrostbraten', 'Grilled beef steak topped with caramelized onions, served with roasted potatoes and gravy.', 22.49, 'Main Course', true, 'Bavarian Courtyard');




