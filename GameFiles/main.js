const canv = document.getElementById("canvas")
const ctx = canv.getContext("2d")
canv.width = 1500
canv.height = 700

const keys = {}
//alert("")
var player = {
    camera: {
        x: 2,
        y: 2,
    },
    p1: {
        x: 2,
        y: 2,
        id: 1,
        maxhp: 0,
        hp: 0,
        maxmp: 0,
        mp: 0,
        lvl: 0,
        exp: 0,
        atkpower: 0,
        def: 0,
        spd: 0.2,
        class: 0,
        skills: [],
        effects: [],
        equipped: []
    },

    p2: {
        x: 4,
        y: 2,
        id: 2,
        maxhp: 0,
        hp: 0,
        maxmp: 0,
        mp: 0,
        lvl: 0,
        exp: 0,
        atkpower: 0,
        def: 0,
        spd: 0.3,
        class: 0,
        skills: [],
        effects: [],
        equipped: []
    },

    p3: {
        x: 6,
        y: 2,
        id: 3,
        maxhp: 0,
        hp: 0,
        maxmp: 0,
        mp: 0,
        lvl: 0,
        exp: 0,
        atkpower: 0,
        def: 0,
        spd: 0.4,
        class: 0,
        skills: [],
        effects: [],
        equipped: []
    },

    p4: {
        x: 8,
        y: 2,
        id: 4,
        maxhp: 0,
        hp: 0,
        maxmp: 0,
        mp: 0,
        lvl: 0,
        exp: 0,
        atkpower: 0,
        def: 0,
        spd: 1,
        class: 0,
        skills: [],
        effects: [],
        equipped: []
    },

    controlled: 1,
}
const players = [player.p1, player.p2, player.p3, player.p4];

const tileWidth = 32

var currentMap = "map1"


function keyDown(e) {
    keys[e.key] = true

    if (e.key == 1) {
        player.controlled = 1
    } else if (e.key == 2) {
        player.controlled = 2
    } else if (e.key == 3) {
        player.controlled = 3
    } else if (e.key == 4) {
        player.controlled = 4
    }
}

function keyUp(e) {
    keys[e.key] = false
}

document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

function drawMap() {
    const map = maps[currentMap]; // Get the current active map
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let tile = map[i][j];
            let boost = 1;
            if (tile === 1) {
                ctx.fillStyle = '#003333'; // Walls
            } else if (tile === 0) {
                ctx.fillStyle = 'green'; // Walkable
            } else if (tile === 2) {
                ctx.fillStyle = 'darkblue'; // Special tiles
            }
            ctx.fillRect(j * tileWidth - player.camera.x, i * tileWidth - player.camera.y, tileWidth + boost, tileWidth + boost);
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    drawMap(currentMap)
    //players
    ctx.fillStyle = "blue"
    ctx.fillRect((player.p1.x * tileWidth) - player.camera.x, (player.p1.y * tileWidth) - player.camera.y, tileWidth, tileWidth)
    ctx.fillStyle = "purple"
    ctx.fillRect((player.p2.x * tileWidth) - player.camera.x, (player.p2.y * tileWidth) - player.camera.y, tileWidth, tileWidth)
    ctx.fillStyle = "orange"
    ctx.fillRect((player.p3.x * tileWidth) - player.camera.x, (player.p3.y * tileWidth) - player.camera.y, tileWidth, tileWidth)
    ctx.fillStyle = "red"
    ctx.fillRect((player.p4.x * tileWidth) - player.camera.x, (player.p4.y * tileWidth) - player.camera.y, tileWidth, tileWidth)
}

function checkMapTransition() {
    // Example condition: if player reaches the right edge of the current map
    if (player.p1.x >= maps[currentMap][0].length) {
        currentMap = 'map2';  // Switch to the next map
        player.p1.x = 0;       // Reset player position to the start of the new map
    }
}

function checkCollision(playerObj, dx, dy) {
    const map = maps[currentMap]; // Get the current active map
    const futureX = playerObj.x + dx;
    const futureY = playerObj.y + dy;

    // Convert future position to tile coordinates (using a small buffer for accuracy)
    const buffer = 0.05; // Buffer to prevent slipping through small gaps
    const tileX = Math.floor(futureX + (dx > 0 ? buffer : -buffer)); 
    const tileY = Math.floor(futureY + (dy > 0 ? buffer : -buffer));

    // Make sure we're within the bounds of the map
    if (tileX >= 0 && tileY >= 0 && tileY < map.length && tileX < map[0].length) {
        if (map[tileY][tileX] !== 1) {
            return true; // No collision, it's walkable
        }
    }
    
    return false; // Collision or out of bounds
}

function moveCharacter(playerObj) {
    const speed = playerObj.spd;
    let dx = keys["a"] ? -speed : keys["d"] ? speed : 0;
    let dy = keys["w"] ? -speed : keys["s"] ? speed : 0;

    // We will now loop over smaller increments of the movement until reaching the full desired distance
    const stepSize = 0.05;  // The smaller the step, the more precise but also more expensive (computationally)
    
    // Move in x-direction
    while (Math.abs(dx) > stepSize) {
        let step = Math.sign(dx) * stepSize;  // Get the direction (positive or negative) of movement
        if (checkCollision(playerObj, step, 0)) {
            playerObj.x += step;  // Move in increments of stepSize
        } else {
            break;  // Stop moving in x if collision is detected
        }
        dx -= step;  // Reduce the remaining movement by the step size
    }

    // Move in y-direction
    while (Math.abs(dy) > stepSize) {
        let step = Math.sign(dy) * stepSize;
        if (checkCollision(playerObj, 0, step)) {
            playerObj.y += step;
        } else {
            break;  // Stop moving in y if collision is detected
        }
        dy -= step;
    }
}


function input() {
    moveCharacter(players[player.controlled - 1]);
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function updateCamera() {
    let controlledPlayer;

    switch (player.controlled) {
        case 1:
            controlledPlayer = player.p1;
            break;
        case 2:
            controlledPlayer = player.p2;
            break;
        case 3:
            controlledPlayer = player.p3;
            break;
        case 4:
            controlledPlayer = player.p4;
            break;
    }

    // Target camera position to center on the controlled player
    const targetX = controlledPlayer.x * tileWidth - canv.width / 2 + tileWidth / 2;
    const targetY = controlledPlayer.y * tileWidth - canv.height / 2 + tileWidth / 2;

    // Smoothly interpolate the camera's position towards the target position
    const lerpSpeed = 0.1; // Adjust this value to control the speed (0 < lerpSpeed <= 1)
    player.camera.x = lerp(player.camera.x, targetX, lerpSpeed);
    player.camera.y = lerp(player.camera.y, targetY, lerpSpeed);
}


function update() {
    updateCamera();  // Center the camera before drawing
    draw();
    input();
    requestAnimationFrame(update);
}

update();
