'use strict'

const box2D = require('box2dweb')
const b2World = box2D.Dynamics.b2World
const b2Vec2 = box2D.Common.Math.b2Vec2

module.exports = function()
{
    let world = new b2World()
    {
        new b2Vec2(0, 0), // Gravity vector
        false           // Don't allow sleep
    }

    //it will define the keyboard and mouse as input
    //joystick()

    return world
}