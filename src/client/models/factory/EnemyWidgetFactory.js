'use strict'

import CharacterWidgetFactory from './CharacterWidgetFactory'

export default class EnemyWidgetFactory extends CharacterWidgetFactory
{
    constructor()
    {
        super()
    }

    static CreateCharacter(game)
    { 
        console.log(`create enemy..`)
    }
}