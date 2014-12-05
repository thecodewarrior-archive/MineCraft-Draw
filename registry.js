function Registry() {
  this.blocks = [];
  this.names = [];
  this.tabs = [];
  
  this.air = new Block(0, 0, function(b) { b.getTexture = function( side ) { return $(""); }; });
  
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
}

Registry.mods = [];
Registry.registerMod = function (mod) {
  Registry.mods.push(mod);
};
