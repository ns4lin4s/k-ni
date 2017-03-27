'use strict'

const xhr = require('xhr')
/*const box2D = require('box2dweb')
const b2Vec2 = box2D.Common.Math.b2Vec2
const b2BodyDef = box2D.Dynamics.b2BodyDef
const b2Body = box2D.Dynamics.b2Body
const b2World = box2D.Dynamics.b2World
const b2FixtureDef = box2D.Dynamics.b2FixtureDef
const b2PolygonShape = box2D.Collision.Shapes.b2PolygonShape
const b2DebugDraw = box2D.Dynamics.b2DebugDraw
const worldHelper = require('../../helpers/world')
const joystick = require('../../helpers/world/InputEngine')*/

export default class Hero
{
    constructor(world, positionX, positionY)
    {
        const charactersJson = './assets/characters.json'
        //this.ctxCharacter = document.getElementById('my_canvas').getContext('2d')
        //const ctx = document.getElementById('my_canvas').getContext('2d')
        //this.world = new b2World(new b2Vec2(0,0), false)

        //let canvasDebug = document.getElementById('my_canvas_debug')

        //create ground
        //let SCALE = 30
            
        //obtiene los personajes con sus atributos (ancho, alto, coordenadas..) en formato json
        let resultJson = new Promise((resolve, reject) => {
            xhr({ uri: charactersJson, headers:{ "Content-Type": "application/json" } },
            function (err, resp, body) {
                if(resp.statusCode == 200)
                {
                    let parse = JSON.parse(body)
                    
                    resolve({ msg : 'success', data: parse.frames })
                }
                else
                    reject({ msg: `Error: ${err.message}`, data: '' })
            })
        })

        resultJson.then((characters) => {
            characters.data.forEach(character => 
            {
                if(character.filename === "Knight1/Axe/Attack/1.png")
                {
                    //let mouse = joystick()

                    /*worldHelper.addBody(world,{
                        id: character.filename,
                        type : 'dynamic',
                        x: positionX / SCALE,
                        y: positionY / SCALE,
                        halfWidth: (character.frame.w / 30.0) / 4,
                        halfHeight: (character.frame.h / 30.0) / 4,
                        userData: false,
                        useBouncyFixture: false
                    })*/
                    /*
                    //ground
                    let fixDef = new b2FixtureDef()
                    fixDef.density = 1
                    fixDef.friction = 0.5
                    
                    let bodyDef = new b2BodyDef()
                    bodyDef.type = b2Body.b2_staticBody //b2_dynamicBody
                    bodyDef.position = new b2Vec2(400 / SCALE, 600 / SCALE)
                    fixDef.shape = new b2PolygonShape()
                    fixDef.shape.SetAsBox(400 / SCALE, 10 / SCALE)
                    this.world.CreateBody(bodyDef).CreateFixture(fixDef)
                    
                    //knight
                    let fixDef2 = new b2FixtureDef()
                    fixDef2.density = 1
                    fixDef2.friction = 0.5
                  
                    let bodyDef2 = new b2BodyDef()
                    bodyDef2.type = b2Body.b2_dynamicBody
                    bodyDef2.position = new b2Vec2(80 / SCALE, 55 / SCALE)
                    fixDef2.shape = new b2PolygonShape()
                    fixDef2.shape.SetAsBox((character.frame.w / 30.0) / 4 , (character.frame.h / 30.0) / 4 )
                    this.world.CreateBody(bodyDef2).CreateFixture(fixDef2)*/

                    /*let debugDraw = new b2DebugDraw()
                    debugDraw.SetSprite(canvasDebug.getContext("2d"))
                    debugDraw.SetDrawScale(30)
                    debugDraw.SetFillAlpha(0.3)
                    debugDraw.SetLineThickness(1.0)
                    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit)

                    this.world.SetDebugDraw(debugDraw)*/
                    console.log("=======BLABLABLA=============")
                    

                    //worldHelper.updateFrames(world)
                }
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    //TODO
    jump(){

    }

    //TODO
    run()
    {
        /*let img = new Image();
        img.src = "./assets/character_sprites.png";
        img.onload = function()
        {
            ctx.drawImage(img, character.frame.x, character.frame.y, character.frame.w,character.frame.h,positionX, positionY, character.frame.w / 2, character.frame.h / 2);
        }*/
    }

    //TODO
    hit(){

    }

    getWorld(){
        return this.world
    }
}