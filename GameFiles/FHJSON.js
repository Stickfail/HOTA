//images

const imgs = {
    "Atreus1" : document.createElement("img"),
    "Atreus2" : document.createElement("img")
}
imgs.Atreus1.src = "assets/AtreusIdle.png"
imgs.Atreus2.src = "assets/AtreusSheet (1).png"


const startingCharacters = {
    1:{
        name:"Player"
    },
    2:{
        name:"Atreus",
        class:"Mage",
        lvl:1,
        maxhp:0,
        maxmp:0,
        exp:0,
        spd:0.2,
        atk:0,
        def:0,
        skills:[],
        effects:[],
        equipped:[]
    }
}
const currentCharacters = {

}

const enemies = {

}

const items = {
    1:{
        name:"Lesser Healing Potion"
    },
    2:{
        name:"Healing Potion"
    },
    3:{
        name:"Greater Healing Potion"
    },
    4:{
        name:"Lesser Mana Potion"
    },
    5:{
        name:"Mana Potion"
    },
    6:{
        name:"Greater Mana Potion"
    }
}