'use strict'

import HeroWidgetFactory from './factory/HeroWidgetFactory'
import EnemyWidgetFactory from './factory/EnemyWidgetFactory'

export default class Boot
{
    contructor(game)
    { 
        this.game = game
    }

    preload()
    {
        this.hero = HeroWidgetFactory.CreateCharacter(this.game)

        this.enemy = EnemyWidgetFactory.CreateCharacter(this.game)

        this.game.load.tilemap('dungeon', '../../design/map.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.game.load.image('tiles', '../../design/map.png');
    }

    create()
    {
        this.attackTime = 0
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        this.game.world.setBounds(0, 0, 3000, 3000)
 
        this.cursors = this.game.input.keyboard.createCursorKeys()       

        this.keyboard = this.game.input.keyboard

        this.map = this.game.add.tilemap('dungeon')

        this.map.addTilesetImage('base', 'tiles')

        this.layerFloor = this.map.createLayer('floor')

        this.layerWallCollision = this.map.createLayer('wall')

        this.layerStoneCollision = this.map.createLayer('stone_down')

        this.layerStone = this.map.createLayer('stone_up')

        this.layerFire = this.map.createLayer('fire')

        this.map.setCollisionBetween(1, 100, true, 'wall')

        this.map.setCollisionBetween(1, 100, true, 'stone_down')

        this.layerFloor.resizeWorld()

        this.layerWallCollision.resizeWorld()

        this.layerStoneCollision.resizeWorld()

        this.layerStone.resizeWorld()

        this.layerFire.resizeWorld()
        
        this.game.physics.arcade.enable([this.hero.getSprite(),this.layerStoneCollision, this.layerWallCollision], Phaser.Physics.ARCADE)

        this.hero.addAnimation()

        this.hero.getSprite().body.collideWorldBounds = true

        this.timeKeyDown = null

        let attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A)

        attackKey.onDown.add(function(){ 
            this.timeKeyDown = this.game.time.now
        }, this)

        attackKey.onUp.add(function(){
            
        }, this)

        this.game.camera.follow(this.hero.getSprite(), Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
        
    }

    update()
    {
        this.game.physics.arcade.collide(this.hero.getSprite(), this.layerStoneCollision)
        this.game.physics.arcade.collide(this.hero.getSprite(), this.layerWallCollision)

        this.hero.setVelocityZero()

        this.hero.setOnKeyPress(false)

        if (this.cursors.left.isDown)
            this.hero.moveLeft()
        
        if (this.cursors.right.isDown)
            this.hero.moveRight()
        
        if (this.cursors.up.isDown)
            this.hero.moveUp()
        
        if (this.cursors.down.isDown)
            this.hero.moveDown()
        
        if (this.keyboard.isDown(Phaser.Keyboard.A) && this.cursors.left.isDown && (this.game.time.now - this.timeKeyDown) < 150)
        {
            this.hero.attack(true)
        }

        else if (this.keyboard.isDown(Phaser.Keyboard.A) && this.cursors.right.isDown && (this.game.time.now - this.timeKeyDown) < 150)
        {
            this.hero.attack(true)
        }
            
        else if (this.keyboard.isDown(Phaser.Keyboard.A) && (this.game.time.now - this.timeKeyDown) < 150)
        {
            this.hero.attack(false)
        }
        
        if(this.hero.getOnKeyPress() == false)
            this.hero.stop()

        
    }
}