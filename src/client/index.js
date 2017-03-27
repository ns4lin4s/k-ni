import Game from './models/Game'
import Boot from './models/Boot'

//const mappers = require('./helpers/render')

let game = new Game().get()
let boot = new Boot(game)

game.state.add('boot',boot)

game.state.start('boot')





//import Phaser from 'phaser-ce'




/*
const world = require('./helpers/world')
import Hero from './models/character/Hero'

let wd = world.createWorld()

document.getElementById('my_canvas').addEventListener('mousemove', onMouseMove)

function onMouseMove(event)
{
    let hero = new Hero(wd, event.clientX,  event.clientY)
    //console.log(`mouseMoveX :: ${mouse.x}`)
    //console.log(`mouseMoveY :: ${mouse.y}`)
} 

setInterval(function(){
    world.updateFrames(wd)
},1000/60)*/



//import Spritesheet from './models/mapper/Spritesheet'


//const mappers = require('./helpers')
//console.dir(mappers.createMap())
//mappers.listenInputs()

/*let hero = new Hero()
let wd = hero.getWorld()

setInterval(function(){
	wd.Step(1/60,10,10);
    wd.DrawDebugData();
    wd.ClearForces();
},1000/60);*/



//let spriteSheet = new Spritesheet();
//spriteSheet.parseAtlasDefinition('./assets/characters.json','./assets/character_sprites.png');


