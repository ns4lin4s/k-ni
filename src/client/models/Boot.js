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
        
        this.game.physics.startSystem(Phaser.Physics.P2JS)

        this.game.world.setBounds(0, 0, 3000, 3000)
 
        this.cursors = this.game.input.keyboard.createCursorKeys()       

        this.keyboard = this.game.input.keyboard

        this.map = this.game.add.tilemap('dungeon')

        this.map.addTilesetImage('base', 'tiles')

        this.layerFloor = this.map.createLayer('floor')

        this.layerWallCollision = this.map.createLayer('wall')

        this.layerCofreCollision = this.map.createLayer('cofre')

        this.layerStoneCollision = this.map.createLayer('stone_down')

        this.layerStone = this.map.createLayer('stone_up')

        this.layerFire = this.map.createLayer('fire')

        this.layerWallCollision.resizeWorld()

        this.layerStoneCollision.resizeWorld()

        this.layerCofreCollision.resizeWorld()

        this.layerStone.resizeWorld()

        this.layerFire.resizeWorld()

        this.layerFloor.resizeWorld()

        this.map.setCollision('stone_test',true)

        let wallsCG = this.game.physics.p2.createCollisionGroup();
        let playerCG = this.game.physics.p2.createCollisionGroup();
        let walls = this.game.physics.p2.convertCollisionObjects(this.map, 'colision')
        
        for(var wall in walls) 
        {
	        walls[wall].setCollisionGroup(wallsCG);
	        walls[wall].collides(playerCG);
	    }

        this.game.physics.p2.enable(this.hero.getSprite(),true)

        this.hero.addAnimation()

        this.hero.getSprite().body.fixedRotation = true

        this.hero.getSprite().body.collideWorldBounds = true

        this.hero.getSprite().body.setCollisionGroup(playerCG)

        this.hero.getSprite().body.collides(wallsCG)

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
        this.hero.getSprite().body.setZeroVelocity()

        this.hero.setOnKeyPress(false)

        if (this.cursors.left.isDown)
            this.hero.moveLeft()
        
        if (this.cursors.right.isDown)
            this.hero.moveRight()
        
        if (this.cursors.up.isDown)
            this.hero.moveUp()
        
        if (this.cursors.down.isDown)
            this.hero.moveDown()

        /*
        this.game.physics.arcade.collide(this.hero.getSprite(), this.layerStoneTestCollision)
        this.game.physics.arcade.collide(this.hero.getSprite(), this.layerCofreCollision)

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

     */   
    }
}