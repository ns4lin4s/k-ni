'use strict'

import CharacterWidgetFactory from './CharacterWidgetFactory'
import Hero from '../character/Hero'

export default class HeroWidgetFactory extends CharacterWidgetFactory
{
    constructor()
    {
        super()
    }

    static CreateCharacter(game)
    { 
        console.log(`create hero..`)

        return new Hero(game)
    }
}