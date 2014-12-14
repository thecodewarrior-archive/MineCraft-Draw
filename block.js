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
  
  this.saveToNBT = function () {
    
  };
  
  this.loadFromNBT = function (nbt) {
    
  };
  
  this.hasNBT = function () {
    return false;
  }
  
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
      Main.instance.openEditWindow(b);
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

// region facing map
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
// endregion

Block.texExec = function(tex, nbt) {
  if(typeof tex === "function") {
    return tex(nbt);
  } else { return tex; }
}

Block.build = function( obj ) {
  return new Block(obj.id, obj.meta, function(b) {
    
    var texF = function() {
      var r = $('<img></img>');
      r.attr('src', Main.root + "assets/unknown.png");
      return r;
    }

    if(typeof obj['texF'] === "function") {
      texF = function(tex) {
        var t = Block.texExec(tex, b.nbt);

        return obj['texF'](t);
      }
    }
    
    b.paramObj = obj;
    b.nbt = {};
    
    b.getTexture = function(side) {
      if(typeof obj['fixed'] !== "undefined") {
        // region fixed
        if(typeof obj['fixed']['top'] !== "undefined" && side === Coord.UP) {
          return texF(obj['fixed']['top']);
        }
        if(typeof obj['fixed']['bottom'] !== "undefined" && side === Coord.DOWN) {
          return texF(obj['fixed']['bottom']);
        }
        if(typeof obj['fixed']['north'] !== "undefined" && side === Coord.NORTH) {
          return texF(obj['fixed']['north']);
        }
        if(typeof obj['fixed']['south'] !== "undefined" && side === Coord.SOUTH) {
          return texF(obj['fixed']['south']);
        }
        if(typeof obj['fixed']['east'] !== "undefined" && side === Coord.EAST) {
          return texF(obj['fixed']['east']);
        }
        if(typeof obj['fixed']['west'] !== "undefined" && side === Coord.WEST) {
          return texF(obj['fixed']['west']);
        }
        // endregion
      }
      if(obj['type'] === 'facing') {                                 // ******
        
        // region Facing
        var f = b.sideFacing(side);

        if(f === Block.FRONT) {
          return texF(obj['tex']['front']);
        }
        if(f === Block.LEFT || f === Block.RIGHT || f === Block.TOP || f === Block.BOTTOM) {
          var t = "";
          if(typeof obj['tex']['left'] !== "undefined" && f === Block.LEFT) {
            t = obj['tex']['left'];
          } else if(typeof obj['tex']['right'] !== "undefined" && f === Block.RIGHT) {
            t = obj['tex']['right'];
          } else if(typeof obj['tex']['top'] !== "undefined" && f === Block.TOP) {
            t = obj['tex']['top'];
          } else if(typeof obj['tex']['bottom'] !== "undefined" && f === Block.BOTTOM) {
            t = obj['tex']['bottom'];
          } else {
            if(typeof obj['tex']['sides'] === "undefined") {
              t = obj['tex']['side']
            } else {
              t = obj['tex']['sides'];
            }
          }
          
          t = texF(t);
          
          var rot = 0;
          if(obj['tex']['level'] === true) {
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
          t.css('-webkit-transform', 'rotate(' + rot + 'deg)');
          t.css(   '-moz-transform', 'rotate(' + rot + 'deg)');
          t.css(     '-o-transform', 'rotate(' + rot + 'deg)');
          t.css(        'transform', 'rotate(' + rot + 'deg)');
          return t;
        }
        if(f === Block.BACK) {
          return texF(obj['tex']['back']);
        }
        // endregion
      
      } else if(obj['type'] === 'static') {                          // ******
        
        // region Static
        if(side === Coord.UP   ) {
          return texF(obj['tex']['top']);
        }
        if(side === Coord.DOWN ) {
          return texF(obj['tex']['bottom']);
        }
        if(side === Coord.NORTH) {
          return texF(obj['tex']['north']);
        }
        if(side === Coord.SOUTH) {
          return texF(obj['tex']['south']);
        }
        if(side === Coord.EAST ) {
          return texF(obj['tex']['east']);
        }
        if(side === Coord.WEST ) {
          return texF(obj['tex']['west']);
        }
        // endregion
      
      } else if(obj['type'] === 'stb') {                             // ******
        
        // region Side-Top-Bottom
        if(Coord.isTop(side)) {
          return texF(obj['tex']['top']);
        }
        if(Coord.isSide(side)) {
          var t = obj['tex']['sides'];
          if(typeof obj['tex']['sides'] === "undefined") {
            t = obj['tex']['side']
          }
          return texF(t);
        }
        if(Coord.isBottom(side)) {
          return texF(obj['tex']['bottom']);
        }
        // endregion
        
      } else if (obj['type'] === 'customRender') {
        return texF(obj['tex']['icon']);
      } else {
        
        // region Basic
        
        return texF(obj['tex']);
        
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
      b.renderParam = obj['tex']['renderParam'];
      b.getCustom3DRenderer = function() {
        return obj['tex']['render']( 
          obj['tex']['renderParam'], b.nbt
        );
      };
    }
    
    b.saveToNBT = function() {
      if(b.getValidFacingDirections().length > 0) {
        b.nbt['facing'] = b.facing;
      }
      return JSON.stringify(b.nbt);
    };
    
    b.loadFromNBT = function(nbt) {
      console.log('loading from ' + nbt);
      $.extend(b.nbt, JSON.parse(nbt));
      if(typeof b.nbt['facing'] !== "undefined") {
        b.facing = b.nbt['facing'];
      }
    };
    
    b.hasNBT = function() {
      return ( !$.isEmptyObject(b.nbt) ) || b.getValidFacingDirections().length > 0;
    };
    
    if(typeof obj['nbt'] !== "undefined") {
      b.nbt = JSON.parse(JSON.stringify(obj['nbt']));
    }
    
    if(typeof obj.func === "function") { obj.func(b); }

  });
}