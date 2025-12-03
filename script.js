const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const TILE_SIZE = 16;
const ROWS = 31;
const COLS = 28;

const MAP = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
    [2,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,2],
    [1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const spriteSheet = new Image();
spriteSheet.src = 'assets/spritesheet.png';

class Game {
    constructor(map) {
        this.map = JSON.parse(JSON.stringify(map));
        this.pacman = new Pacman(14 * TILE_SIZE + TILE_SIZE / 2, 23 * TILE_SIZE + TILE_SIZE / 2);
        this.ghosts = [
            new Ghost(14 * TILE_SIZE + TILE_SIZE / 2, 11 * TILE_SIZE + TILE_SIZE / 2, 'blinky'),
            new Ghost(12 * TILE_SIZE + TILE_SIZE / 2, 14 * TILE_SIZE + TILE_SIZE / 2, 'pinky'),
            new Ghost(14 * TILE_SIZE + TILE_SIZE / 2, 14 * TILE_SIZE + TILE_SIZE / 2, 'inky'),
            new Ghost(16 * TILE_SIZE + TILE_SIZE / 2, 14 * TILE_SIZE + TILE_SIZE / 2, 'clyde')
        ];
        this.score = 0;
        this.lives = 3;
        this.frightenedEndTime = 0;
        this.eatenGhostScore = 200;
        this.gameOver = false;
        this.gameWon = false;
    }

    update() {
        if (this.gameOver || this.gameWon) return;
        this.pacman.update(this.map);
        this.ghosts.forEach(ghost => ghost.update(this.map, this.pacman, this.ghosts[0]));
        this.checkCollisions();
        this.checkWinCondition();
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawMap();
        this.pacman.draw();
        this.ghosts.forEach(ghost => ghost.draw());
        this.drawLives();
        this.drawUI();
    }

    drawMap() {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const tile = this.map[row][col];
                if (tile === 1) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                } else if (tile === 0 || tile === 3) {
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    const radius = tile === 0 ? 2 : 6;
                    ctx.arc(col * TILE_SIZE + TILE_SIZE / 2, row * TILE_SIZE + TILE_SIZE / 2, radius, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }
    }
    
    drawLives() {
        for (let i = 0; i < this.lives; i++) {
            ctx.drawImage(spriteSheet, 8 * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, (i * TILE_SIZE) + 10, canvas.height - TILE_SIZE - 5, TILE_SIZE, TILE_SIZE);
        }
    }

    drawUI() {
        if (this.gameOver) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '40px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        } else if (this.gameWon) {
            // ... Win message
        }
    }
    
    checkCollisions() {
        // ... Collision logic
    }
    
    checkWinCondition() {
        // ... Win condition logic
    }
}

class Pacman {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.speed = 2;
        this.radius = TILE_SIZE / 2 - 2;
        this.frame = 0;
        this.dir = 'right';
    }

    update(map) {
        // ... Pacman update logic
    }

    draw() {
        const animation = [0, 1, 2, 1];
        const frame = animation[Math.floor(this.frame / 10) % animation.length];
        let spriteX = frame * TILE_SIZE;
        let spriteY = 0;
        if (this.dir === 'left') spriteY = TILE_SIZE;
        else if (this.dir === 'up') spriteY = 2 * TILE_SIZE;
        else if (this.dir === 'down') spriteY = 3 * TILE_SIZE;

        ctx.drawImage(spriteSheet, spriteX, spriteY, TILE_SIZE, TILE_SIZE, this.x - TILE_SIZE / 2, this.y - TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
        this.frame++;
    }
}

class Ghost {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = 0;
        this.name = name;
        this.mode = 'normal';
        this.frame = 0;
    }

    update(map, pacman, blinky) {
        // ... Ghost update logic
    }

    draw() {
        let spriteY;
        switch (this.name) {
            case 'blinky': spriteY = 4 * TILE_SIZE; break;
            case 'pinky': spriteY = 6 * TILE_SIZE; break;
            case 'inky': spriteY = 8 * TILE_SIZE; break;
            case 'clyde': spriteY = 10 * TILE_SIZE; break;
        }

        let spriteX = [0, 1][Math.floor(this.frame / 20) % 2] * TILE_SIZE;
        if (this.mode === 'frightened') {
            spriteY = 5 * TILE_SIZE;
            spriteX = [8, 9][Math.floor(this.frame / 20) % 2] * TILE_SIZE;
        }
        
        ctx.drawImage(spriteSheet, spriteX, spriteY, TILE_SIZE, TILE_SIZE, this.x - TILE_SIZE / 2, this.y - TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
        this.frame++;
    }
}


const game = new Game(MAP);

function gameLoop() {
    game.update();
    game.draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
    // ... Event listener logic
});

spriteSheet.onload = gameLoop;
