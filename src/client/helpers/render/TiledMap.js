'use strict'

const xhr = require('xhr')

module.exports = function()
{
    const mapSrc = '../../design/map.json'
    const mapImg = '../../design/map.png'
    const ctx = document.getElementById('game-area').getContext('2d')
    let isSuccess = { result : '' }

    function buildTiles(tiledObject){
        let tilesets = new Array()
        let layers = tiledObject.layers

        tiledObject.tilesets.forEach(elem => {
            let image = new Image()
            image.src = "../../design/" + elem.image
           
            tilesets.push({
                firstgid: elem.firstgid,
                image: image,
                image_height: elem.imageheight,
                image_width: elem.imagewidth,
                tile_width: elem.tilewidth,
                tile_height: elem.tileheight,
                name: elem.name,
                numXTiles: Math.floor(elem.imagewidth / elem.tilewidth),
                numYTiles: Math.floor(elem.imageheight / elem.tileheight),
                layers: layers,
                width: tiledObject.width
            })
        })

        return tilesets
    }

    function buildLayers(tilesets){

        let img = new Image()
        img.src = mapImg
        img.onload = function(){
            //recorre mapas
            tilesets.forEach(map => {
                //recorre capas
                map.layers.forEach(layer => {
                    //pregunto si es una capa, podría ser un objeto 'tileObject'
                    if(layer.type !== `tilelayer`) return
                    
                    //recorro los tiles de una capa
                    for(let index = 0; index < layer.data.length; index++)
                    {
                        let elem = layer.data[index]

                        //pregunto si es igual a cero (cero no representa un tile válido)
                        if(elem === 0) continue
                        
                        let localIdx = elem - tilesets[0].firstgid;
                        let lTileX = Math.floor(localIdx % tilesets[0].numXTiles);
                        let lTileY = Math.floor(localIdx / tilesets[0].numXTiles);
                        let pixelSizeX = (lTileX * tilesets[0].tile_width);
                        let pixelSizeY = (lTileY * tilesets[0].tile_height);
                        
                        let worldX = Math.floor(index % map.width) * tilesets[0].tile_width;
                        let worldY = Math.floor(index / map.width) * tilesets[0].tile_height;
                        
                        //se dibuja el tile en el canvas ;)
                        ctx.drawImage(
                            img,
                            pixelSizeX, pixelSizeY, 
                            tilesets[0].tile_width, tilesets[0].tile_height, 
                            worldX, 
                            worldY,
                            tilesets[0].tile_width, tilesets[0].tile_height
                        )
                        
                    }                 
                })
             })
        }
    }

    let resultJson = new Promise((resolve, reject) => {
        xhr({ uri: mapSrc, headers:{ "Content-Type": "application/json" } },
            function (err, resp, body) {
                if(resp.statusCode == 200)
                    resolve({ msg : 'success', data: JSON.parse(body) })
                else
                    reject({ msg: `Error: ${err.message}`, data: '' })
        })
    })

    resultJson.then((result) => {
        return buildTiles(result.data)
    })
    .then((tilesets) => {
        buildLayers(tilesets)
    })
    .catch((err) => {
        isSuccess.result = err.message
    })

    return isSuccess
}
