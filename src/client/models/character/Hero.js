'use strict'

const VELOCITY_X = 200
const VELOCITY_Y = 200

export default class Hero
{
    constructor(game)
    {
        this.game = game

        this.game.load.spritesheet('knight-walk', './assets/axe_animation.png',100,100)

        this.faceLeft = false  

        this.sprite = null 

        this.onKeyPress = false
    }

    getSprite()
    {
        if(this.sprite == null)
            this.sprite = this.game.add.sprite(50, 150, 'knight-walk')

        return this.sprite
    }

    addAnimation()
    {
        this.sprite.scale.setTo(1 / 1.8, 1 / 1.8)

        this.sprite.animations.add('walk-right', [3, 4, 3 ,5 ], 9, true)

        this.sprite.animations.add('walk-left', [7, 6, 7, 8], 9, true)

        this.sprite.animations.add('attack-right', [0, 1, 2], 10, true)

        this.sprite.animations.add('attack-left', [9, 10, 11], 10, true)

        this.sprite.animations.add('attack-right-walk', [1, 2], 10, true)

        this.sprite.animations.add('attack-left-walk', [10, 11], 10, true)
    }

    //TODO
    jump()
    {

    }

    //TODO
    run()
    {

    }

    moveLeft()
    {
        this.onKeyPress = true
        this.faceLeft = true
        this.sprite.body.moveLeft(VELOCITY_X)
        this.sprite.animations.play('walk-left')
    }

    moveRight()
    {
        this.onKeyPress = true
        this.faceLeft = false
        this.sprite.body.moveRight(VELOCITY_X)
        this.sprite.animations.play('walk-right')
    }

    moveUp()
    {
        this.onKeyPress = true
        this.sprite.body.moveUp(VELOCITY_Y)

        if(this.faceLeft)
            this.sprite.animations.play('walk-left')
        else
            this.sprite.animations.play('walk-right')
    }

    moveDown()
    {
        this.onKeyPress = true
        this.sprite.body.moveDown(VELOCITY_Y)

        if(this.faceLeft)
            this.sprite.animations.play('walk-left')
        else
            this.sprite.animations.play('walk-right')
    }

    getOnKeyPress()
    {
        return this.onKeyPress
    }

    setOnKeyPress(value)
    {
        this.onKeyPress = value 
    }

    attack(isWalking)
    {
        this.onKeyPress = true
        console.log(`iswalking..${isWalking}`)
        if(isWalking && this.faceLeft)
            this.sprite.animations.play('attack-left-walk')
        else if(isWalking && (!this.faceLeft))
            this.sprite.animations.play('attack-right-walk')
        else if(this.faceLeft)
        {
            this.sprite.animations.play('attack-left')
            this.sprite.animations.currentAnim.onComplete.add(function () { this.sprite.frame = 7;console.log('attack-left!') })
        }
            
            //this.sprite.animations.play('attack-left')
        else
        {
            this.sprite.animations.play('attack-right')
            this.sprite.animations.currentAnim.onComplete.add(function () { this.sprite.frame = 3;console.log('attack-right!') })

        }
            
            //this.sprite.animations.play('attack-right')

        
    }

    stop()
    {
        this.sprite.animations.stop()
    }

}