function ModMinecraft() {
  
  var m = this;
  this.name = "minecraft";
  
  this.r = function(name, type) {
    if (typeof type === "undefined") {
      return Main.root + "assets/minecraft/textures/blocks/" + name + ".png";
    }
  }
  
  this.tex = function(name, type) {
    var elem = $('<img></img>');
    elem.addClass('full');
    elem.attr('src', m.r(name));
    return elem;
  };
  
  this.basicBlock = function( obj ) {
    if(typeof obj['texF'] === "undefined") {
      obj['texF'] = this.tex;
    }
    obj['mod'] = this;
    
    return Block.build( obj );
  };
  
  this.renderers = {
    rail: function(obj) {
      var railbed = $('<div class="mc-face railbed"></div>');
      railbed.append(m.tex(obj['tex']));
      var set = railbed.add(m.renderers.ground(obj));
      return set;
    },
    X: function(obj) {
      var one = $('<div class="mc-face Xa"></div>');
      one.append(m.tex(obj['tex']));
      var two = $('<div class="mc-face Xb"></div>');
      two.append(m.tex(obj['tex']));
      var set = one.add(two).add(m.renderers.ground(obj));
      return set;
    },
    ground: function(obj) {
      var ground = $('<div class="mc-face ground"></div>');
      var gnd = obj['ground'];
      if(typeof obj['ground'] === "undefined") {
        gnd = 'stone';
      }
      ground.append(m.tex(gnd));
      return ground;
    }
  }
  
  this.init = function(reg) {
    reg.addLang(Main.root + "assets/minecraft/lang/en_US.lang", "minecraft");
    /** 
      Basic  { id: 0, meta: 0, name: 'stone', tex: 'stone', (func: function(b) {}) }
      
      Static { id: 0, meta: 0, name: 'stone', tex: {
        top:    'loc',
        bottom: 'loc',
        north:  'loc',
        south:  'loc',
        east:   'loc',
        west:   'loc'
      }, type: 'static', (func: function(b) {}) }
      
      Sides-Top-Bottom { id: 0, meta: 0, name: 'stone', tex: {
        top:    'loc',
        sides:  'loc',
        bottom: 'loc'
      }, type: 'stb', (func: function(b) {}) }
      
      Facing { id: 0, meta: 0, name: 'stone', tex: {
        front: 'loc',
        back: 'loc',
        side(s): 'loc',
        ( left/right/top/bottom: 'loc' )
      }, type: 'facing', (func: function(b) {}) }
      
      Custom Render: { id: 0, meta: 0, name: 'stone', tex: {
        icon:'stone',
        renderParam: {
          tex:'stone'
        },
        render: this.renderers.something
      }, type:"customRender"},
      
      any can have a fixed: attr with top, bottom, north, south, east, west properties containing locations of those faces
      any can have validDirections property, which is the string 'any' or an array conaining up to one of each of the following
        'up', 'down', 'north', 'south', 'east', 'west', they can be in any order, but must be in same case
      */
    this.blocksTemplates = [
      { id: 1, meta: 0, name: 'stone', tex: 'stone' },
      { id: 1, meta: 1, name: 'granite', tex: 'stone_granite' },
      { id: 1, meta: 2, name: 'granite_smooth', tex: 'stone_granite_smooth' },
      { id: 1, meta: 3, name: 'diorite', tex: 'stone_diorite' },
      { id: 1, meta: 4, name: 'diorite_smooth', tex: 'stone_diorite_smooth' },
      { id: 1, meta: 5, name: 'andesite', tex: 'stone_andesite' },
      { id: 1, meta: 6, name: 'andesite_smooth', tex: 'stone_andesite_smooth' },
      
      { id: 2, meta: 0, name: 'grass', tex: {
        top:    'grass_top_green',
        sides:  'grass_side',
        bottom: 'dirt'
      }, type: 'stb'},
      { id: 3, meta: 0, name: 'dirt', tex: 'dirt' },
      { id: 3, meta: 1, name: 'coarse_dirt', tex: 'coarse_dirt' },
      { id: 3, meta: 2, name: 'podzol', tex: {
        top:    'dirt_podzol_top',
        sides:  'dirt_podzol_side',
        bottom: 'dirt'
      }, type: 'stb'},
      { id: 4, meta: 0, name: 'cobblestone', tex: 'cobblestone' },
      
      { id: 5, meta: 0, name: 'oak_planks', tex: 'planks_oak' },
      { id: 5, meta: 1, name: 'spruce_planks', tex: 'planks_spruce' },
      { id: 5, meta: 2, name: 'birch_planks', tex: 'planks_birch' },
      { id: 5, meta: 3, name: 'jungle_planks', tex: 'planks_jungle' },
      { id: 5, meta: 4, name: 'acacia_planks', tex: 'planks_acacia' },
      { id: 5, meta: 5, name: 'dark_oak_planks', tex: 'planks_big_oak' },
      
      { id: 7, meta: 0, name: 'bedrock', tex: 'bedrock' },
      
      { id: 8, meta: 0, name: 'flowing_water', tex: 'water' },
      { id: 9, meta: 0, name: 'still_water', tex: 'water' },
      { id: 10, meta: 0, name: 'flowing_lava', tex: 'lava' },
      { id: 11, meta: 0, name: 'still_lava', tex: 'lava' },
      
      { id: 12, meta: 0, name: 'sand', tex: 'sand' },
      { id: 12, meta: 1, name: 'red_sand', tex: 'red_sand' },
      { id: 13, meta: 0, name: 'gravel', tex: 'gravel' },
      
      { id: 14, meta: 0, name: 'gold_ore', tex: 'gold_ore' },
      { id: 15, meta: 0, name: 'iron_ore', tex: 'iron_ore' },
      { id: 16, meta: 0, name: 'coal_ore', tex: 'coal_ore' },
      
      { id: 17, meta: 0, name: 'oak_log', tex: {
        top:    'log_oak_top',
        sides:  'log_oak',
        bottom: 'log_oak_top'
      }, type: 'stb' },
      { id: 17, meta: 1, name: 'spruce_log', tex: {
        top:    'log_spruce_top',
        sides:  'log_spruce',
        bottom: 'log_spruce_top'
      }, type: 'stb' },
      { id: 17, meta: 2, name: 'birch_log', tex: {
        top:    'log_birch_top',
        sides:  'log_birch',
        bottom: 'log_birch_top'
      }, type: 'stb' },
      { id: 17, meta: 3, name: 'jungle_log', tex: {
        top:    'log_jungle_top',
        sides:  'log_jungle',
        bottom: 'log_jungle_top'
      }, type: 'stb' },
      
      { id: 18, meta: 0, name: 'oak_leaves', tex: 'leaves_oak_green' },
      { id: 18, meta: 1, name: 'spruce_leaves', tex: 'leaves_spruce_green' },
      { id: 18, meta: 2, name: 'birch_leaves', tex: 'leaves_birch_green' },
      { id: 18, meta: 3, name: 'jungle_leaves', tex: 'leaves_jungle_green' },
      
      { id: 19, meta: 0, name: 'sponge', tex: 'sponge' },
      { id: 19, meta: 1, name: 'wet_sponge', tex: 'sponge_wet' },
      
      { id: 20, meta: 0, name: 'glass', tex: 'glass' },
      
      { id: 21, meta: 0, name: 'lapis_ore', tex: 'lapis_ore' },
      { id: 22, meta: 0, name: 'lapis_block', tex: 'lapis_block' },
      
      { id: 23, meta: 0, name: 'dispenser', tex: {
        front: 'dispenser_front_horizontal',
        back: 'furnace_side',
        sides: 'furnace_side',
        top: 'furnace_top',
        bottom: 'furnace_top',
        level: true
      }, canFace: 'any', type: 'facing' },
      
      { id: 24, meta: 0, name: 'sandstone', tex: {
        top:    'sandstone_top',
        sides:  'sandstone_normal',
        bottom: 'sandstone_bottom'
      }, type: 'stb' },
      { id: 24, meta: 1, name: 'chiseled_sandstone', tex: {
        top:    'sandstone_top',
        sides:  'sandstone_carved',
        bottom: 'sandstone_bottom'
      }, type: 'stb' },
      { id: 24, meta: 2, name: 'smooth_sandstone', tex: {
        top:    'sandstone_top',
        sides:  'sandstone_smooth',
        bottom: 'sandstone_top'
      }, type: 'stb' },
      
      { id: 25, meta: 0, name: 'noteblock', tex: 'noteblock' },
      
      { id: 27, meta: 0, name: 'powered_rail', tex: {
        icon:'rail_golden',
        renderParam: {
          tex: 'rail_golden'
        },
        render: this.renderers.rail
      }, type:"customRender", func: function(b) {
        b.getContextElements = function() {
          var power = $('<i></i>');
          power.addClass('fa');
          power.addClass('fa-plug');
          power.addClass('pointer');
          if(b.paramObj.tex.icon === 'rail_golden_powered') {
            power.addClass('context-item-active');
          }
          power.click(function() {
            if(b.paramObj.tex.icon === 'rail_golden') {
              b.paramObj.tex.icon = 'rail_golden_powered';
              b.renderParam.tex = 'rail_golden_powered';
            } else {
              b.paramObj.tex.icon = 'rail_golden';
              b.renderParam.tex = 'rail_golden';
            }
            b.updateTextures();
          });
          return [power];
        };
        
      }},
      
      { id: 28, meta: 0, name: 'detector_rail', tex: {
        icon:'rail_detector',
        renderParam: {
          tex:'rail_detector'
        },
        render: this.renderers.rail
      }, type:"customRender"},
      
      { id: 29, meta: 0, name: 'sticky_piston', tex: {
        front: 'piston_top_sticky',
        back: 'piston_bottom',
        sides: 'piston_side'
      }, canFace: 'any', type: 'facing'},
      
      { id: 30, meta: 0, name: 'web', tex: {
        icon:'web',
        renderParam: {
          tex:'web'
        },
        render: this.renderers.X
      }, type:"customRender"},
      
      { id: 31, meta: 0, name: 'shrub', tex: {
        icon:'deadbush',
        renderParam: {
          tex:'deadbush',
          ground:'grass_top_green'
        },
        render: this.renderers.X
      }, type:"customRender"},
    ];
    for(var i in this.blocksTemplates) {
      var blockObj = this.blocksTemplates[i];
      var b = this.basicBlock(blockObj);
      reg.registerBlock(b);
    }
  }
  
  
  
  
  Registry.registerMod(this);
}

this.mods['minecraft'] = new ModMinecraft();

/*


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
    
    var dispenser = Block.build(23, 0, 'minecraft:dispenser', {
      facing:true, sides:'furnace_side', front:'dispenser_front', back:'furnace_side',
      fixed: {
        top: 'furnace_top',
        bottom: 'furnace_bottom'
      }
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







*/