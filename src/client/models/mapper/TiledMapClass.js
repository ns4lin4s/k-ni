
export default class TiledMapClass
{
	constructor()
	{
		this.tilesets = new Array();
		this.tileSizeX = null;
		this.tileSizeY = null;
		this.imgLoadCount = 0;
		this.fullyLoaded = false;
		this.numXTiles = null;
		this.numYTiles = null;
		this.currMapData = {};
		this.drawImage = new Array();

		this.ctx = document.getElementById('my_canvas').getContext('2d');
		//this.ctx.clearRect(0, 0, document.getElementById('my_canvas').width, document.getElementById('my_canvas').height);

		this.load("../../design/map.json");
	}

	load(map)
	{
		let self = this;
		this.xhrGet(map, function (data) {
            
            // Once the XMLHttpRequest loads, call the
            // parseMapJSON method.
            self.currMapData = JSON.parse(data.currentTarget.responseText);
			
			// Set 'numXTiles' and 'numYTiles' from the
	        // 'width' and 'height' fields of our parsed
	        // map data.
	        self.numXTiles = self.currMapData.width;
	        self.numYTiles = self.currMapData.height;
	      
	        // Set the 'tileSize.x' and 'tileSize.y' fields
	        // from the 'tilewidth' and 'tileheight' fields
	        // of our parsed map data.
	        self.tileSizeX = self.currMapData.tilewidth;
	        self.tileSizeY = self.currMapData.tileheight;
	      
	        // Set the 'pixelSize.x' and 'pixelSize.y' fields
	        // by multiplying the number of tiles in our map
	        // by the size of each tile in pixels.
	        let pixelSizeX = self.numXTiles * self.tileSizeX;
	        let pixelSizeY = self.numYTiles * self.tileSizeY;

	        let imgLoadCount = 0;
	        
	        // Loop through 'map.tilesets', an Array...
	        for(let i = 0; i < self.currMapData.tilesets.length; i++) 
	        {

	            // ...loading each of the provided tilesets as
	            // Images...
	            let img = new Image();
	            img.onload = function () {
	                // ...Increment the above 'imgLoadCount'
	                // field of 'TILEDMap' as each tileset is 
	                // loading...
	                imgLoadCount++;
	                if (imgLoadCount === self.currMapData.tilesets.length) {
	                    // ...Once all the tilesets are loaded, 
	                    // set the 'fullyLoaded' flag to true...
	                    self.currMapData.fullyLoaded = true;
	                }
	            };

	            // The 'src' value to load each new Image from is in
	            // the 'image' property of the 'tilesets'.
	            img.src = "../../design/" + self.currMapData.tilesets[i].image;

	            // This is the javascript object we'll create for
	            // the 'tilesets' Array above. First, fill in the
	            // given fields with the corresponding fields from
	            // the 'tilesets' Array in 'currMapData'.
	            let ts = {
	                "firstgid": self.currMapData.tilesets[i].firstgid,

	                // 'image' should equal the Image object we
	                // just created.

	                "image": img,
	                "imageheight": self.currMapData.tilesets[i].imageheight,
	                "imagewidth": self.currMapData.tilesets[i].imagewidth,
	                "name": self.currMapData.tilesets[i].name,

	                // These next two fields are tricky. You'll
	                // need to calculate this data from the
	                // width and height of the overall image and
	                // the size of each individual tile.
	                // 
	                // Remember: This should be an integer, so you
	                // might need to do a bit of manipulation after
	                // you calculate it.

	                "numXTiles": Math.floor(self.currMapData.tilesets[i].imagewidth / self.tileSizeX),
	                "numYTiles": Math.floor(self.currMapData.tilesets[i].imageheight / self.tileSizeY)
	            };

                /*console.log("imageheight::" + self.currMapData.tilesets[i].imageheight)
                console.log("imagewidth::" + self.currMapData.tilesets[i].imagewidth)
                console.log("self.tileSizeY::" + self.tileSizeY)
                console.log("self.tileSizeX::" + self.tileSizeX)
                console.log("numXTiles::" + Math.floor(self.currMapData.tilesets[i].imagewidth / self.tileSizeX))
                console.log("numYTiles::" + Math.floor(self.currMapData.tilesets[i].imageheight / self.tileSizeY))
                console.log("=========================")*/

	            self.tilesets.push(ts);
        	}

        	self.draw();

        });
	}

	xhrGet(reqUri,callback) 
	{
		let xhr = new XMLHttpRequest();

		xhr.open("GET", reqUri, true);
		xhr.onload = callback;

		xhr.send();
	}

	parseMapJSON(mapJSON)
	{
		this.currMapData = JSON.parse(mapJSON);
		
	}

