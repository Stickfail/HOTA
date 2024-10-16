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
    ctx.fillStyle = "red"
    ctx.fillRect((player.p4.x * tileWidth) - player.camera.x, (player.p4.y * tileWidth) - player.camera.y, tileWidth, tileWidth)
    ctx.fillStyle = "orange"
    ctx.fillRect((player.p3.x * tileWidth) - player.camera.x, (player.p3.y * tileWidth) - player.camera.y, tileWidth, tileWidth)
    ctx.fillStyle = "purple"
    ctx.fillRect((player.p2.x * tileWidth) - player.camera.x, (player.p2.y * tileWidth) - player.camera.y, tileWidth, tileWidth)
    ctx.fillStyle = "blue"
    ctx.fillRect((player.p1.x * tileWidth) - player.camera.x, (player.p1.y * tileWidth) - player.camera.y, tileWidth, tileWidth)
    
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

    const futureX = playerObj.x + dx; // Calculate future tile position
    const futureY = playerObj.y + dy;

    const futureTileX = Math.floor(futureX); // Convert to tile coordinates
    const futureTileY = Math.floor(futureY); // Convert to tile coordinates

    // Check if the future position is inside the map and not a wall (tile === 1)
    if (
        futureTileX >= 0 &&
        futureTileY >= 0 &&
        futureTileY < map.length &&
        futureTileX < map[0].length
    ) {
        if (map[futureTileY][futureTileX] != 1 && map[futureTileY+1][futureTileX+1] != 1 ) { // Ensure it's walkable
            return true; // No collision
        }
    }
    return false; // Collision or out of bounds
}


function moveCharacter(playerObj) {
    let dx = 0;
    let dy = 0;

    // Horizontal movement
    if (keys["a"] || keys["ArrowLeft"]) dx = -playerObj.spd;
    if (keys["d"] || keys["ArrowRight"]) dx = playerObj.spd;

    // Vertical movement
    if (keys["w"] || keys["ArrowUp"]) dy = -playerObj.spd;
    if (keys["s"] || keys["ArrowDown"]) dy = playerObj.spd;

    // Check for collisions and move if valid
    if (dx !== 0 && checkCollision(playerObj, dx, 0)) {
        playerObj.x += dx;  // Move horizontally if no collision
    }

    if (dy !== 0 && checkCollision(playerObj, 0, dy)) {
        playerObj.y += dy;  // Move vertically if no collision
    }
}


function input() {
    moveCharacter(players[player.controlled - 1]);  // Get the selected player and move them
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
