'use strict'

module.exports = function(world)
{
    if(world == null)
        return

    let start = Date.now();

    world.Step
    (
        1 / 60,   //frame-rate
        10,       //velocity iterations
        10        //position iterations
    )

    world.ClearForces();

    return(Date.now() - start);
}