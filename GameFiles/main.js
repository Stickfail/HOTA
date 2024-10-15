const canv = document.getElementById("canvas")
const ctx = canv.getContext("2d")
canv.width=1500
canv.height=700

const keys = {}

var player = {
    p1: {
        x:0,
        y:0,
        id:1,

    },

    controlled:1,
}

function draw(){

}

function input(){

}

function update(){
    draw()
    input()
    requestAnimationFrame(update)
}

update()