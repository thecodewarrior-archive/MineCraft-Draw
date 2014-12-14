if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

function Registry() {
  this.blocks = [];
  this.items = [];
  this.names = [];
  this.tabs = [];
  this.lang = {};
  this.langFolders = [];
  
  var r = this;
  this.air = new Block(0, 0, function(b) {
    b.getTexture = function( side ) { return $(""); }; 
    b.getUnlocalizedName = function() { return "minecraft:air" };
  });
  
  // region items
  this.registerItem = function (item) {
    console.log('registered item: ' + item.getUnlocalizedName());
    if (typeof this.items[item.id] === "undefined") {
      this.items[item.id] = [];
    }
    this.items[item.id][item.meta] = item;
  };
  
  this.eachItem = function(f) {
    $.each(this.items, function(id, o) {
      if(typeof o !== "undefined") {
        $.each(o, function(meta, item) {
          if(typeof item !== "undefined") {
            f(id, meta, item);
          }
        });
      }
    });
  };
  
  this.newItem = function(id, meta) {
    return this.blocks[id][meta].dup();
  };
  // endregion
  
  // region blocks
  this.registerBlock = function (block) {
    console.log('registered: ' + block.getUnlocalizedName());
    if (typeof this.blocks[block.id] === "undefined") {
      this.blocks[block.id] = [];
    }
    this.blocks[block.id][block.meta] = block;
  };
  
  this.eachBlock = function(f) {
    $.each(this.blocks, function(id, o) {
      if(typeof o !== "undefined") {
        $.each(o, function(meta, block) {
          if(typeof block !== "undefined" && block.obtainable) {
            f(id, meta, block);
          }
        });
      }
    });
  };
  
  this.newBlock = function(id, meta) {
    return this.blocks[id][meta].dup();
  };
  
  // endregion 
  
  this.registerName = function (block, name) {
    this.names[block.id] = this.names[block.id] || [];
    this.names[block.id][block.metadata] = name;
  };
  
  this.registerTab = function (tab) {
    this.tabs.push(tab);
  };
  
  this.runMods = function () {
    var reg = this;
    console.groupCollapsed("Running Mods");
    $.each(Registry.mods, function (i, o) {
      console.groupCollapsed("mod: " + o.name);
      o.init(reg);
      console.groupEnd();
    });
    console.groupEnd();
  };
  
  this.langFolder = function(folder, modname) {
    this.langFolders.push([folder, modname]);
  };
  
  this.loadLanguages = function(locale) {
    $.each(this.langFolders, function( i, o ) {
      r.addLang(o[0] + locale + ".lang", o[1]);
    });
  };
  
  this.addLang = function(langfile, modname) {
    $.get(langfile,"",function(data,status,jqXHR) {
      var resp = data.split("\n");
      $.each(resp, function(i, o) {
        if(!o.startsWith('--')) {
          var s = o.split(':');
          var key = s.shift();
          var value = s.join(':');
          r.lang[modname + ":" + key] = value.trim();
        }
      });
    });
  };
}

Registry.mods = [];
Registry.registerMod = function (mod) {
  Registry.mods.push(mod);
};