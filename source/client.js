const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const groundImage = new Image();
groundImage.src = 'grass.png'; // Replace 'ground.png' with the path to your ground image

// Player object
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
};

// Draw the ground with a slight color variation
function drawGround() {
    const variation = 10; // Adjust the variation as needed
    const randomR = 100 + Math.floor(Math.random() * variation);
    const randomG = 150 + Math.floor(Math.random() * variation);
    const randomB = 100 + Math.floor(Math.random() * variation);
    ctx.fillStyle = `rgb(${randomR}, ${randomG}, ${randomB})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the ground image
    ctx.drawImage(groundImage, 0, 0, canvas.width, canvas.height);
}

// Draw player on canvas
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Update the game state and redraw
function update() {
    drawGround();
    drawPlayer();
}

// Listen for arrow key events
window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'w') {
        player.y -= 10;
    } else if (key === 's') {
        player.y += 10;
    } else if (key === 'a') {
        player.x -= 10;
    } else if (key === 'd') {
        player.x += 10;
    }
    update();
});

// Initial draw
update();
