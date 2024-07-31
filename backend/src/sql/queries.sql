-- Supprimer la table ad_tags_tag si elle existe
DROP TABLE IF EXISTS ad_tags_tag;

-- Supprimer la table ad si elle existe
DROP TABLE IF EXISTS ad;

-- Supprimer la table category si elle existe avec CASCADE
DROP TABLE IF EXISTS category CASCADE;

-- Supprimer la table tag si elle existe
DROP TABLE IF EXISTS tag;

-- Créer la table category
CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Insérer les categories suivantes : vetement, informatique, jeux vidéos, maison, voiture, nature, velo, musique, sport, autre
INSERT INTO category (name) VALUES
('vetement'),
('informatique'),
('jeux vidéos'),
('maison'),
('voiture'),
('nature'),
('vélo'),
('musique'),
('sport'),
('autre');

-- Créer la table tag
CREATE TABLE tag (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Insérer les 3 tags suivants : neuf, occasion, autre
INSERT INTO tag (name) VALUES
('neuf'),
('bon état'),
('état correct');

-- Créer la table ad
CREATE TABLE ad (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  owner VARCHAR(255) NOT NULL,  
  price INT NOT NULL,
  picture VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  categoryId INT NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES category(id) ON DELETE CASCADE
);

-- Insérer 20 annonces dans ces 3 villes : Bordeaux, Paris, Lyon
INSERT INTO ad (title, description, owner, price, picture, location, createdAt, categoryId) VALUES
('Vélo de compétition', 'Vélo en bon état', 'Jean', 100, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Bordeaux', '2020-09-01 00:00:00', 7),
('Voiture de sport', 'Voiture en mauvais état', 'Marie', 2000, 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Paris', '2022-09-01 00:00:00', 5),
('MacBook Air', 'Ordinateur en bon état', 'Jean', 500, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Lyon', '2021-01-01 00:00:00', 2),
('Playstation 5', 'Playstation toute neuve', 'Guillaume', 450, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Bordeaux', '2024-01-01 00:00:00', 3),
('Airpods 2', 'Airpods en bon état', 'Marie', 150, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Paris', '2009-01-01 00:00:00', 2),
('Mug blanc', 'Mug en bon état', 'Jean', 5, 'https://images.unsplash.com/photo-1516390118834-21602d501886?q=80&w=2736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Lyon', '2003-01-01 00:00:00', 4),
('Téléphone ancien', 'Téléphone en bon état', 'Jean', 300, 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?q=80&w=2919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Bordeaux', '2021-01-01 00:00:00', 2),
('Chargeur Iphone', 'Chargeur en bon état', 'Marie', 10, 'https://images.unsplash.com/photo-1557767382-97b28f5488e7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Paris', '1945-01-01 00:00:00', 2),
('Carte du monde', 'Carte en bon état', 'Jean', 1, 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Lyon', '1976-01-01 00:00:00', 6),
('Lit king size', 'Lit en bon état', 'Jean', 200, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Bordeaux', '1990-01-01 00:00:00', 4),
('Radiateur ancien', 'Radiateur en bon état', 'Marie', 50, 'https://images.unsplash.com/photo-1599028274529-31020a1fc1f7?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Paris', '2020-01-01 00:00:00', 4),
('Tapis de course', 'Tapis de course en bon état', 'Jean', 100, 'https://images.unsplash.com/photo-1637714409323-d5e6e9731252?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Lyon', '2000-01-01 00:00:00', 9),
('Vélo de ville', 'Vélo en bon état', 'Jean', 100, 'https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Bordeaux', '2020-01-01 00:00:00', 7),
('BMW', 'Voiture en mauvais état', 'Marie', 2000, 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Paris', '2005-01-01 00:00:00', 5),
('ChromeBook', 'Ordinateur en bon état', 'Jean', 500, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Lyon', '2008-01-01 00:00:00', 2),
('Playstation 4', 'Playstation toute neuve', 'Guillaume', 450, 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?q=80&w=3009&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Bordeaux', '2024-01-01 00:00:00', 3),
('Airpods pro', 'Airpods en bon état', 'Marie', 150, 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=2789&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Paris', '2023-01-01 00:00:00', 2),
('Tasse blanche', 'Mug en bon état', 'Jean', 5, 'https://images.unsplash.com/photo-1605714196241-00bf7a8fe7bb?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Lyon', '2002-01-01 00:00:00', 4),
('Iphone', 'Téléphone en bon état', 'Jean', 300, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Bordeaux', '2021-01-01 00:00:00', 2),
('Plusieurs cables de recharge Iphone', 'Chargeur en bon état', 'Marie', 10, NULL, 'Paris', '1965-01-01 00:00:00', 2);

-- Créer la table ad_tags_tag
CREATE TABLE ad_tags_tag (
  adId INT NOT NULL,
  tagId INT NOT NULL,
  FOREIGN KEY (adId) REFERENCES ad(id) ON DELETE CASCADE,
  FOREIGN KEY (tagId) REFERENCES tag(id) ON DELETE CASCADE
);

-- Insérer les relations ad - tag
INSERT INTO ad_tags_tag (adId, tagId) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(10, 3),
(11, 2),
(16, 1);
