'use strict'

module.exports = function(){

    let bindings = {}
    let actions = {}
    let mouse = { x: 0, y: 0 }

    function setup()
    {
        bind(87, 'move-up');
		bind(65, 'move-left');
		bind(83, 'move-down');
		bind(68, 'move-right');

		// Adding the event listeners for the appropriate DOM events.
		document.getElementById('my_canvas').addEventListener('mousemove', onMouseMove)
		document.getElementById('my_canvas').addEventListener('keydown', onKeyDown)
		document.getElementById('my_canvas').addEventListener('keyup', onKeyUp)

    }

    function bind(key, action)
    {
		bindings[key] = action
	}

    function onMouseMove(event)
    {
        mouse.x = event.clientX
		mouse.y = event.clientY
        //console.log(`mouseMoveX :: ${mouse.x}`)
        //console.log(`mouseMoveY :: ${mouse.y}`)
    }

    function onKeyDown(event)
    {
        console.log(`asdasd12312312`)
        var action = bindings[event.keyID]

		if (action)
			actions[action] = true

        console.log(`onKeyDown :: ${event.keyID}`)
    }

    function onKeyUp(event)
    {
        console.log(`asdasd2..`)
        var action = bindings[event.keyID]

		if (action)
			actions[action] = false
        
        console.log(`onKeyUp :: ${event.keyID}`)
	}

    setup()

    return mouse

}