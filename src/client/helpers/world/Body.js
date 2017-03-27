'use strict'

const box2D = require('box2dweb')
const b2BodyDef = box2D.Dynamics.b2BodyDef
const b2Body = box2D.Dynamics.b2Body
const b2FixtureDef = box2D.Dynamics.b2FixtureDef
const b2PolygonShape = box2D.Collision.Shapes.b2PolygonShape
const b2Vec2 = box2D.Common.Math.b2Vec2

module.exports = function(world, entityDef)
{
    let bodyDef = new b2BodyDef();

    let id = entityDef.id;

    if(entityDef.type == 'static')
        bodyDef.type = b2Body.b2_staticBody;
    else
        bodyDef.type = b2Body.b2_dynamicBody;
    
    bodyDef.position = new b2Vec2(entityDef.x, entityDef.y);

    if(entityDef.userData) 
        bodyDef.userData = entityDef.userData;

    if(world == null)
        return
    
    //register body
    let body = world.CreateBody(bodyDef);
    
    let fixtureDefinition = new b2FixtureDef();

    if(entityDef.useBouncyFixture) 
    {
        fixtureDefinition.density = 1.0;
        fixtureDefinition.friction = 0;
        fixtureDefinition.restitution = 1.0;
    }

    // Now we define the shape of this object as a box
    fixtureDefinition.shape = new b2PolygonShape();
    fixtureDefinition.shape.SetAsBox(entityDef.halfWidth, entityDef.halfHeight);
    body.CreateFixture(fixtureDefinition);

    return body;
}