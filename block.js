var contains = function (haystack, needle) {
    return !!~haystack.indexOf(needle);
};

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
  
  this.updateTextures = function() {
    window.main.updateTextures(this.x, this.y, this.z);
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

Block.facing_map[Coord.UP] = {};
Block.facing_map[Coord.UP][Coord.EAST]  = Block.RIGHT;
Block.facing_map[Coord.UP][Coord.WEST]  = Block.LEFT;
Block.facing_map[Coord.UP][Coord.NORTH] = Block.TOP;
Block.facing_map[Coord.UP][Coord.SOUTH] = Block.BOTTOM;
Block.facing_map[Coord.UP][Coord.UP]    = Block.FRONT;
Block.facing_map[Coord.UP][Coord.DOWN]  = Block.BACK;

Block.facing_map[Coord.DOWN] = {};
Block.facing_map[Coord.DOWN][Coord.EAST]  = Block.LEFT;
Block.facing_map[Coord.DOWN][Coord.WEST]  = Block.RIGHT;
Block.facing_map[Coord.DOWN][Coord.NORTH] = Block.TOP;
Block.facing_map[Coord.DOWN][Coord.SOUTH] = Block.BOTTOM;
Block.facing_map[Coord.DOWN][Coord.UP]    = Block.BACK;
Block.facing_map[Coord.DOWN][Coord.DOWN]  = Block.FRONT;


Block.build = function( obj ) {
  var texF = function(_, ctx) {
    var r = $('<img></img>');
    r.attr('src', Main.root + "assets/unknown.png");
    r.load(function() {
      if(typeof ctx !== "undefined") {
        ctx.drawImage(this, 0, 0);
      }
    });
    return r;
  }
  
  if(typeof obj['texF'] === "function") {
    texF = obj['texF'];
  }

  return new Block(obj.id, obj.meta, function(b) {
    b._tex = obj['tex']();
    b.paramObj = obj;
    b.getTexture = function(side, ctx) {
      var canvas = (typeof ctx !== "undefined");
      
      if(typeof b._tex['fixed'] !== "undefined") {
        
        if(typeof b._tex['fixed']['top'] !== "undefined" && side === Coord.UP) {
          return texF(obj['fixed']['top'], ctx);
        }
        if(typeof b._tex['fixed']['bottom'] !== "undefined" && side === Coord.DOWN) {
          return texF(obj['fixed']['bottom'], ctx);
        }
        if(typeof b._tex['fixed']['north'] !== "undefined" && side === Coord.NORTH) {
          return texF(obj['fixed']['north'], ctx);
        }
        if(typeof b._tex['fixed']['south'] !== "undefined" && side === Coord.SOUTH) {
          return texF(obj['fixed']['south'], ctx);
        }
        if(typeof b._tex['fixed']['east'] !== "undefined" && side === Coord.EAST) {
          return texF(obj['fixed']['east'], ctx);
        }
        if(typeof b._tex['fixed']['west'] !== "undefined" && side === Coord.WEST) {
          return texF(b._tex['fixed']['west'], ctx);
        }
        
      }
      if(obj['type'] === 'facing') {                                 // ******
        
        // region Facing
        var f = b.sideFacing(side);

        if(f === Block.FRONT) {
          return texF(b._tex['front'], ctx);
        }
        if(f === Block.LEFT || f === Block.RIGHT || f === Block.TOP || f === Block.BOTTOM) {
          var t = "";
          if(typeof b._tex['left'] !== "undefined" && f === Block.LEFT) {
            t = b._tex['left'];
          } else if(typeof b._tex['right'] !== "undefined" && f === Block.RIGHT) {
            t = b._tex['right'];
          } else if(typeof b._tex['top'] !== "undefined" && f === Block.TOP) {
            t = b._tex['top'];
          } else if(typeof b._tex['bottom'] !== "undefined" && f === Block.BOTTOM) {
            t = b._tex['bottom'];
          } else {
            if(typeof b._tex['sides'] === "undefined") {
              t = b._tex['side']
            } else {
              t = b._tex['sides'];
            }
          }
                    
          var rot = 0;
          if(b._tex['level'] === true) {
            // region Face Rotate
            
            // endregion
          } else {
            // region Face Rotate
            if(b.facing === Coord.NORTH) {
              if(Coord.isTop(side) || Coord.isBottom(side)) {
                rot = 0;
              }
              if(side === Coord.WEST) {
                rot = -90
              }
              if(side === Coord.EAST) {
                rot = 90;
              }
            }
            if(b.facing === Coord.WEST) {
              if(Coord.isTop(side)) {
                rot = -90;
              }
              if(Coord.isBottom(side)) {
                rot = 90;
              }
              if(side === Coord.NORTH) {
                rot = 90
              }
              if(side === Coord.SOUTH) {
                rot = -90;
              }
            }
            if(b.facing === Coord.EAST) {
              if(Coord.isTop(side)) {
                rot = 90;
              }
              if(Coord.isBottom(side)) {
                rot = -90;
              }
              if(side === Coord.SOUTH) {
                rot = 90
              }
              if(side === Coord.NORTH) {
                rot = -90;
              }
            }
            if(b.facing === Coord.SOUTH) {
              if(Coord.isTop(side)){
                rot = 180;
              }
              if(Coord.isBottom(side)) {
                rot = 180;
              }
              if(side === Coord.EAST) {
                rot = -90
              }
              if(side === Coord.WEST) {
                rot = 90;
              }
            }
            if(b.facing === Coord.DOWN) {
              if(Coord.isSide(side)){
                rot = 180;
              }
            }
            // endregion
          }
          if(canvas) {
            texF(t, ctx, {rot:rot})
          } else {
            t = texF(t);
            t.css('-webkit-transform', 'rotate(' + rot + 'deg)');
            t.css(   '-moz-transform', 'rotate(' + rot + 'deg)');
            t.css(     '-o-transform', 'rotate(' + rot + 'deg)');
            t.css(        'transform', 'rotate(' + rot + 'deg)');
            return t;
          }
        }
        if(f === Block.BACK) {
          return texF(b._tex['back'], ctx);
        }
        // endregion
      
      } else if(obj['type'] === 'static') {                          // ******
        
        // region Static
        if(side === Coord.UP   ) {
          return texF(b._tex['top'], ctx);
        }
        if(side === Coord.DOWN ) {
          return texF(b._tex['bottom'], ctx);
        }
        if(side === Coord.NORTH) {
          return texF(b._tex['north'], ctx);
        }
        if(side === Coord.SOUTH) {
          return texF(b._tex['south'], ctx);
        }
        if(side === Coord.EAST ) {
          return texF(b._tex['east'], ctx);
        }
        if(side === Coord.WEST ) {
          return texF(b._tex['west'], ctx);
        }
        // endregion
      
      } else if(obj['type'] === 'stb') {                             // ******
        
        // region Side-Top-Bottom
        if(Coord.isTop(side)) {
          return texF(b._tex['top'], ctx);
        }
        if(Coord.isSide(side)) {
          var t = b._tex['sides'];
          if(typeof b._tex['sides'] === "undefined") {
            t = b._tex['side']
          }
          return texF(t, ctx);
        }
        if(Coord.isBottom(side)) {
          return texF(b._tex['bottom'], ctx);
        }
        // endregion
        
      } else if (obj['type'] === 'customRender') {
        return texF(b._tex['icon'], ctx);
      } else {
        
        // region Basic
        
        return texF(b._tex, ctx);
        
        // endregion
      }
    };

    b.setUnlocalizedName(obj.mod.name + ":" + obj.name);

    b.getValidFacingDirections = function() {
      if(typeof obj['canFace'] === "undefined") {
        return [];
      } else if (obj['canFace'] === 'any') {
        return [Coord.UP, Coord.DOWN, Coord.NORTH, Coord.SOUTH, Coord.WEST, Coord.EAST];
      } else {
        var d = obj['canFace'];
        var r = [];
        if (contains(d, 'up')) {
          r.push(Coord.UP);
        }
        if (contains(d, 'down')) {
          r.push(Coord.DOWN);
        }
        if (contains(d, 'north')) {
          r.push(Coord.NORTH);
        }
        if (contains(d, 'south')) {
          r.push(Coord.SOUTH);
        }
        if (contains(d, 'east')) {
          r.push(Coord.EAST);
        }
        if (contains(d, 'west')) {
          r.push(Coord.WEST);
        }
        return r;
      }
    }
    
    if(obj['type'] === 'customRender') {
      b.hasCustom3DRenderer = function() { return true; };
      b.renderParam = b._tex['renderParam'];
      b.getCustom3DRenderer = function(prev) {
        return b._tex['render']( b._tex['renderParam'], prev );
      };
    }
    
    if(typeof obj.func === "function") { obj.func(b); }

  });
}