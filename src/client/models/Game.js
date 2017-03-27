

export default class Game
{
    constructor(preload, create, update)
    {
        this.game = new Phaser.Game(
            600, 
            600, 
            Phaser.AUTO, 
            'game-area'
        )
    }

    get()
    {
        return this.game
    }
}