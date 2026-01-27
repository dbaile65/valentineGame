const characters = [
    { name: "Ranger", img: "girl1.png" },
    { name: "Adventurer", img: "girl2.png" },
    { name: "Warrior", img: "girl3.png" },
    { name: "Mage", img: "girl4.png" },
    { name: "Princess", img: "girl5.png" }
];

let currentIndex = 0;

// Initialize and show first character
function initializeTeam() {
    displayCurrentCharacter();
}

// Display the currently selected character
function displayCurrentCharacter() {
    const characterContainer = document.getElementById('characterDisplay');
    characterContainer.innerHTML = '';
    
    const character = characters[currentIndex];
    const characterElement = document.createElement('div');
    characterElement.className = 'character-card';
    characterElement.innerHTML = `
        <img src="gameCharacters/${character.img}" alt="${character.name}">
        <p>${character.name}</p>
    `;
    characterContainer.appendChild(characterElement);
}

// Go to previous character
function previousCharacter() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = characters.length - 1; // Loop to end
    }
    displayCurrentCharacter();
}

// Go to next character
function nextCharacter() {
    currentIndex++;
    if (currentIndex >= characters.length) {
        currentIndex = 0; // Loop to beginning
    }
    displayCurrentCharacter();
}

// Go back to intro screen
function back() {
    window.location.href = "http://localhost/valentineGame/index.html";
}

// Save selected character and continue to game
function next() {
    const selectedCharacter = characters[currentIndex];
    localStorage.setItem('userChar', JSON.stringify(selectedCharacter)); // Save single character
    window.location.href = "http://localhost/valentineGame/field.html";
}