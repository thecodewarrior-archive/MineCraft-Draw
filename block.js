function Block(id, meta, init) {
  
  if(typeof init === "undefined") throw new Error("block paramaters not optional");
  
  this.id = id;
  this.meta = meta;
  
  this.facing = Coord.NORTH;
  this.textures = [];
  this.renderer = null;
  this.name = id + ":" + meta;
  
  this.obtainable = true;
  
  this.setUnlocalizedName = function (name) {
    this.name = name;
  };
  
  this.getUnlocalizedName = function () {
    return this.name;
  };
  
  this.setFacing = function (side) {
    this.facing = side;
  };
  
  this.getTexture = function (side) {
    return $("");
  };
  
  this.hasCustom3DRenderer = function () { return false; };
  
  this.getCustom3DRenderer = function () { return this.renderer; };
  
  this.saveToNBT = function (nbt) {
    
  };
  
  this.readFromNBT = function (nbt) {
    
  };
  
  this.getEditScreen = function () {
    return $('<div></div>');
  };
  
  this.getValidFacingDirections = function () {
    return [Coord.NORTH, Coord.SOUTH, Coord.WEST, Coord.EAST];
  };
  
  this.sideFacing = function(side) {
    return Block.facing_map[this.facing][side];
  };
  
  this.getContextElements = function(block) {
    
    return [];
  }
  
  init(this);
  
  this.getExtraContextElements = this.getContextElements;
  
  this.getContextElements = function() {
    var settings = $('<i></i>');
    settings.addClass('fa');
    settings.addClass('fa-cog');
    settings.addClass('pointer');
    var b = this;
    settings.click(function(evt) {
      window.main.openEditWindow(b);
    });
    var a = this.getExtraContextElements(this);
    a.unshift(settings);
    return a;
  };
  
  this.init = init;
  
  this.id = id;
  this.meta = meta;
  
  this.dup = function() {
    return new Block(this.id, this.meta, this.init);
  };
}

Block.FRONT  = 'F';
Block.BACK   = 'B';
Block.LEFT   = 'L';
Block.RIGHT  = 'R';
Block.TOP    = 'U';
Block.BOTTOM = 'D';

Block.facing_map = {};
Block.facing_map[Coord.NORTH] = {}
Block.facing_map[Coord.NORTH][Coord.NORTH] = Block.FRONT;
Block.facing_map[Coord.NORTH][Coord.SOUTH] = Block.BACK;
Block.facing_map[Coord.NORTH][Coord.WEST]  = Block.LEFT;
Block.facing_map[Coord.NORTH][Coord.EAST]  = Block.RIGHT;
Block.facing_map[Coord.NORTH][Coord.UP]    = Block.TOP;
Block.facing_map[Coord.NORTH][Coord.DOWN]  = Block.BOTTOM;


Block.facing_map[Coord.SOUTH] = {};
Block.facing_map[Coord.SOUTH][Coord.SOUTH] = Block.FRONT;
Block.facing_map[Coord.SOUTH][Coord.NORTH] = Block.BACK;
Block.facing_map[Coord.SOUTH][Coord.EAST]  = Block.LEFT;
Block.facing_map[Coord.SOUTH][Coord.WEST]  = Block.RIGHT;
Block.facing_map[Coord.SOUTH][Coord.UP]    = Block.TOP;
Block.facing_map[Coord.SOUTH][Coord.DOWN]  = Block.BOTTOM;


Block.facing_map[Coord.WEST] = {};
Block.facing_map[Coord.WEST][Coord.WEST]  = Block.FRONT;
Block.facing_map[Coord.WEST][Coord.EAST]  = Block.BACK;
Block.facing_map[Coord.WEST][Coord.SOUTH] = Block.LEFT;
Block.facing_map[Coord.WEST][Coord.NORTH] = Block.RIGHT;
Block.facing_map[Coord.WEST][Coord.UP]    = Block.TOP;
Block.facing_map[Coord.WEST][Coord.DOWN]  = Block.BOTTOM;

  
Block.facing_map[Coord.EAST] = {};
Block.facing_map[Coord.EAST][Coord.EAST]  = Block.FRONT;
Block.facing_map[Coord.EAST][Coord.WEST]  = Block.BACK;
Block.facing_map[Coord.EAST][Coord.NORTH] = Block.LEFT;
Block.facing_map[Coord.EAST][Coord.SOUTH] = Block.RIGHT;
Block.facing_map[Coord.EAST][Coord.UP]    = Block.TOP;
Block.facing_map[Coord.EAST][Coord.DOWN]  = Block.BOTTOM;
