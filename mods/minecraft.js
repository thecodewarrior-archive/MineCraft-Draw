function ModMinecraft() {
  
  var m = this;
  
  this.r = function(name, type) {
    if (typeof type === "undefined") {
      return Main.root + "assets/minecraft/textures/blocks/" + name + ".png";
    }
  }
  
  this.t = function(name, type) {
    return function(side) {
      return m.tex(name, type);
    };
  }
  
  this.tex = function(name, type) {
    var elem = $('<img></img>');
    elem.attr('src', m.r(name));
    return elem;
  };
  
  this.basicBlock = function( id, meta, tex, name, func ) {
    return new Block(id, meta, function(b) {
      b.getTexture = m.t(tex);
      b.setUnlocalizedName(name);
      if(typeof func !== "undefined") { func(b); }
    });
  }
  
  this.sideTopBottom = function( id, meta, name, obj, func ) {
    return new Block(id, meta, function(b) {
      b.getTexture = function(side) {
        if(obj['facing'] === true) {
          var f = b.sideFacing(side);
          
          if(f == Block.FRONT) {
            return m.tex(obj['front']);
          }
          if(f == Block.LEFT || f == Block.RIGHT || f == Block.TOP || f == Block.BOTTOM) {
            var t = obj['sides'];
            if(typeof obj['sides'] === "undefined") {
              t = obj['side']
            }
            t = m.tex(t);
            var rot = 0;
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
              if(Coord.isTop(side) || Coord.isBottom(side)) {
                rot = 0;
              }
              if(side === Coord.NORTH) {
                rot = -90
              }
              if(side === Coord.SOUTH) {
                rot = 90;
              }
            }
            if(b.facing === Coord.EAST) {
              if(Coord.isTop(side) || Coord.isBottom(side)) {
                rot = 0;
              }
              if(side === Coord.SOUTH) {
                rot = -90
              }
              if(side === Coord.NORTH) {
                rot = 90;
              }
            }
            if(b.facing === Coord.SOUTH) {
              if(Coord.isTop(side) || Coord.isBottom(side)) {
                rot = 0;
              }
              if(side === Coord.EAST) {
                rot = -90
              }
              if(side === Coord.WEST) {
                rot = 90;
              }
            }
            t.css('-webkit-transform', 'rotate(' + rot + 'deg)');
            return t;
          }
          if(f == Block.BACK) {
            return m.tex(obj['back']);
          }
          
        } else {
          
          if(Coord.isTop(side)) {
            return m.tex(obj['top']);
          }
          if(Coord.isSide(side)) {
            var t = obj['sides'];
            if(typeof obj['sides'] === "undefined") {
              t = obj['side']
            }
            return m.tex(t);
          }
          if(Coord.isBottom(side)) {
            return m.tex(obj['bottom']);
          }
          
        }
      };
      
      b.setUnlocalizedName(name);
      
      if(typeof func !== "undefined") { func(b); }
      
    });
  }
  
  this.init = function(reg) {
    var stone = this.basicBlock( 1, 0, 'stone', 'minecraft:stone');
    reg.registerBlock(stone);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var grass = new Block(2, 0, function(b) {
      b.getTexture = function(side) {
        if( Coord.isTop(side)    ) {
          return m.tex('grass_top_green');
        }
        if( Coord.isSide(side)   ) {
          return m.tex('grass_side');
        }
        if( Coord.isBottom(side) ) {
          return m.tex('dirt');
        }
      };
      b.setUnlocalizedName('minecraft:grass');
    });
    reg.registerBlock(grass);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var dirt = this.basicBlock(3, 0, 'dirt', 'minecraft:dirt');
    reg.registerBlock(dirt);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var coarse_dirt = this.basicBlock(3, 1, 'coarse_dirt', 'minecraft:coarse_dirt');
    reg.registerBlock(coarse_dirt);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var podzol = new Block(3, 2, function(b) {
      b.getTexture = function(side) {
        if( Coord.isTop(side) ) {
          return m.tex('dirt_podzol_top');
        }
        if( Coord.isSide(side) ) {
          return m.tex('dirt_podzol_side');
        }
        if( Coord.isBottom(side) ) {
          return m.tex('dirt');
        }
      };
      b.setUnlocalizedName('minecraft:podzol');
      
    });
    reg.registerBlock(podzol);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var cobble = this.basicBlock(4, 0, 'cobblestone', 'minecraft:stone');
    reg.registerBlock(cobble);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var oak_plank = this.basicBlock(5, 0, 'planks_oak', 'minecraft:plank_oak');
    reg.registerBlock(oak_plank);
    
    var spruce_plank = this.basicBlock(5, 1, 'planks_spruce', 'minecraft:plank_spruce');
    reg.registerBlock(spruce_plank);
    
    var birch_plank = this.basicBlock(5, 2, 'planks_birch', 'minecraft:plank_birch');
    reg.registerBlock(birch_plank);
    
    var jungle_plank = this.basicBlock(5, 3, 'planks_jungle', 'minecraft:plank_jungle');
    reg.registerBlock(jungle_plank);
    
    var acacia_plank = this.basicBlock(5, 4, 'planks_acacia', 'minecraft:plank_acacia');
    reg.registerBlock(acacia_plank);
    
    var dark_oak_plank = this.basicBlock(5, 5, 'planks_big_oak', 'minecraft:plank_dark_oak');
    reg.registerBlock(dark_oak_plank);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var bedrock = this.basicBlock(7, 0, 'bedrock', 'minecraft:bedrock');
    reg.registerBlock(bedrock);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var water = this.basicBlock(8, 0, 'water', 'minecraft:water');
    reg.registerBlock(water);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var lava = this.basicBlock(11, 0, 'lava', 'minecraft:lava');
    reg.registerBlock(lava);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var sand = this.basicBlock(12, 0, 'sand', 'minecraft:sand');
    reg.registerBlock(sand);
    
    var red_sand = this.basicBlock(12, 1, 'red_sand', 'minecraft:red_sand');
    reg.registerBlock(red_sand);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var gravel = this.basicBlock(13, 0, 'gravel', 'minecraft:gravel');
    reg.registerBlock(gravel);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var ore_gold = this.basicBlock(14, 0, 'gold_ore', 'minecraft:gold_ore');
    reg.registerBlock(ore_gold);
    
    var ore_iron = this.basicBlock(15, 0, 'iron_ore', 'minecraft:iron_ore');
    reg.registerBlock(ore_iron);
    
    var ore_coal = this.basicBlock(16, 0, 'coal_ore', 'minecraft:coal_ore');
    reg.registerBlock(ore_coal);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var log = function(meta, type) {
      return new Block(17, meta, function(b) {
        b.getTexture = function(side) {
          if(Coord.isTop(side) || Coord.isBottom(side)) {
            return m.tex('log_' + type + '_top');
          }
          if(Coord.isSide(side)) {
            return m.tex('log_' + type);
          }
        };
        
        b.setUnlocalizedName('minecraft:log_' + type);
      });
    };
    
    var log_oak = log(0, 'oak');
    reg.registerBlock(log_oak);
    
    var log_spruce = log(1, 'spruce');
    reg.registerBlock(log_spruce);
    
    var log_birch = log(2, 'birch');
    reg.registerBlock(log_birch);
    
    var log_jungle = log(3, 'jungle');
    reg.registerBlock(log_jungle);
    
    var log_acacia = log(4, 'acacia');
    reg.registerBlock(log_acacia);
    
    var log_big_oak = log(5, 'big_oak');
    reg.registerBlock(log_big_oak);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var leaves = this.basicBlock(18, 0, 'leaves', 'minecraft:leaves');
    reg.registerBlock(leaves);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var sponge = this.basicBlock(19, 0, 'sponge', 'minecraft:sponge');
    reg.registerBlock(sponge);
    
    var sponge_wet = this.basicBlock(19, 1, 'sponge_wet', 'minecraft:sponge_wet');
    reg.registerBlock(sponge_wet);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var glass = this.basicBlock(20, 0, 'glass', 'minecraft:glass');
    reg.registerBlock(glass);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var ore_lapis = this.basicBlock(21, 0, 'lapis_ore', 'minecraft:lapis_ore');
    reg.registerBlock(ore_lapis);
    
    var lapis_block = this.basicBlock(22, 0, 'lapis_block', 'minecraft:lapis_block');
    reg.registerBlock(lapis_block);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var dispenser = new Block(23, 0, function(b) {
      b.getTexture = function(side) {
        if(side == b.sideFacing(Block.FRONT)) {
          return m.tex('dispenser_front');
        }
        if(side == b.sideFacing(Block.LEFT) || side == b.sideFacing(Block.RIGHT) || side == b.sideFacing(Block.BACK)) {
          return m.tex('furnace_side');
        }
        if(side == b.sideFacing(Block.TOP) || side == b.sideFacing(Block.BOTTOM)) {
          return m.tex('furnace_top');
        }
      };
      
      b.setUnlocalizedName('minecraft:dispenser');
      
    });
    reg.registerBlock(dispenser);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var sandstone = this.sideTopBottom(24, 0, 'minecraft:sandstone', {
      sides:'sandstone_normal', top:'sandstone_top', bottom:'sandstone_bottom' });
    reg.registerBlock(sandstone);
    
    var chiseled_sandstone = this.sideTopBottom(24, 1, 'minecraft:chiseled_sandstone', {
      sides:'sandstone_carved', top:'sandstone_top', bottom:'sandstone_bottom'});
    reg.registerBlock(chiseled_sandstone);
    
    var smooth_sandstone = this.sideTopBottom(24, 2, 'minecraft:smooth_sandstone', {
      sides:'sandstone_smooth', top:'sandstone_top', bottom:'sandstone_bottom'});
    reg.registerBlock(smooth_sandstone);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var noteblock = this.basicBlock(25, 0, 'noteblock', 'minecraft:noteblock');
    reg.registerBlock(noteblock);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var powered_rail = this.basicBlock(27, 0, 'rail_golden', 'minecraft:golden_rail');
    reg.registerBlock(powered_rail);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var detector_rail = this.basicBlock(28, 0, 'rail_detector', 'minecraft:detector_rail');
    reg.registerBlock(detector_rail);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var sticky_piston = this.sideTopBottom(33, 0, 'minecraft:sticky_piston', {
      facing:true, sides:'piston_side', front:'piston_top_sticky', back:'piston_bottom'});
    reg.registerBlock(sticky_piston);
    
    var piston = this.sideTopBottom(33, 1, 'minecraft:piston', {
      facing:true, sides:'piston_side', front:'piston_top_normal', back:'piston_bottom'
    }, function(b) {
      b.getEditScreen = function() {
        var elem = $('<div></div>');
        elem.append($('<h3>Piston</h3>'));
        return elem;
      };
      
      
    });
    
    reg.registerBlock(piston);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var cobweb = this.basicBlock(30, 0, 'web', 'minecraft:web');
    reg.registerBlock(cobweb);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var dead_bush = this.basicBlock(31, 0, 'deadbush', 'minecraft:dead_bush');
    reg.registerBlock(dead_bush);
    
    var tall_grass = this.basicBlock(31, 1, 'tallgrass', 'minecraft:tall_grass');
    reg.registerBlock(tall_grass);
    
    var fern = this.basicBlock(31, 2, 'fern', 'minecraft:fern');
    reg.registerBlock(fern);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var piston_head = this.basicBlock(34, 0, 'piston_head', 'minecraft:piston_head', function(b) { b.obtainable = false; } );
    reg.registerBlock(piston_head);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var wools = [
      'white',
      'orange',
      'magenta',
      'light_blue',
      'yellow',
      'lime',
      'pink',
      'gray',
      'silver',
      'cyan',
      'purple',
      'blue',
      'brown',
      'green',
      'red',
      'black'
    ]
    var i;
    for(i in wools) {
      var wool = this.basicBlock(35, i, 'wool_colored_' + wools[i], 'minecraft:wool_' + wools[i]);
      reg.registerBlock(wool);
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var dandelion = this.basicBlock(37, 0, 'flower_dandelion', 'minecraft:dandelion');
    reg.registerBlock(dandelion);
    
    var poppy = this.basicBlock(38, 0, 'flower_rose', 'minecraft:poppy');
    reg.registerBlock(poppy);
    
    var blue_orchid = this.basicBlock(38, 1, 'flower_blue_orchid', 'minecraft:blue_orchid');
    reg.registerBlock(blue_orchid);
    
    var allium = this.basicBlock(38, 2, 'flower_allium', 'minecraft:allium');
    reg.registerBlock(allium);
    
    var azure_bluet = this.basicBlock(38, 3, 'flower_houstonia', 'minecraft:azure_bluet');
    reg.registerBlock(azure_bluet);
    
    var tulip_red = this.basicBlock(38, 4, 'flower_tulip_red', 'minecraft:tulip_red');
    reg.registerBlock(tulip_red);
    
    var tulip_orange = this.basicBlock(38, 5, 'flower_tulip_orange', 'minecraft:tulip_orange');
    reg.registerBlock(tulip_orange);
    
    var tulip_white = this.basicBlock(38, 6, 'flower_tulip_white', 'minecraft:tulip_white');
    reg.registerBlock(tulip_white);
    
    var tulip_pink = this.basicBlock(38, 7, 'flower_tulip_pink', 'minecraft:tulip_pink');
    reg.registerBlock(tulip_pink);
    
    var oxeye_daisy = this.basicBlock(38, 8, 'flower_oxeye_daisy', 'minecraft:oxeye_daisy');
    reg.registerBlock(oxeye_daisy);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var mushroom_brown = this.basicBlock(39, 0, 'mushroom_brown', 'minecraft:mushroom_brown');
    reg.registerBlock(mushroom_brown);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var mushroom_red = this.basicBlock(40, 0, 'mushroom_red', 'minecraft:mushroom_red');
    reg.registerBlock(mushroom_red);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var gold_block = this.basicBlock(41, 0, 'gold_block', 'minecraft:gold_block');
    reg.registerBlock(gold_block);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var iron_block = this.basicBlock(42, 0, 'iron_block', 'minecraft:iron_block');
    reg.registerBlock(iron_block);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var stone_slab = this.sideTopBottom(43, 0, 'minecraft:stone_slab', {
      top:'stone_slab_top', bottom:'stone_slab_top', sides:'stone_slab_side'} );
    reg.registerBlock(stone_slab);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var sandstone_slab = this.sideTopBottom(43, 0, 'minecraft:sandstone_slab', {
      sides:'sandstone_normal', top:'sandstone_top', bottom:'sandstone_bottom'});
    reg.registerBlock(sandstone_slab);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _ = this.basicBlock(-1, 0, '_', 'minecraft:_');
    reg.registerBlock(_);
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
  }
  
  
  
  
  Registry.registerMod(this);
}

this.mods['minecraft'] = new ModMinecraft();