const canv = document.getElementById("canvas")
const ctx = canv.getContext("2d")
canv.width = 1500
canv.height = 700

const keys = {}

var player = {
    camera: {
        x:0,
        y:0,
    },
    p1: {
        x: 0,
        y: 0,
        id: 1,
        maxhp: 0,
        hp: 0,
        maxmp: 0,
        mp: 0,
        lvl: 0,
        exp: 0,
        atkpower: 0,
        def: 0,
        spd: 0,
        class: 0,
        skills: [],
        effects: [],
        equipped: []
    },

    p2: {
        x: 0,
        y: 0,
        id: 2,
        maxhp: 0,
        hp: 0,
        maxmp: 0,
        mp: 0,
        lvl: 0,
        exp: 0,
        atkpower: 0,
        def: 0,
        spd: 0,
        class: 0,
        skills: [],
        effects: [],
        equipped: []
    },

    p3: {
        x: 0,
        y: 0,
        id: 3,
        maxhp: 0,
        hp: 0,
        maxmp: 0,
        mp: 0,
        lvl: 0,
        exp: 0,
        atkpower: 0,
        def: 0,
        spd: 0,
        class: 0,
        skills: [],
        effects: [],
        equipped: []
    },

    p4: {
        x: 0,
        y: 0,
        id: 4,
        maxhp: 0,
        hp: 0,
        maxmp: 0,
        mp: 0,
        lvl: 0,
        exp: 0,
        atkpower: 0,
        def: 0,
        spd: 0,
        class: 0,
        skills: [],
        effects: [],
        equipped: []
    },

    controlled: 1,
}

const tileWidth = 32

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
    drawMap(debug)
    //players
    ctx.fillStyle = "blue"
    ctx.fillRect(player.p1.x,player.p1.y,tileWidth,tileWidth)
    ctx.fillStyle = "orange"
    ctx.fillRect(player.p2.x,player.p2.y,tileWidth,tileWidth)
    ctx.fillStyle = "red"
    ctx.fillRect(player.p3.x,player.p3.y,tileWidth,tileWidth)
    ctx.fillStyle = "purple"
    ctx.fillRect(player.p4.x,player.p4.y,tileWidth,tileWidth)
}

function input() {

}

function update() {
    draw()
    input()
    requestAnimationFrame(update)
}

update()