<?php

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "pokemonData";


$conn = new mysqli($servername, $username, $password);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully\n";
} else {
    echo "Error creating database: " . $conn->error;
}


$conn->select_db($dbname);

$sql = "CREATE TABLE IF NOT EXISTS pokemons (
    Name VARCHAR(255),
	Evolution INT,
    Type1 VARCHAR(255),
    HP INT,
    Current_HP INT,
    Attack INT,
	Defense INT,
    Special_Attack INT,
	Experience_Points INT,
    Generation INT

)";
if ($conn->query($sql) === TRUE) {
    echo "Table created successfully\n";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql = "INSERT INTO pokemons (Name, Evolution, Type1, HP, Current_HP, Attack, Defense, Special_Attack, Experience_Points, Generation) VALUES 
('Charmander', 1, 'Fire', 79, 79, 10, 5, 27, 0, 1),
('Charmeleon', 2, 'Fire', 81, 81, 14, 9, 20, 0, 1),
('Charizard', 3, 'Fire', 90, 90, 11, 5, 22, 0, 1),
('Squirtle', 1, 'Water', 71, 71, 13, 8, 23, 0, 1),
('Wartortle', 2, 'Water', 88, 88, 10, 7, 28, 0, 1),
('Blastoise', 3, 'Water', 95, 95, 10, 6, 26, 0, 1),
('Caterpie', 1, 'Bug', 76, 76, 11, 5, 25, 0, 1),
('Metapod', 2, 'Bug', 85, 85, 13, 6, 23, 0, 1),
('Butterfree', 3, 'Bug', 91, 91, 10, 5, 28, 0, 1),
('Weedle', 1, 'Bug', 76, 76, 14, 10, 22, 0, 1),
('Kakuna', 2, 'Bug', 90, 90, 12, 8, 22, 0, 1),
('Beedrill', 3,	'Bug', 94, 94, 14, 9, 20, 0, 1),
('Pidgey', 1, 'Normal', 80, 80, 15, 10, 20, 0, 1),
('Pidgeotto', 2, 'Normal', 80, 80, 12, 7, 23, 0, 1),
('Pidgeot', 3, 'Normal', 94, 94, 15, 6, 25, 0, 1),
('Rattata', 1, 'Normal', 72, 72, 11, 5, 21, 0, 1),
('Spearow', 1, 'Normal', 75, 75, 13, 10, 20, 0, 1),
('Fearow', 2, 'Normal', 85, 85, 11, 7, 25, 0, 1),
('Ekans', 1, 'Poison', 80, 80, 10, 8, 23, 0, 1),
('Arbok', 2, 'Poison', 82, 82, 12, 8, 26, 0, 1),
('Pikachu', 1, 'Electric', 75, 75, 10, 6, 22, 0, 1),
('Raichu', 2, 'Electric', 87, 87, 13, 9, 23, 0, 1),
('Sandshrew', 1, 'Ground', 74, 74, 12, 8, 25, 0, 1),
('Sandslash', 2, 'Ground', 88, 88, 13, 6, 30, 0, 1),
('Nidoranâ™€', 1, 'Poison', 79, 79, 10, 6, 28, 0, 1),
('Nidorina', 2, 'Poison', 90, 90, 15, 6, 23, 0, 1),
('Nidoqueen', 3, 'Poison', 91, 91, 13, 6, 30, 0, 1),
('Nidoranâ™', 1, 'Poison', 79, 79, 14, 7, 20, 0, 1),
('Nidorino', 2, 'Poison', 86, 86, 13, 7, 27, 0, 1),
('Nidoking', 3, 'Poison', 97, 97, 14, 10, 26, 0, 1),
('Clefairy', 1, 'Fairy', 75, 75, 15, 5, 25, 0, 1),
('Clefable', 2, 'Fairy', 83, 83, 14, 7, 30, 0, 1),
('Vulpix', 1, 'Fire', 73, 73, 10, 9, 28, 0, 1),
('Ninetales', 2, 'Fire', 83, 83, 15, 7, 27, 0, 1),
('Jigglypuff', 1, 'Normal', 78, 78, 15, 6, 26, 0, 1),
('Wigglytuff', 2, 'Normal', 83, 83, 10, 8, 27, 0, 1),
('Zubat', 1, 'Poison', 74, 74, 13, 8, 25, 0, 1),
('Golbat', 2, 'Poison', 80, 80, 11, 7, 27, 0, 1),
('Oddish', 1, 'Grass', 70, 70, 13, 5, 25, 0, 1),
('Gloom', 2, 'Grass', 87, 87, 15, 8, 23, 0, 1),
('Vileplume', 3, 'Grass', 98, 98, 15, 8, 26, 0, 1),
('Paras', 1, 'Bug', 71, 71, 10, 5, 29, 0, 1),
('Parasect', 2, 'Bug', 82, 82, 14, 8, 28, 0, 1),
('Venonat', 1, 'Bug', 70, 70, 13, 9, 25, 0, 1),
('Venomoth', 2, 'Bug', 88, 88, 15, 6, 20, 0, 1),
('Diglett', 1, 'Ground', 71, 71, 11, 9, 22, 0, 1),
('Dugtrio', 2, 'Ground', 89, 89, 10, 8, 28, 0, 1),
('Meowth', 1, 'Normal', 79, 79, 13, 6, 25, 0, 1),
('Persian', 2, 'Normal', 81, 81, 12, 7, 23, 0, 1),
('Psyduck', 1, 'Water', 70, 70, 11, 10, 25, 0, 1),
('Golduck', 2, 'Water', 84, 84, 15, 5, 26, 0, 1),
('Mankey', 1, 'Fighting', 72, 72, 10, 8, 28, 0, 1),
('Primeape', 2, 'Fighting', 84, 84, 10, 6, 25, 0, 1),
('Growlithe', 1, 'Fire', 72, 72, 11, 9, 29, 0, 1),
('Arcanine', 2, 'Fire', 83, 83, 14, 8, 24, 0, 1),
('Poliwag', 1, 'Water', 76, 76, 12, 6, 26, 0, 1),
('Poliwhirl', 2, 'Water', 87, 87, 10, 5, 27, 0, 1),
('Poliwrath', 3, 'Water', 93, 93, 12, 8, 30, 0, 1),
('Abra', 1, 'Psychic', 70, 70, 13, 5, 29, 0, 1),
('Kadabra', 2, 'Psychic', 81, 81, 12, 9, 29, 0, 1),
('Alakazam', 3, 'Psychic', 91, 91, 11, 7, 29, 0, 1),
('Machop', 1, 'Fighting', 71, 71, 14, 7, 20, 0, 1),
('Machoke', 2, 'Fighting', 80, 80, 10, 5, 24, 0, 1),
('Machamp', 3, 'Fighting', 90, 90, 15, 6, 22, 0, 1),
('Bellsprout', 1, 'Grass', 73, 73, 13, 5, 26, 0, 1),
('Weepinbell', 2, 'Grass', 85, 85, 12, 6, 29, 0, 1),
('Victreebel', 3, 'Grass', 99, 99, 14, 8, 24, 0, 1),
('Tentacool', 1, 'Water', 79, 79, 13, 8, 21, 0, 1),
('Tentacruel', 2, 'Water', 86, 86, 14, 9, 26, 0, 1),
('Geodude', 1, 'Rock', 73, 73, 10, 7, 25, 0, 1),
('Graveler', 2, 'Rock', 86, 86, 10, 7, 28, 0, 1),
('Golem', 3, 'Rock', 99, 99, 10, 7, 30, 0, 1),
('Ponyta', 1, 'Fire', 73, 73, 14, 5, 24, 0, 1),
('Rapidash', 2, 'Fire', 84, 84, 10, 5, 25, 0, 1),
('Slowpoke', 1, 'Water', 78, 78, 10, 7, 27, 0, 1),
('Slowbro', 2, 'Water', 82, 82, 11, 5, 22, 0, 1),
('Magnemite', 1, 'Electric', 73, 73, 11, 5, 27, 0, 1),
('Magneton', 2, 'Electric', 84, 84, 14, 5, 20, 0, 1),
('Doduo', 1, 'Normal', 79, 79, 13, 5, 22, 0, 1),
('Dodrio', 2, 'Normal', 80, 80, 11, 9, 30, 0, 1),
('Seel', 1, 'Water', 79, 79, 10, 6, 29, 0, 1),
('Dewgong', 2, 'Water', 80, 80, 15, 9, 20, 0, 1),
('Grimer', 1, 'Poison', 76, 76, 13, 9, 20, 0, 1),
('Muk', 2, 'Poison', 87, 87, 14, 5, 24, 0, 1),
('Shellder', 1, 'Water', 77, 77, 13, 8, 27, 0, 1),
('Cloyster', 2, 'Water', 86, 86, 15, 10, 23, 0, 1),
('Gastly', 1, 'Ghost', 77, 77, 15, 8, 21, 0, 1),
('Haunter', 2, 'Ghost', 82, 82, 12, 5, 25, 0, 1),
('Gengar', 3, 'Ghost', 94, 94, 14, 7, 26, 0, 1),
('Onix', 1, 'Rock', 79, 79, 15, 7, 24, 0, 1),
('Drowzee', 1, 'Psychic', 70, 70, 13, 6, 30, 0, 1),
('Hypno', 2, 'Psychic', 89, 89, 13, 9, 22, 0, 1),
('Krabby', 1, 'Water', 76, 76, 14, 5, 21, 0, 1),
('Kingler', 2, 'Water', 85, 85, 14, 10, 21, 0, 1),
('Voltorb', 1, 'Electric', 73, 73, 14, 9, 22, 0, 1),
('Electrode', 2, 'Electric', 81, 81, 10, 7, 24, 0, 1),
('Exeggcute', 1, 'Grass', 77, 77, 11, 8, 27, 0, 1),
('Exeggutor', 2, 'Grass', 88, 88, 15, 7, 29, 0, 1),
('Cubone', 1, 'Ground', 73, 73, 13, 8, 29, 0, 1),
('Marowak', 2, 'Ground', 88, 88, 12, 8, 21, 0, 1),
('Hitmonlee', 1, 'Fighting', 82, 82, 11, 7, 29, 0,  1),
('Hitmonchan', 1, 'Fighting', 81, 81, 11, 9, 24, 0, 1),
('Lickitung', 1, 'Normal', 79, 79, 15, 7, 22, 0, 1),
('Koffing', 1, 'Poison', 75, 75, 15, 6, 21, 0, 1),
('Weezing', 2, 'Poison', 85, 85, 12, 6, 23, 0, 1),
('Rhyhorn', 1, 'Ground', 77, 77, 11, 7, 22, 0, 1),
('Rhydon', 2, 'Ground', 90, 90, 15, 9, 23, 0, 1),
('Chansey', 1, 'Normal', 80, 80, 10, 9, 24, 0, 1),
('Tangela', 1, 'Grass', 73, 73, 15, 9, 21, 0, 1),
('Kangaskhan', 1, 'Normal', 72, 72, 11, 9, 23, 0, 1),
('Horsea', 1, 'Water', 77, 77, 12, 6, 20, 0, 1),
('Seadra', 2, 'Water', 82, 82, 10, 6, 25, 0, 1),
('Goldeen', 1, 'Water', 73, 73, 11, 7, 23, 0, 1),
('Seaking', 2, 'Water', 87, 87, 11, 5, 22, 0, 1),
('Staryu', 1, 'Water', 70, 70, 13, 6, 29, 0, 1),
('Starmie', 2, 'Water', 86, 86, 13, 6, 28, 0, 1),
('Mr. Mime', 1, 'Psychic', 79, 79, 12, 9, 25, 0, 1),
('Scyther', 1, 'Bug', 71, 71, 14, 6, 23, 0, 1),
('Jynx', 1, 'Ice', 75, 75, 15, 10, 30, 0, 1),
('Electabuzz', 1, 'Electric', 75, 75, 12, 8, 21, 0, 1),
('Magmar', 1, 'Fire', 80, 80, 15, 6, 23, 0, 1),
('Pinsir', 1, 'Bug', 77, 77, 14, 9, 27, 0, 1),
('Tauros', 1, 'Normal', 88, 88, 15, 9, 20, 0, 1),
('Magikarp', 1, 'Water', 79, 79, 14, 7, 22, 0, 1),
('Gyarados', 2, 'Water', 92, 92, 14, 9, 23, 0, 1),
('Lapras', 1, 'Water', 84, 84, 10, 6, 20, 0, 1),
('Ditto', 1, 'Normal', 88, 88, 15, 9, 21, 0, 1),
('Eevee', 1, 'Normal', 79, 79, 12, 5, 28, 0, 1),
('Vaporeon', 2, 'Water', 85, 85, 13, 6, 21, 0, 1),
('Jolteon', 2, 'Electric', 89, 89, 12, 8, 26, 0, 1),
('Flareon', 2, 'Fire', 89, 89, 13, 9, 20, 0, 1),
('Porygon', 1, 'Normal', 77, 77, 15, 9, 22, 0, 1),
('Omanyte', 1, 'Rock', 72, 72, 14, 9, 29, 0, 1),
('Omastar', 2, 'Rock', 80, 80, 12, 8, 22, 0, 1),
('Kabuto', 1, 'Rock', 74, 74, 13, 6, 22, 0, 1),
('Kabutops', 2, 'Rock', 83, 83, 10, 9, 25, 0, 1),
('Aerodactyl', 1, 'Rock', 71, 71, 12, 6, 27, 0, 1),
('Snorlax', 1, 'Normal', 77, 77, 14, 6, 23, 0, 1),
('Articuno', 1, 'Ice', 73, 73, 15, 7, 24, 0, 1),
('Zapdos', 1, 'Electric', 79, 79, 10, 8, 29, 0, 1),
('Moltres', 1, 'Fire', 75, 75, 15, 7, 26, 0, 1),
('Dratini', 1, 'Dragon', 77, 77, 10, 9, 21, 0, 1),
('Dragonair', 2, 'Dragon', 82, 82, 11, 6, 25, 0, 1),
('Dragonite', 3, 'Dragon', 94, 94, 11, 9, 28, 0, 1),
('Mewtwo', 1, 'Psychic', 71, 71, 12, 9, 21, 0, 1),
('Mega Mewtwo X', 2, 'Psychic', 89, 89, 14, 9, 20, 0, 1),
('Mega Mewtwo Y', 2, 'Psychic', 85, 85, 12, 9, 22, 0, 1),
('Mew', 1, 'Psychic', 78, 78, 15, 5, 22, 0, 1)";



if ($conn->multi_query($sql) === TRUE) {
    echo "Data inserted successfully\n";
} else {
    echo "Error inserting data: " . $conn->error;
}

$conn->close();
?>