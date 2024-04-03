const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Socket.io setup
const socket = io();

// Player object
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
    username: prompt("Enter your username"),
};

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

    // Emit updated player position to the server
    socket.emit('playerMoved', player);
});

// Draw player on canvas
function drawPlayer(player) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);
    ctx.fillStyle = 'black';
    ctx.fillText(player.username, player.x, player.y + player.size + 10);
}

// Listen for updated player positions from the server
socket.on('playerMoved', (updatedPlayer) => {
    drawPlayer(updatedPlayer);
});

// Initial draw
drawPlayer(player);