	//-----------------------------------------
    // Grabs a tile from our 'layer' data and returns
    // the 'pkt' object for the layer we want to draw.
    // It takes as a parameter 'tileIndex', which is
    // the id of the tile we'd like to draw in our
    // layer data.
    getTilePacket(tileIndex) {

        // We define a 'pkt' object that will contain
        // 
        // 1) The Image object of the given tile.
        // 2) The (x,y) values that we want to draw
        //    the tile to in map coordinates.
        let pkt = {
            "img": null,
            "px": 0,
            "py": 0
        };

        // The first thing we need to do is find the
        // appropriate tileset that we want to draw
        // from.
        //
        // Remember, if the tileset's 'firstgid'
        // parameter is less than the 'tileIndex'
        // of the tile we want to draw, then we know
        // that tile is not in the given tileset and
        // we can skip to the next one.
        let tile = 0;
        /*for(tile = this.currMapData.tilesets.length - 1; tile >= 0; tile--) {
            if(this.currMapData.tilesets[tile].firstgid <= tileIndex) break;
        }*/
		console.log("tile::" + tile)
        // Next, we need to set the 'img' parameter
        // in our 'pkt' object to the Image object
        // of the appropriate 'tileset' that we found
        // above.
        pkt.img = this.currMapData.tilesets[tile].image;


        // Finally, we need to calculate the position to
        // draw to based on:
        //
        // 1) The local id of the tile, calculated from the
        //    'tileIndex' of the tile we want to draw and
        //    the 'firstgid' of the tileset we found earlier.
        let localIdx = tileIndex - this.tilesets[tile].firstgid;

        // 2) The (x,y) position of the tile in terms of the
        //    number of tiles in our tileset. This is based on
        //    the 'numXTiles' of the given tileset. Note that
        //    'numYTiles' isn't actually needed here. Think about
        //    how the tiles are arranged if you don't see this,
        //    It's a little tricky. You might want to use the 
        //    modulo and division operators here.
        let lTileX = Math.floor(localIdx % this.tilesets[tile].numXTiles);
        let lTileY = Math.floor(localIdx / this.tilesets[tile].numXTiles);

        // 3) the (x,y) pixel position in our tileset image of the
        //    tile we want to draw. This is based on the tile
        //    position we just calculated and the (x,y) size of
        //    each tile in pixels.
        pkt.px = (lTileX * this.tileSizeX);
        pkt.py = (lTileY * this.tileSizeY);


        return pkt;
    }

	draw()
	{
		let self = this;

        for(let layerIdx = 0; layerIdx < this.currMapData.layers.length; layerIdx++) {
        	console.log("wqe");
            // Check if the 'type' of the layer is "tilelayer". If it isn't, we don't
            // care about drawing it...
            if(this.currMapData.layers[layerIdx].type != "tilelayer") continue;

            // ...Grab the 'data' Array of the given layer...
            let dat = this.currMapData.layers[layerIdx].data;

            // ...For each tileID in the 'data' Array...
            for(let tileIDX = 0; tileIDX < dat.length; tileIDX++) {
                // ...Check if that tileID is 0. Remember, we don't draw
                // draw those, so we can skip processing them...
                //console.log(tileIDX + "-" + dat.length);

                let tID = dat[tileIDX];
				console.log("tID::::" + tID)
                if(tID === 0) continue;

                // ...If the tileID is not 0, then we grab the
                // packet data using getTilePacket.
                let tPKT = this.getTilePacket(tID);
                
                let worldX = Math.floor(tileIDX % this.numXTiles) * this.tileSizeX;
                let worldY = Math.floor(tileIDX / this.numXTiles) * this.tileSizeY;

				
				if(worldX === 0)
				{   
					console.log("******************")
					console.log("this.numXTiles::" + this.numXTiles)
					console.log("this.tileSizeX::" + this.tileSizeX)
					console.log("tileIDX::" + tileIDX)
					console.log("worldX::" + worldX)
					 console.log("******************")
				}
					//console.log("ACA ESTA<-----------------------------------------")
				
				
                /*console.log("tileIDX" + tileIDX)
                console.log("numXTiles" + this.numXTiles)
                console.log("tileSizeY" + this.tileSizeY)*/
               

                this.drawImage.push({ 

                	"tPKTx" : tPKT.px,
                	"tPKTy" : tPKT.py,
                	"tileSizeX" : this.tileSizeX,
                	"tileSizeY" : this.tileSizeY,
                	"worldX" : worldX,
                	"worldY" : worldY
                });
            }
        }

        let img = new Image();

        img.src = "../../design/map.png";

        img.onload = function(){

        	for(let i = 0; i < self.drawImage.length; i++)
	        {     

                /*console.log("pixelSizeX:" + self.drawImage[i].tPKTx)
                console.log("pixelSizeY:" + self.drawImage[i].tPKTy) 
                console.log("tilesets[tile].tile_width:" + self.drawImage[i].tileSizeX)
                console.log("tilesets[tile].tile_height:" + self.drawImage[i].tileSizeY)
                console.log("worldX:" + self.drawImage[i].worldX)
                console.log("worldY:" +self.drawImage[i].worldY)
                console.log("============================")*/

            	self.ctx.drawImage(
                	img, 
                	self.drawImage[i].tPKTx, 
                	self.drawImage[i].tPKTy, 
                	self.drawImage[i].tileSizeX, 
                	self.drawImage[i].tileSizeY, 
                	self.drawImage[i].worldX, 
                	self.drawImage[i].worldY, 
                	self.drawImage[i].tileSizeX, 
                	self.drawImage[i].tileSizeY
    			);
	        }
        };
	}
}