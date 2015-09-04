// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //x should be from 0 to 4, y should be 2 to 4
    this.x = randomLen(5, 0, XSTEP);
    this.y = randomLen(3, 1, YSTEP) - 35;
    this.speed = Math.floor((Math.random() * 3 + 2) * 110);
    this.sprite = 'images/enemy-bug.png';
};
var WIDTH = 505;
var XSTEP = 101;
var YSTEP = 83;
var randomLen = function(num, bias, length) {
    return (Math.floor(Math.random() * num) + bias)* length;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > WIDTH) {
        this.x = -randomLen(3, 1, XSTEP);
        this.y = randomLen(3, 1, YSTEP) - 35;
        this.speed = Math.floor((Math.random() * 3 + 2) * 110);
    }
    this.check();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = XSTEP * 2;
    this.y = YSTEP * 4 + 40;
    this.speedx = XSTEP;
    this.speedy = YSTEP;
    this.sprite = 'images/char-boy.png';
};

Enemy.prototype.check = function() {
    checkCollision(this, player, 20, 20);
};

Player.prototype.update = function(code) {
    switch(code) {
        case 'left': {
            this.x -= this.x > 0 ? this.speedx : 0;
            break;
        }
        case 'up': {
            this.y -= this.speedy;
            this.y = this.y < 0 ? this.speedy * 4 + 40 : this.y;
            break;
        }
        case 'right': {
            this.x += this.x < 404 ? this.speedx : 0;
            break;
        }
        case 'down': {
            this.y += this.speedy;
            this.y -= this.y > 430 ? this.speedy : 0;
            break;
        }
        default: break;
    }
};

var reset = function() {
    player.x = XSTEP * 2;
    player.y = YSTEP * 4 + 40;
};

var checkCollision = function(e, p, xlen, ylen) {
    if(Math.abs(p.x - e.x) < xlen && Math.abs(p.y - e.y) < ylen) {
        reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.update(key);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
