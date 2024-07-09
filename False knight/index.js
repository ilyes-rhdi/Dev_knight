const express = require('express');
const app = express();

app.use(express.json());

// Your routes and other code here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


let characters = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.send('Welcome to the Game Characters API');
});
// GET all characters (with pagination)
app.get('/characters', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedCharacters = characters.slice(startIndex, endIndex);
  
  res.json({
    characters: paginatedCharacters,
    currentPage: page,
    totalPages: Math.ceil(characters.length / limit),
    totalCharacters: characters.length
  });
});

// POST a new character
app.post('/characters', (req, res) => {
  const { name, class: characterClass, level } = req.body;
  
  if (!name || !characterClass || !level) {
    return res.status(400).json({ message: "Name, class, and level are required" });
  }

  const newCharacter = {
    id: nextId++,
    name,
    class: characterClass,
    level: parseInt(level)
  };

  characters.push(newCharacter);
  res.status(201).json(newCharacter);
});

// GET a single character by ID
app.get('/characters/:id', (req, res) => {
  const character = characters.find(c => c.id === parseInt(req.params.id));
  if (!character) {
    return res.status(404).json({ message: "Character not found" });
  }
  res.json(character);
});

// PUT (update) a character
app.put('/characters/:id', (req, res) => {
  const index = characters.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Character not found" });
  }

  const { name, class: characterClass, level } = req.body;
  characters[index] = { 
    ...characters[index], 
    name: name || characters[index].name,
    class: characterClass || characters[index].class,
    level: level ? parseInt(level) : characters[index].level
  };

  res.json(characters[index]);
});

// DELETE a character
app.delete('/characters/:id', (req, res) => {
  const index = characters.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Character not found" });
  }

  characters.splice(index, 1);
  res.status(204).send();
}); 
 characters = [
  { id: 1, name: "Alia", class: "Mage", level: 10 },
  { id: 2, name: "Brahim", class: "Warrior", level: 8 },
  { id: 3, name: "Chemsou", class: "Archer", level: 2 },
  // You can add more characters here following the same format
];
