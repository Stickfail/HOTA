const canv = document.getElementById("canvas")
const ctx = canv.getContext("2d")
canv.width = 1500
canv.height = 700

const keys = {}

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
        spd: 0.4,
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
        spd: 0.6,
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

const tileWidth = 32


function keyDown(e) {
    keys[e.key] == true

    if (e.key == "1") {
        player.controlled = 1
        alert("player1")
    } else if (e.key == "2") {
        player.controlled = 2
        alert("player2")
    } else if (e.key == "3") {
        player.controlled = 3
        alert("player3")
    } else if (e.key == "4") {
        player.controlled = 4
        alert("player4")
    }

    e.preventDefault()
}

function keyUp(e) {
    keys[e.key] == false
}

function drawMap(map) {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canv.width, canv.height)
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[i].length; j++) {
            let tile = map[i][j]
            if (tile == 1) {
                ctx.fillStyle = '#003333'
                ctx.fillRect(j * 32 - player.camera.x, i * 32 - player.camera.y, 32, 32)
            } else if (tile == 0) {
                ctx.fillStyle = 'green'
                ctx.fillRect(j * 32 - player.camera.x, i * 32 - player.camera.y, 32, 32)
            } else if (tile == 2) {
                ctx.fillStyle = 'darkblue'
                ctx.fillRect(j * 32 - player.camera.x, i * 32 - player.camera.y, 32, 32)
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    drawMap(debug)
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

function input() {
    switch (player.controlled) {
        case 1:
            if (keys["a"]) {
                player.p1.x -= player.p1.spd
                player.camera.x -= player.p1.spd
            } else if (keys["d"]) {
                player.p1.x += player.p1.spd
                player.camera.x += player.p1.spd
            }
            if (keys["w"]) {
                player.p1.y -= player.p1.spd
                player.camera.y -= player.p1.spd
            } else if (keys["s"]) {
                player.p1.y -= player.p1.spd
                player.camera.y -= player.p1.spd
            }
            break;
        case 2:
            if (keys["a"]) {
                player.p2.x -= player.p2.spd
                player.camera.x -= player.p2.spd
            } else if (keys["d"]) {
                player.p2.x += player.p2.spd
                player.camera.x += player.p2.spd
            }
            if (keys["w"]) {
                player.p2.y -= player.p2.spd
                player.camera.y -= player.p2.spd
            } else if (keys["s"]) {
                player.p2.y -= player.p2.spd
                player.camera.y -= player.p2.spd
            }
            break;
        case 3:
            if (keys["a"]) {
                player.p3.x -= player.p3.spd
                player.camera.x -= player.p3.spd
            } else if (keys["d"]) {
                player.p3.x += player.p3.spd
                player.camera.x += player.p3.spd
            }
            if (keys["w"]) {
                player.p3.y -= player.p3.spd
                player.camera.y -= player.p3.spd
            } else if (keys["s"]) {
                player.p3.y -= player.p3.spd
                player.camera.y -= player.p3.spd
            }
            break;
        case 4:
            if (keys["a"]) {
                player.p4.x -= player.p4.spd
                player.camera.x -= player.p4.spd
            } else if (keys["d"]) {
                player.p4.x += player.p4.spd
                player.camera.x += player.p4.spd
            }
            if (keys["w"]) {
                player.p4.y -= player.p4.spd
                player.camera.y -= player.p4.spd
            } else if (keys["s"]) {
                player.p4.y -= player.p4.spd
                player.camera.y -= player.p4.spd
            }
            break;
    }
}

function update() {
    draw()
    input()
    requestAnimationFrame(update)
}

update()