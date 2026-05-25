// script.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Paddle
const paddle = {
    x: canvas.width/2 - 50,
    y: canvas.height - 40,
    width: 100,
    height: 15
};

// Ball
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 8,
    vx: 3,
    vy: 3
};

let score = 0;
let gameRunning = true;

// Keyboard controls
const keys = {};

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = false;
    }
});

// Animation 
// Move paddle
function updatePaddle() {
    const speed = 7;
    if (keys['ArrowLeft'] && paddle.x > 0) {
        paddle.x -= speed;
    }
    if (keys['ArrowRight'] && paddle.x < canvas.width - paddle.width) {
        paddle.x += speed;
    }
}

// Update ball and collisions
function updateBall() {
    if (!gameRunning) return;
    
    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    // Bounce off left/right walls
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        ball.vx *= -1;
    }
    
    // Bounce off top wall
    if (ball.y - ball.radius <= 0) {
        ball.vy *= -1;
    }
    
    // GAME OVER - ball hits bottom
    if (ball.y + ball.radius >= canvas.height) {
        gameRunning = false;
    }
    
    // Bounce off paddle
    if (ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height &&
        ball.x + ball.radius >= paddle.x &&
        ball.x - ball.radius <= paddle.x + paddle.width) {
        
        // Bounce up
        ball.vy = -Math.abs(ball.vy);
        
        // Add angle based on where ball hits paddle
        let hitPos = (ball.x - paddle.x) / paddle.width;
        let angle = (hitPos - 0.5) * 1.5;
        ball.vx = angle * 5;
        
        // Keep speed reasonable
        if (Math.abs(ball.vx) < 2) ball.vx = ball.vx > 0 ? 2 : -2;
        if (Math.abs(ball.vy) < 3) ball.vy = ball.vy > 0 ? 3 : -3;
        
        // Increase score
        score++;
        document.getElementById('score').innerText = score;
        
        // Slight speed increase every 5 hits
        if (score % 5 === 0) {
            ball.vx *= 1.1;
            ball.vy *= 1.1;
        }
    }
}

// Geometry- define shape, size and position of objects (arc, fillRect, text)
// Rasterization- convert vector shapes to pixels on the screen( fill, colors, shadows, transparency)
function draw() {
    // Clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ball with glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#00ffff';
    ctx.fill();
    
    // Draw paddle
    ctx.shadowBlur = 5;
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    // Draw paddle glow
    ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
    ctx.fillRect(paddle.x - 5, paddle.y, paddle.width + 10, paddle.height);
    
    ctx.shadowBlur = 0;
    
    // Game over screen
    if (!gameRunning) {
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = 'bold 40px monospace';
        ctx.fillStyle = '#ff00ff';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 40);
        
        ctx.font = '24px monospace';
        ctx.fillStyle = '#00ffff';
        ctx.fillText(`Final Score: ${score}`, canvas.width/2, canvas.height/2 + 20);
        
        ctx.font = '16px monospace';
        ctx.fillStyle = '#888';
        ctx.fillText('Click NEW GAME to play again', canvas.width/2, canvas.height/2 + 80);
        ctx.textAlign = 'left';
    }
}

// Reset game
function resetGame() {
    gameRunning = true;
    score = 0;
    document.getElementById('score').innerText = '0';
    
    paddle.x = canvas.width/2 - 50;
    
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.vx = 3 * (Math.random() > 0.5 ? 1 : -1);
    ball.vy = 3;
}

// Animation loop
function animate() {
    updatePaddle();
    updateBall();
    draw();
    requestAnimationFrame(animate);
}

// Event listeners
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Start game
resetGame();
animate();