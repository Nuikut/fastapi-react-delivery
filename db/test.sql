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
('Texas Bar', 'Nevsky Ave., 50, St. Petersburg', 'American (grill)', 'AlexeyPavlov', '$2b$12$ZFKZsd/UTJzlGhC5DBaRYO96bSSsGyIJphbfxuxUVlPX39dySIN6S');

INSERT INTO meal VALUES
('BBQ Ribs', 'Slow-cooked pork ribs with house-made BBQ sauce', 18.99, 'Main Course', true, 'Texas Bar'),
('Texas Steak', '12 oz grilled ribeye steak served with garlic butter', 24.99, 'Main Course', true, 'Texas Bar'),
('Buffalo Wings', 'Crispy chicken wings tossed in spicy buffalo sauce', 10.99, 'Appetizer', true, 'Texas Bar'),
('Loaded Nachos', 'Corn tortilla chips topped with cheese, jalapeños, and salsa', 9.99, 'Appetizer', true, 'Texas Bar'),
('Chili Con Carne', 'Classic Texan chili with beef and beans, served with cornbread', 12.99, 'Main Course', true, 'Texas Bar'),
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
('Penne Arrabbiata', 'Penne pasta with spicy tomato sauce, garlic, and chili flakes', 10.99, 'Pasta', true, 'Pasta and Pizza'),
('Lasagna', 'Layers of pasta with ground beef, tomato sauce, and melted cheese', 14.99, 'Pasta', true, 'Pasta and Pizza'),
('Caprese Salad', 'Fresh tomatoes, mozzarella, basil, and olive oil', 7.99, 'Salad', true, 'Pasta and Pizza'),
('Tiramisu', 'Traditional Italian dessert made with coffee-soaked ladyfingers and mascarpone', 5.99, 'Dessert', true, 'Pasta and Pizza'),
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
('Baklava', 'Sweet pastry made with layers of filo dough, filled with nuts and soaked in honey syrup', 4.99, 'Dessert', true, 'Shashlik Paradise');

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
('Seafood Paella', 'A traditional Spanish dish with a variety of seafood, rice, vegetables, and saffron', 28.99, 'Main Course', true, 'Sea Breeze'),
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
