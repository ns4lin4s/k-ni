export default class Spritesheet
{
	constructor(){ 

		this.img = null;

		this.url = "";

		this.sprites = new Array();

		this.gSpriteSheets = {};

        this.ctxCharacter = document.getElementById('my_canvas').getContext('2d');

	}

	load(imgName) {

        this.url = imgName;
        
		let img = new Image();
		img.src = imgName;

		this.img = img;

		this.gSpriteSheets[imgName] = this;
        console.log(`Cargando imagen.. ${imgName}`)
	}

	defSprite(name, x, y, w, h, cx, cy) {
        
		let spt = {
			"id": name,
			"x": x,
			"y": y,
			"w": w,
			"h": h,
			"cx": cx === null ? 0 : cx,
			"cy": cy === null ? 0 : cy
		};

		this.sprites.push(spt);
	}

    xhrGet(reqUri,callback) 
    {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", reqUri, true);
        xhr.onload = callback;

        xhr.send();
    }

	parseAtlasDefinition(map,png) {

        let self = this
        
        this.xhrGet(map, function (data) {

            let parsed = JSON.parse(data.currentTarget.response)

            // For each sprite in the parsed JSON,
            // 'chaingun.png', chaingun_impact.png',
            // etc....
    		for(let key in parsed.frames) {
                // Grab the sprite from the parsed JSON...
    			let sprite = parsed.frames[key]

    			let cx = -sprite.frame.w * 0.5
    			let cy = -sprite.frame.h * 0.5

    			self.defSprite(key, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, cx, cy)

    		}

            self.load(png)
            self.drawSprite(png,50,50)

        })
	}

	getStats(name) {
        // For each sprite in the 'sprites' Array...
		for(let i = 0; i < this.sprites.length; i++) {
            
            // Check if the sprite's 'id' parameter
            // equals the passed in name...
            if(this.sprites[i].id === name) {
                // and return that sprite if it does.
                return this.sprites[i];
            }
		}

		return null;
	}


    drawSprite(spritename, posX, posY) {
        
        for(var sheetName in this.gSpriteSheets) {
            
            var sheet = this.gSpriteSheets[sheetName];
            var sprite = this.getStats('0');

            if(sprite === null) {
                continue;
            }

            this.__drawSpriteInternal(sprite, sheet, posX, posY);

            return;
        }
    }

    __drawSpriteInternal(spt, sheet, posX, posY) {
        
        if (spt === null || sheet === null) {
            return;
        }
        let self = this

        var hlf = {
            x: spt.cx,
            y: spt.cy
        };

        let img = new Image();

        img.src = "./assets/character_sprites.png";

        img.onload = function(){

            self.ctxCharacter.drawImage(sheet.img, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
        };
        
    }
}