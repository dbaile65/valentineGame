// Intro.js - this file contains the JavaScript code for valentine game field
let isSoundPlaying = false;
const canvas = document.getElementById('image');
const ctx = canvas.getContext('2d');
const spriteSheet = new Image();
const mapImage = new Image();
mapImage.src = 'field.png';
const enemyImage = new Image();
enemyImage.src = 'villagers/villager1.png';

// Load the selected character from localStorage
let selectedCharacter = null;
try {
    const storedChar = localStorage.getItem('userChar');
    if (storedChar) {
        selectedCharacter = JSON.parse(storedChar);
        spriteSheet.src = `gameCharacters/${selectedCharacter.img}`;
        console.log("Loaded character:", selectedCharacter.name, selectedCharacter.img);
    } else {
        console.error("No character found in localStorage - using default sprite");
        spriteSheet.src = 'sprite.png';
    }
} catch (error) {
    console.error("Error loading character:", error);
    spriteSheet.src = 'gameCharacters/girl2.png';
}

let SPRITE_PADDING = 0;
let SPRITE_OFFSET = 0;

// Function to update padding based on the sprite sheet
function updateSpritePadding() {
    if (spriteSheet.src.includes('girl1.png')){
        SPRITE_PADDING = 9;
        SPRITE_OFFSET = 0;
    } else{
        SPRITE_PADDING = 4;
        SPRITE_OFFSET = 0;
    }
}

// Update padding when sprite loads
spriteSheet.onload = updateSpritePadding;
// Also update immediately in case it's cached
updateSpritePadding();

const frameHeight = 64; 
const frameWidth = 64;
const framesPerDirection = 4;
// scale factors for map and character
const mapScaleFactor = 2.5;    
const characterScaleFactor = 1; 
const enemyScaleFactor = 1; 

// directions to desired row in the sprite sheet
const directions = {
    DOWN: 0,//row 0 in the sprite sheet
    UP: 3, //row 3 in the sprite sheet
	LEFT: 1, //row 1 in the sprite sheet
    RIGHT: 2 //row 2 in the sprite sheet
};

// initial direction and frame  
let currentDirection = directions.DOWN;
let currentFrame = 0; 
let posX = 93; 
let posY = 112; 
let isMoving = false; 
const frameRate = 5; 
let frameCounter = 0;
// map dimensions
const mapWidth = 512;
const mapHeight = 384;
// camera view dimensions 
const cameraWidth = 800 / mapScaleFactor;
const cameraHeight = 600 / mapScaleFactor;

const camera = {
    x: 0,
    y: 0,
    width: cameraWidth,
    height: cameraHeight
};

// step size for character movement
const stepSize = 1;

// collision boundaries (left, top, right, bottom) for each boundary
const collisionBoxes = [
    {left: 130, top: 100, right: 150, bottom: 110},                     // House 1
    {left: 250, top: 100, right: 300, bottom: 110},                     // House 2
    {left: 250, top: 190, right: 320, bottom: 210},                     // building
    {left: 130, top: 220, right: 150, bottom: 240},                     // flower bed
    {left: 0, top: 0, right: 25, bottom: mapHeight},                    // left hedge
    {left: mapWidth-110, top: 0, right: mapWidth, bottom: mapHeight},   // right hedge
    {left: 0, top: 0, right: mapWidth, bottom: 25},                     // top hedge
    {left: 0, top: mapHeight-25, right: mapWidth, bottom: mapHeight},   // bottom hedge
];

// check if the next position collides with any of the defined boundaries
function checkCollision(newX, newY) {
    for (let box of collisionBoxes) {
        if (newX < box.right && newX + frameWidth > box.left &&
            newY < box.bottom && newY + frameHeight > box.top) {
            return true;
        }
    }
    return false;
}

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();

    const mouseX = (e.clientX - rect.left) / mapScaleFactor + camera.x;
    const mouseY = (e.clientY - rect.top) / mapScaleFactor + camera.y;

    console.log(`X: ${Math.floor(mouseX)}, Y: ${Math.floor(mouseY)}`);
});

