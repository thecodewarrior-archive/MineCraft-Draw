function World(reg) {
  
  var m = this;
  this.registry = reg;
  this.blocks = [];
    
  this.minX = 0;
  this.minY = 0;
  this.minZ = 0;
  /*
  this.maxX = 1;
  this.maxY = 1;
  this.maxz = 1;*/
  
  this.setBlock = function(x, y, z, block) {
    /* this.maxX = Math.max(this.maxX, x);
    this.maxY = Math.max(this.maxY, y);
    this.maxZ = Math.max(this.maxZ, z);
    
    this.minX = Math.min(this.minX, x);
    this.minY = Math.min(this.minY, y);
    this.minZ = Math.min(this.minZ, z); */
    block.x = x;
    block.y = y;
    block.z = z;
    
    if( this.minX > x ) this.minX = x;
    if( this.minY > y ) this.minY = y;
    if( this.minZ > z ) this.minZ = z;
    
    if( typeof this.blocks[x]    === "undefined" ) this.blocks[x]    = [];
    if( typeof this.blocks[x][y] === "undefined" ) this.blocks[x][y] = [];
    this.blocks[x][y][z] = block;
  }
  
  this.getBlock = function(x, y, z) {
    if(typeof this.blocks[x]       === "undefined") return this.registry.air;
    if(typeof this.blocks[x][y]    === "undefined") return this.registry.air;
    if(typeof this.blocks[x][y][z] === "undefined") return this.registry.air;
    return this.blocks[x][y][z];
  };
  
  this.getTexture = function(x, y, z, side) {
    return this.blocks[x][y][z].getTexture(side);
  }
  
  this.eachBlock = function( func ) {
    var x = this.minX, y = this.minY, z = this.minZ;
    
    while(x < this.blocks.length) {
      console.group("x:" + x);
      if(typeof this.blocks[x] !== "undefined") {
        
        while(y < this.blocks[x].length) {
          console.group("y:" + y);
          if(typeof this.blocks[x][y] !== "undefined") {
            
            while(z < this.blocks[x][y].length) {
              console.group("z:" + z);
              if(typeof this.blocks[x][y][z] !== "undefined") {
                console.group(x + "," + y + "," + z);
                func(x,y,z,this.blocks[x][y][z]);
                console.groupEnd();
              }
              z += 1;
              console.groupEnd()
            }
            z = this.minZ;
          }
          y += 1;
          console.groupEnd();
        }
        y = this.minY;
      }
      x += 1;
      console.groupEnd()
    }
  };
  
  this.save = function() {
    var elems = [];
    console.log('saving world');
    this.eachBlock(function(x,y,z,b) {
      console.log('block might be air');
      if(b.getUnlocalizedName() !== "minecraft:air") {
        console.log("saving block");
        var data = x + ":" + y + ":" + z +
            "~(" + b.id + "," + b.meta + ")";
        if(b.hasNBT()) { data += "+(" + b.saveToNBT() + ")"; }
        elems.push(data);
      }
    });
    
    return elems.join("\n");
  }
  
  this.load = function(string) {
    var blocks = string.split('\n');
    $.each(blocks, function(i, o) {
      var info = o.split('~');
      var loc = info.shift().split(':');
      info = info.join('~');
      
      var x = parseInt( loc[0] ), y = parseInt( loc[1] ), z = parseInt( loc[2] );
      
      var data = info.split('+');
      var id_meta = data.shift().split(',');
      data = data.join('+');
      data = data.substring(1, data.length-1);
      
      var id   = parseInt( id_meta[0].substring(1) );
      var meta = parseInt( id_meta[1].substring(0,id_meta[1].length-1) );
      
      var b = m.registry.blocks[id][meta].dup();
      if(data !== "") {
        b.loadFromNBT(data);
      }
      m.setBlock(x,y,z,b);
      
    });
  };
}