(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Game = require('./models/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Boot = require('./models/Boot');

var _Boot2 = _interopRequireDefault(_Boot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const mappers = require('./helpers/render')

var game = new _Game2.default().get();
var boot = new _Boot2.default(game);

game.state.add('boot', boot);

game.state.start('boot');

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

},{"./models/Boot":2,"./models/Game":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HeroWidgetFactory = require('./factory/HeroWidgetFactory');

var _HeroWidgetFactory2 = _interopRequireDefault(_HeroWidgetFactory);

var _EnemyWidgetFactory = require('./factory/EnemyWidgetFactory');

var _EnemyWidgetFactory2 = _interopRequireDefault(_EnemyWidgetFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boot = function () {
    function Boot() {
        _classCallCheck(this, Boot);
    }

    _createClass(Boot, [{
        key: 'contructor',
        value: function contructor(game) {
            this.game = game;
        }
    }, {
        key: 'preload',
        value: function preload() {
            this.hero = _HeroWidgetFactory2.default.CreateCharacter(this.game);

            this.enemy = _EnemyWidgetFactory2.default.CreateCharacter(this.game);

            this.game.load.tilemap('dungeon', '../../design/map.json', null, Phaser.Tilemap.TILED_JSON);

            this.game.load.image('tiles', '../../design/map.png');
        }
    }, {
        key: 'create',
        value: function create() {
            this.attackTime = 0;

            this.game.physics.startSystem(Phaser.Physics.P2JS);

            this.game.world.setBounds(0, 0, 3000, 3000);

            this.cursors = this.game.input.keyboard.createCursorKeys();

            this.keyboard = this.game.input.keyboard;

            this.map = this.game.add.tilemap('dungeon');

            this.map.addTilesetImage('base', 'tiles');

            this.layerFloor = this.map.createLayer('floor');

            this.layerWallCollision = this.map.createLayer('wall');

            this.layerCofreCollision = this.map.createLayer('cofre');

            this.layerStoneCollision = this.map.createLayer('stone_down');

            this.layerStone = this.map.createLayer('stone_up');

            this.layerFire = this.map.createLayer('fire');

            this.layerWallCollision.resizeWorld();

            this.layerStoneCollision.resizeWorld();

            this.layerCofreCollision.resizeWorld();

            this.layerStone.resizeWorld();

            this.layerFire.resizeWorld();

            this.layerFloor.resizeWorld();

            this.map.setCollision('stone_test', true);

            var wallsCG = this.game.physics.p2.createCollisionGroup();
            var playerCG = this.game.physics.p2.createCollisionGroup();
            var walls = this.game.physics.p2.convertCollisionObjects(this.map, 'colision');

            for (var wall in walls) {
                walls[wall].setCollisionGroup(wallsCG);
                walls[wall].collides(playerCG);
            }

            this.game.physics.p2.enable(this.hero.getSprite(), true);

            this.hero.addAnimation();

            this.hero.getSprite().body.fixedRotation = true;

            this.hero.getSprite().body.collideWorldBounds = true;

            this.hero.getSprite().body.setCollisionGroup(playerCG);

            this.hero.getSprite().body.collides(wallsCG);

            this.timeKeyDown = null;

            var attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);

            attackKey.onDown.add(function () {
                this.timeKeyDown = this.game.time.now;
            }, this);

            attackKey.onUp.add(function () {}, this);

            this.game.camera.follow(this.hero.getSprite(), Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }
    }, {
        key: 'update',
        value: function update() {
            this.hero.getSprite().body.setZeroVelocity();

            this.hero.setOnKeyPress(false);

            if (this.cursors.left.isDown) this.hero.moveLeft();

            if (this.cursors.right.isDown) this.hero.moveRight();

            if (this.cursors.up.isDown) this.hero.moveUp();

            if (this.cursors.down.isDown) this.hero.moveDown();

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
    }]);

    return Boot;
}();

exports.default = Boot;

},{"./factory/EnemyWidgetFactory":6,"./factory/HeroWidgetFactory":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(preload, create, update) {
        _classCallCheck(this, Game);

        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'game-area');
    }

    _createClass(Game, [{
        key: 'get',
        value: function get() {
            return this.game;
        }
    }]);

    return Game;
}();

exports.default = Game;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VELOCITY_X = 200;
var VELOCITY_Y = 200;

var Hero = function () {
    function Hero(game) {
        _classCallCheck(this, Hero);

        this.game = game;

        this.game.load.spritesheet('knight-walk', './assets/axe_animation.png', 100, 100);

        this.faceLeft = false;

        this.sprite = null;

        this.onKeyPress = false;
    }

    _createClass(Hero, [{
        key: 'getSprite',
        value: function getSprite() {
            if (this.sprite == null) this.sprite = this.game.add.sprite(50, 150, 'knight-walk');

            return this.sprite;
        }
    }, {
        key: 'addAnimation',
        value: function addAnimation() {
            this.sprite.scale.setTo(1 / 1.8, 1 / 1.8);

            this.sprite.animations.add('walk-right', [3, 4, 3, 5], 9, true);

            this.sprite.animations.add('walk-left', [7, 6, 7, 8], 9, true);

            this.sprite.animations.add('attack-right', [0, 1, 2], 10, true);

            this.sprite.animations.add('attack-left', [9, 10, 11], 10, true);

            this.sprite.animations.add('attack-right-walk', [1, 2], 10, true);

            this.sprite.animations.add('attack-left-walk', [10, 11], 10, true);
        }

        //TODO

    }, {
        key: 'jump',
        value: function jump() {}

        //TODO

    }, {
        key: 'run',
        value: function run() {}
    }, {
        key: 'moveLeft',
        value: function moveLeft() {
            this.onKeyPress = true;
            this.faceLeft = true;
            this.sprite.body.moveLeft(VELOCITY_X);
            this.sprite.animations.play('walk-left');
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            this.onKeyPress = true;
            this.faceLeft = false;
            this.sprite.body.moveRight(VELOCITY_X);
            this.sprite.animations.play('walk-right');
        }
    }, {
        key: 'moveUp',
        value: function moveUp() {
            this.onKeyPress = true;
            this.sprite.body.moveUp(VELOCITY_Y);

            if (this.faceLeft) this.sprite.animations.play('walk-left');else this.sprite.animations.play('walk-right');
        }
    }, {
        key: 'moveDown',
        value: function moveDown() {
            this.onKeyPress = true;
            this.sprite.body.moveDown(VELOCITY_Y);

            if (this.faceLeft) this.sprite.animations.play('walk-left');else this.sprite.animations.play('walk-right');
        }
    }, {
        key: 'getOnKeyPress',
        value: function getOnKeyPress() {
            return this.onKeyPress;
        }
    }, {
        key: 'setOnKeyPress',
        value: function setOnKeyPress(value) {
            this.onKeyPress = value;
        }
    }, {
        key: 'attack',
        value: function attack(isWalking) {
            this.onKeyPress = true;
            console.log('iswalking..' + isWalking);
            if (isWalking && this.faceLeft) this.sprite.animations.play('attack-left-walk');else if (isWalking && !this.faceLeft) this.sprite.animations.play('attack-right-walk');else if (this.faceLeft) {
                this.sprite.animations.play('attack-left');
                this.sprite.animations.currentAnim.onComplete.add(function () {
                    this.sprite.frame = 7;console.log('attack-left!');
                });
            }

            //this.sprite.animations.play('attack-left')
            else {
                    this.sprite.animations.play('attack-right');
                    this.sprite.animations.currentAnim.onComplete.add(function () {
                        this.sprite.frame = 3;console.log('attack-right!');
                    });
                }

            //this.sprite.animations.play('attack-right')

        }
    }, {
        key: 'stop',
        value: function stop() {
            this.sprite.animations.stop();
        }
    }]);

    return Hero;
}();

exports.default = Hero;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterWidgetFactory = function () {
    function CharacterWidgetFactory() {
        _classCallCheck(this, CharacterWidgetFactory);

        console.log('abstract factory constructor..');
    }

    _createClass(CharacterWidgetFactory, [{
        key: 'CreateCharacter',
        value: function CreateCharacter(game) {}
    }]);

    return CharacterWidgetFactory;
}();

exports.default = CharacterWidgetFactory;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CharacterWidgetFactory = require('./CharacterWidgetFactory');

var _CharacterWidgetFactory2 = _interopRequireDefault(_CharacterWidgetFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnemyWidgetFactory = function (_CharacterWidgetFacto) {
    _inherits(EnemyWidgetFactory, _CharacterWidgetFacto);

    function EnemyWidgetFactory() {
        _classCallCheck(this, EnemyWidgetFactory);

        return _possibleConstructorReturn(this, (EnemyWidgetFactory.__proto__ || Object.getPrototypeOf(EnemyWidgetFactory)).call(this));
    }

    _createClass(EnemyWidgetFactory, null, [{
        key: 'CreateCharacter',
        value: function CreateCharacter(game) {
            console.log('create enemy..');
        }
    }]);

    return EnemyWidgetFactory;
}(_CharacterWidgetFactory2.default);

exports.default = EnemyWidgetFactory;

},{"./CharacterWidgetFactory":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CharacterWidgetFactory = require('./CharacterWidgetFactory');

var _CharacterWidgetFactory2 = _interopRequireDefault(_CharacterWidgetFactory);

var _Hero = require('../character/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeroWidgetFactory = function (_CharacterWidgetFacto) {
    _inherits(HeroWidgetFactory, _CharacterWidgetFacto);

    function HeroWidgetFactory() {
        _classCallCheck(this, HeroWidgetFactory);

        return _possibleConstructorReturn(this, (HeroWidgetFactory.__proto__ || Object.getPrototypeOf(HeroWidgetFactory)).call(this));
    }

    _createClass(HeroWidgetFactory, null, [{
        key: 'CreateCharacter',
        value: function CreateCharacter(game) {
            console.log('create hero..');

            return new _Hero2.default(game);
        }
    }]);

    return HeroWidgetFactory;
}(_CharacterWidgetFactory2.default);

exports.default = HeroWidgetFactory;

},{"../character/Hero":4,"./CharacterWidgetFactory":5}]},{},[1]);
