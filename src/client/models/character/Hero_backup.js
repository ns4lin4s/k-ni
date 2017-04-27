     game.physics.startSystem(Phaser.Physics.P2JS);       
     game.physics.p2.setImpactEvents(true);  
         game.physics.p2.restitution = 0.8;      
         game.world.setBounds(-90, -300, 8200, 20000);      
         this.playerCG = game.physics.p2.createCollisionGroup();     
         this.enemiesCG = game.physics.p2.createCollisionGroup();     
         this.groundCG = game.physics.p2.createCollisionGroup();     
          game.physics.p2.updateBoundsCollisionGroup();



     this.player =        
      game.add.existing(             new Player(this, game, 750, 180, 0));     
      game.physics.p2.enable(this.player);     
      this.player.body.setCollisionGroup(this.playerCG);    
       this.player.body.collides(this.groundCG, this.player.collidesGround, this);     
       this.player.body.collides(this.enemiesCG);    


 game.physics.p2.enable(fistulaHair);    
       fistulaHair.body.kinematic = true;       
          this.ground.add(fistulaHair);         
           fistulaHair.body.setCollisionGroup(this.groundCG); 

           