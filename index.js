let isSoundPlaying = false;
let selectedCharacter; // Just one character, not a team

// Navigate to character selection screen
function generateCharc() {
    window.location.href = "http://localhost/valentineGame/character.html";
}

// Displays the instructions page
function instructions() {
    window.location.href = "http://localhost/valentineGame/instructions.html";
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

function resetGameData(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "resetGameData.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    console.log(response.message);
                    if (callback) callback();
                } else {
                    console.error(response.message);
                }
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };
    xhr.send();
}


// Only add event listener if the button exists on this page
if (document.getElementById('terminateGameButton')) {
    document.getElementById('terminateGameButton').addEventListener('click', terminateGameButton);
}
function terminateGameButton() {
    resetGameData(function() {
        window.location.href = "http://localhost/valentineGame/index.html";
    });
}