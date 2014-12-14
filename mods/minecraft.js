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
    
    var block = Block.build( obj );
//    this.tab['minecraft_all_blocks'].add(block);
    return block;
  };
  
  this.basicItem = function (obj) {
    if(typeof obj['texF'] === "undefined") {
      obj['texF'] = this.tex;
    }
    obj['mod'] = this;
    var item = Item.build(obj);
    return item;
  }
  
  this.renderers = {
    rail: function(obj, nbt) {
      var railbed = $('<div class="mc-face railbed"></div>');
      railbed.append(m.tex(
        Block.texExec(obj['tex'], nbt)
      ));
      var set = railbed.add(m.renderers.ground(obj));
      return set;
    },
    X: function(obj, nbt) {
      var one = $('<div class="mc-face Xa"></div>');
      one.append(m.tex(
        Block.texExec(obj['tex'], nbt)
      ));
      var two = $('<div class="mc-face Xb"></div>');
      two.append(m.tex(
        Block.texExec(obj['tex'])
      ));
      var set = one.add(two).add(m.renderers.ground(obj));
      return set;
    },
    ground: function(obj) {
      var ground = $('<div class="mc-face ground"></div>');
      var gnd = Block.texExec(obj['ground']);
      if(typeof gnd === "undefined") {
        gnd = 'stone';
      }
      ground.append(m.tex(gnd));
      return ground;
    }
  }
  
  this.init = function(reg) {
    reg.langFolder(Main.root + "assets/minecraft/lang/", "minecraft");
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
        front:    'log_oak_top',
        sides:  'log_oak',
        back: 'log_oak_top'
      }, canFace: 'any', type: 'facing' },
      { id: 17, meta: 1, name: 'spruce_log', tex: {
        front:    'log_spruce_top',
        sides:  'log_spruce',
        back:   'log_spruce_top'
      }, canFace: 'any', type: 'facing' },
      { id: 17, meta: 2, name: 'birch_log', tex: {
        front:    'log_birch_top',
        sides:  'log_birch',
        back: 'log_birch_top'
      }, canFace: 'any', type: 'facing' },
      { id: 17, meta: 3, name: 'jungle_log', tex: {
        front:    'log_jungle_top',
        sides:  'log_jungle',
        back: 'log_jungle_top'
      }, canFace: 'any', type: 'facing' },
      
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
        icon:function(nbt) {
          if(nbt['power'] === true) {
            return 'rail_golden_powered';
          } else {
            return 'rail_golden';
          }
        },
        renderParam: {
          tex: function(nbt) {
            if(nbt['power'] === true) {
              return 'rail_golden_powered';
            } else {
              return 'rail_golden';
            }
          }
        },
        render: this.renderers.rail
      }, type:"customRender", nbt:{'power':false}, func: function(b) {
        b.getContextElements = function() {
          var power = $('<i></i>');
          power.addClass('fa');
          power.addClass('fa-plug');
          power.addClass('pointer');
          if(b.nbt['power'] === true) {
            power.addClass('context-item-active');
          }
          power.click(function() {
            b.nbt['power'] = !b.nbt['power'];
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
      
      { id: 33, meta: 0, name: 'piston', tex: {
        front: 'piston_top_normal',
        back: 'piston_bottom',
        sides: 'piston_side'
      }, canFace: 'any', type: 'facing'},
      
      { id: 34, meta: 0, name: 'piston_head', tex: {
        icon:'piston_top_normal',
        renderParam: {
          tex:'web'
        },
        render: this.renderers.X
      }, type:"customRender"},
      
      { id: 35, meta: 0 , name: 'wool_white', tex: 'wool_colored_white' },
      { id: 35, meta: 1 , name: 'wool_orange', tex: 'wool_colored_orange' },
      { id: 35, meta: 2 , name: 'wool_magenta', tex: 'wool_colored_magenta' },
      { id: 35, meta: 3 , name: 'wool_light_blue', tex: 'wool_colored_light_blue' },
      { id: 35, meta: 4 , name: 'wool_yellow', tex: 'wool_colored_yellow' },
      { id: 35, meta: 5 , name: 'wool_lime', tex: 'wool_colored_lime' },
      { id: 35, meta: 6 , name: 'wool_pink', tex: 'wool_colored_pink' },
      { id: 35, meta: 7 , name: 'wool_gray', tex: 'wool_colored_gray' },
      { id: 35, meta: 8 , name: 'wool_silver', tex: 'wool_colored_silver' },
      { id: 35, meta: 9 , name: 'wool_cyan', tex: 'wool_colored_cyan' },
      { id: 35, meta: 10, name: 'wool_purple', tex: 'wool_colored_purple' },
      { id: 35, meta: 11, name: 'wool_blue', tex: 'wool_colored_blue' },
      { id: 35, meta: 12, name: 'wool_brown', tex: 'wool_colored_brown' },
      { id: 35, meta: 13, name: 'wool_green', tex: 'wool_colored_green' },
      { id: 35, meta: 14, name: 'wool_red', tex: 'wool_colored_red' },
      { id: 35, meta: 15, name: 'wool_black', tex: 'wool_colored_black' },
      
      
    ];
    
    for(var i in this.blocksTemplates) {
      var blockObj = this.blocksTemplates[i];
      var b = this.basicBlock(blockObj);
      var item = Item.itemBlock(b);
      reg.registerBlock(b);
      reg.registerItem(item);
    }
  
    this.itemTemplates = [
      {id: 6, meta: 0, name: 'oak_sapling', tex: 'sapling_oak'},
      {id: 6, meta: 1, name: 'spruce_sapling', tex: 'sapling_spruce'},
      {id: 6, meta: 2, name: 'birch_sapling', tex: 'sapling_birch'},
      {id: 6, meta: 3, name: 'jungle_sapling', tex: 'sapling_jungle'},
      {id: 6, meta: 4, name: 'acacia_sapling', tex: 'sapling_acacia'},
      {id: 6, meta: 5, name: 'dark_oak_sapling', tex: 'sapling_roofed_oak'},
      
    ];


    for(var i in this.itemTemplates) {
      var itemObj = this.itemTemplates[i];
      var item = this.basicItem(itemObj);
      reg.registerItem(item);
    }
  }
  
  
  
  Registry.registerMod(this);
}

this.mods['minecraft'] = new ModMinecraft();