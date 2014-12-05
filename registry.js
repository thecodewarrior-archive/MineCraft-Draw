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
    console.log(this.blocks);
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
    $.each(Registry.mods, function (i, o) {
      o.init(reg);
    });
  };
}

Registry.mods = [];
Registry.registerMod = function (mod) {
  console.log('registering mod');
  Registry.mods.push(mod);
};