// Define enter boxes for area transitions
// corrected coordinates: ensure top < bottom and expand width for easier entry
const enterBoxes = [
    {left: 285, top: 210, right: 295, bottom: 215, redirect: 'towncenter.html'},                     // enter pokecenter
    {left: 197, top: 30, right: 207, bottom: 35, redirect: 'park.html'}                              // enter park
];

function checkEnter(newX, newY) {
    for (let box of enterBoxes) {
        if (newX < box.right && newX + frameWidth > box.left &&
            newY < box.bottom && newY + frameHeight > box.top) {
            window.location.replace(box.redirect)
            return true;
        }
    }
    return false;
}

// keydown events to update direction and movement
window.addEventListener('keydown', (event) => {

    // Handle dialog first (E to start/advance dialog when near NPC)
    if (event.key === 'e' || event.key === 'E') {
        if (isPlayerNearNPC()) {
            if (!isDialogActive) {
                isDialogActive = true;
                dialogIndex = 0;
            } else {
                // Advance dialog or close only when user presses E on last message
                if (dialogIndex < npcDialog.length - 1) {
                    dialogIndex = dialogIndex + 1;
                } else {
                    // user pressed E while on last dialog line -> close
                    isDialogActive = false;
                    dialogIndex = 0;
                }
            }
        }
        return;
    }

    // Disable movement while dialog is open
    if (isDialogActive) return;

    isMoving = true;

    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            currentDirection = directions.UP;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            currentDirection = directions.DOWN;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            currentDirection = directions.LEFT;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            currentDirection = directions.RIGHT;
            break;
        default:
            isMoving = false;
    }
});


// keyup events to stop movement
window.addEventListener('keyup', () => {
    isMoving = false;
});

// Name: updatePosition
// Description: This function updates the sprite's position and frame based on the direction and movement 
function updatePosition() {
    if (isMoving) {
        // update frame if the frame counter exceeds frame rate
        if (frameCounter++ >= frameRate) {
            frameCounter = 0;
            currentFrame = (currentFrame + 1) % framesPerDirection;
        }
        // calculate the new position based on the current direction
        let newX = posX;
        let newY = posY;
        switch (currentDirection) {
            case directions.UP:
                newY = Math.max(0, posY - stepSize);
                break;
            case directions.DOWN:
                newY = Math.min(mapHeight - frameHeight, posY + stepSize);
                break;
            case directions.LEFT:
                newX = Math.max(0, posX - stepSize);
                break;
            case directions.RIGHT:
                newX = Math.min(mapWidth - frameWidth, posX + stepSize);
                break;
        }
        // check for collisions and update position if no collision is detected
        if (!checkCollision(newX, newY)) {
            posX = newX;
            posY = newY;
            if (!checkEnter(newX, newY)) {
                posX = newX;
                posY = newY;
            }
        }

        // update camera position to follow the character
        camera.x = Math.max(0, Math.min(posX - camera.width / 2, mapWidth - camera.width));
        camera.y = Math.max(0, Math.min(posY - camera.height / 2, mapHeight - camera.height));
    } else {
        currentFrame = 0; 
    }
}

// enemy position 
const enemyX = 100; 
const enemyY = 220; 
// building position 
const buildingBox = {left: 250, top: 190, right: 320, bottom: 210}; 

// ---------- DIALOG SYSTEM (top-level) ----------
// Move dialog state and helper out of draw() so input handlers can access them
let isDialogActive = false;
let dialogIndex = 0;

const npcDialog = [
    "Villager- Hey there!",
    "Villager- Nice day, huh?",
    "Elycia- Its really lovely out today.",
    "Elycia- I really need your help.",
    "Villager- How can I help?",
    "Elycia- I was supposed to meet my boyfriend here, but I can't", 
    "get in contact with him nor find him anywhere.", "I think he forgot to charge his phone again!",
    "Villager- huh... that's funny because I handsome man was just asking me about you.", "I think I saw him heading towards the Town center.",
    "Villager- Check it out! They might have some info for you.",
    "Elycia- Thank you so much for your help!",
    "Villager- Good luck on your journey!"
];

// Helper function to check proximity to the NPC
function isPlayerNearNPC() {
    const dx = Math.abs(posX - enemyX);
    const dy = Math.abs(posY - enemyY);
    return dx < 50 && dy < 50;
}

