function World(reg) {
  
  this.registry = reg;
  this.blocks = [];
    
  /* this.minX = 0;
  this.minY = 0;
  this.minZ = 0;
  
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
}