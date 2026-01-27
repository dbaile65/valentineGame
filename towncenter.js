let isSoundPlaying = false;

const canvas = document.getElementById('image');
const ctx = canvas.getContext('2d');
const spriteSheet = new Image();
const mapImage = new Image();
mapImage.src = 'towncenter.png';
const enemyImage = new Image();
enemyImage.src = 'villagers/villager2.png';

// helper aliases used later
const pokecenterBgndIm = mapImage;
const nurseSprite = enemyImage;
const nurseScaleFactor = 1;

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
let posX = 175; 
let posY = 175; 
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


const nurseX = 180;  
const nurseY = 45;  

let showMessage = true; 
const textBoxWidth = 310;
const textBoxHeight = 45;
const textBoxX = 150;
const textBoxY = 40;

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


window.addEventListener('keyup', () => {
    isMoving = false;
});

const collisionBoxes = [
    {left: 150, top: 0, right: 275, bottom: 80},                        // desk boundary
    {left: 0, top: 0, right: 45, bottom: mapHeight},                      // left wall boundary
    {left: 400, top: 0, right: mapWidth, bottom: mapHeight},              // right wall boundary
    {left: 0, top: 0, right: mapWidth, bottom: 40},                       // top boundary
    {left: 0, top: mapHeight - 110, right: mapWidth, bottom: mapHeight},  // bottom boundary
    //add collision for table
];  

function checkCollision(newX, newY) {
    for (let box of collisionBoxes) {
        if (newX < box.right && newX + frameWidth > box.left &&
            newY < box.bottom && newY + frameHeight > box.top) {
            return true;
        }
    }
    return false;
}

// Define enter boxes for area transitions
const enterBoxes = [
    {left: 175, top: 210, right: 175, bottom: 226, redirect: 'field.html'}
];
//helpter function to check if character is in an enter box
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

function updatePosition() {
    if (isMoving) {
        if (frameCounter++ >= frameRate) {
            frameCounter = 0;
            currentFrame = (currentFrame + 1) % framesPerDirection;
        }
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

        camera.x = Math.max(0, Math.min(posX - camera.width / 2, mapWidth - camera.width));
        camera.y = Math.max(0, Math.min(posY - camera.height / 2, mapHeight - camera.height));
    } else {
        currentFrame = 0; 
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        pokecenterBgndIm,
        camera.x, camera.y, camera.width, camera.height,
        0, 0, canvas.width, canvas.height
    );
    
    // draw the nurse sprite at a fixed position
    const nurseScreenX = (nurseX - camera.x) * mapScaleFactor;
    const nurseScreenY = (nurseY - camera.y) * mapScaleFactor;
    ctx.drawImage(
        nurseSprite,
        0, 0, frameWidth, frameHeight,
        nurseScreenX,
        nurseScreenY,
        frameWidth * nurseScaleFactor,
        frameHeight * nurseScaleFactor
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

    // Draw dialog box if active
    if (isDialogActive) {
        const boxHeight = 120;
        ctx.fillStyle = 'white';
        ctx.fillRect(50, canvas.height - boxHeight - 20, canvas.width - 100, boxHeight);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeRect(50, canvas.height - boxHeight - 20, canvas.width - 100, boxHeight);
        ctx.fillStyle = 'black';
        ctx.font = '18px Arial';
        // wrap long text simply by slicing to a reasonable length per line
        const text = npcDialog[dialogIndex] || '';
        const maxLineLength = 60;
        if (text.length > maxLineLength) {
            const first = text.slice(0, maxLineLength);
            const second = text.slice(maxLineLength);
            ctx.fillText(first, 80, canvas.height - boxHeight + 30);
            ctx.fillText(second, 80, canvas.height - boxHeight + 60);
        } else {
            ctx.fillText(text, 80, canvas.height - boxHeight + 30);
        }
        ctx.font = '14px Arial';
        ctx.fillText("Press E to continue", canvas.width - 200, canvas.height - 40);
    }
}


function animateSprite() {
    updatePosition();
    draw();
    window.requestAnimationFrame(animateSprite);
}

spriteSheet.onload = function() {
    // legacy: removed single onload; use multi-image loader below
}
// Wait until all images load before starting
let imagesLoaded = 0;
const totalImages = 3;
function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        canvas.width = 800;
        canvas.height = 600;
        animateSprite();
    }
}
spriteSheet.onload = checkAllImagesLoaded;
mapImage.onload = checkAllImagesLoaded;
enemyImage.onload = checkAllImagesLoaded;
  
  //function to check if a click is within the nurse area
function isClickInNurse(x, y) {
    const nurseScreenX = (nurseX - camera.x) * mapScaleFactor;
    const nurseScreenY = (nurseY - camera.y) * mapScaleFactor;
    const nurseWidth = frameWidth * nurseScaleFactor;
    const nurseHeight = frameHeight * nurseScaleFactor;

    return x >= nurseScreenX && x <= nurseScreenX + nurseWidth &&
           y >= nurseScreenY && y <= nurseScreenY + nurseHeight;
}




function toggleSound() {
    const sound = document.getElementById('towncenter');
    if (isSoundPlaying) {
        sound.pause();
        sound.currentTime = 0;
        isSoundPlaying = false;
    } else {
        sound.play();
        isSoundPlaying = true;
    }
}

function back() {
    window.location.href = "field.html";
}

// ---------- DIALOG / NPC ----------
let isDialogActive = false;
let dialogIndex = 0;
const npcDialog = [
    "Villager- Hey there!",
    "Villager- Welcome to the Town Center.",
    "Elycia- Thank you!",
    "Elycia- I need your help.",
    "Villager- How can I help?",
    "Elycia- It's almost Valentine's Day and I can't find my     boyfriend.",
    "Elycia- I was told that he came here looking for me.",
    "Villager- Ah, I see.",
    "Villager- A man came by here earlier looking for a place to charge his phone, ",
    "Villager- but after it was fully charged he couldn't find   signal anywhere.",
    "Villager- If I remember correctly, he mentioned something   about going to the park next.",
    "Elycia- Oh no! That must be him.", 
    "Elycia- Thank you so much for your help!",
    "Villager- No problem. I hope you find him soon!"
];

// Helper function to check proximity to the NPC
function isPlayerNearNPC() {
    const dx = Math.abs(posX - nurseX);
    const dy = Math.abs(posY - nurseY);
    return dx < 75 && dy < 75;
}