// check if the click is within the enemy area
function isClickInEnemy(x, y) {
    const enemyScreenX = (enemyX - camera.x) * mapScaleFactor;
    const enemyScreenY = (enemyY - camera.y) * mapScaleFactor;
    const enemyWidth = frameWidth * enemyScaleFactor;
    const enemyHeight = frameHeight * enemyScaleFactor;

    return x >= enemyScreenX && x <= enemyScreenX + enemyWidth &&
           y >= enemyScreenY && y <= enemyScreenY + enemyHeight;
        };

// Name: draw
// Description: This function clears the canvas and draws the sprite on the canvas based on the current direction and frame.
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the visible part of the map
    ctx.drawImage(
        mapImage,
        camera.x,
		camera.y,
		camera.width,
		camera.height,
        0, 0, canvas.width, canvas.height
    );
    // draw the character sprite
   const sourceX =
    SPRITE_OFFSET +
    currentFrame * (frameWidth + SPRITE_PADDING);

	const sourceY =
    SPRITE_OFFSET +
    currentDirection * (frameHeight + SPRITE_PADDING);

	ctx.drawImage(
    spriteSheet,
    sourceX,
    sourceY,
    frameWidth,
    frameHeight,
    (posX - camera.x) * mapScaleFactor,
    (posY - camera.y) * mapScaleFactor,
    frameWidth * characterScaleFactor,
    frameHeight * characterScaleFactor
);

    // draw the enemy image at a fixed position 
    const enemyScreenX = (enemyX - camera.x) * mapScaleFactor;
    const enemyScreenY = (enemyY - camera.y) * mapScaleFactor;
    ctx.drawImage(
        enemyImage,
        0, 0, frameWidth, frameHeight,
        enemyScreenX,
        enemyScreenY,
        frameWidth * enemyScaleFactor,
        frameHeight * enemyScaleFactor
    );

    // ---------- DRAW DIALOG ----------
if (isDialogActive) {
    const boxHeight = 120;

    ctx.fillStyle = 'white';
    ctx.fillRect(50, canvas.height - boxHeight - 20, canvas.width - 100, boxHeight);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, canvas.height - boxHeight - 20, canvas.width - 100, boxHeight);

    ctx.fillStyle = 'black';
    ctx.font = '18px Arial';

    ctx.fillText(
        npcDialog[dialogIndex],
        80,
        canvas.height - boxHeight + 30
    );

    ctx.font = '14px Arial';
    ctx.fillText(
        "Press E to continue",
        canvas.width - 200,
        canvas.height - 40
    );
}

}

// Name: animateSprite
// Description: This function updates the sprite's position and then draws it on the canvas
function animateSprite() {
    updatePosition();
    draw();
    window.requestAnimationFrame(animateSprite);
}

// Track which images have loaded
let imagesLoaded = 0;
const totalImages = 3;

function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        canvas.width = 800;
        canvas.height = 600;
        animateSprite();
        console.log("All images loaded, game started!");
    }
}

// Wait for all images to load before starting
spriteSheet.onload = checkAllImagesLoaded;
mapImage.onload = checkAllImagesLoaded;
enemyImage.onload = checkAllImagesLoaded;

// Handle image load errors
spriteSheet.onerror = () => console.error("Failed to load character sprite");
mapImage.onerror = () => console.error("Failed to load map image");
enemyImage.onerror = () => console.error("Failed to load enemy image");

function exitPage() {
    window.location.href = "http://localhost/valentineGame/exit.html";
}

// Plays the sound when the button is pressed (Sound ON/OFF Button)
function playSound(soundId) {
    var sound = document.getElementById(soundId);

    if (!isSoundPlaying) {
        sound.play();
        isSoundPlaying = true;
    } else {
        sound.pause();
        sound.currentTime = 0;
        isSoundPlaying = false;
    }
}

// If the button is pressed again when it's playing, it will stop the sound
function stopSound(soundId) {
    var sound = document.getElementById(soundId);
    sound.pause();
    sound.currentTime = 0;
    isSoundPlaying = false;
}

function back() {
    window.location.href = "http://localhost/valentineGame/character.html";
}