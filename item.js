function Item(id, meta, init) {
  this.getTexture = function() {
    
  };
  
  this.id = id;
  this.meta = meta;
  
  this.maxDamage = 0;
  this.itemDamage = 0;
  this.damageBar = false;
  
  this.getUnlocalizedName = function() { return "" }
  
  init(this);
  
  this.id = id;
  this.meta = meta;
  this.init = init;
  
}

Item.itemBlock = function(b, func) {
  
  return new Item(b.id, b.meta, function(i) {
    i.block = b;
    i.getUnlocalizedName = function() {
      return b.getUnlocalizedName();
    };
    i.getTexture = function() {
      var cube = $($("#3d-cube").html());
      cube.addClass('item');
      Main.instance.redraw3DTexture(b, cube);
      var persp = $('<div></div>');
      persp.addClass('item').addClass('persp');
      persp.append(cube);
      return persp;
    }
    
    if(typeof func === "function") func();
  });
  
};

Item.build = function(obj, func) {
  return new Item(obj['id'], obj['meta'], function(i) {
    var texF = function() {
      var r = $('<img></img>');
      r.attr('src', Main.root + "assets/unknown.png");
      return r;
    }

    if(typeof obj['texF'] === "function") {
      texF = function(tex) {
        var t = Block.texExec(tex, i.nbt);

        return obj['texF'](t);
      }
    }
    
    i.nbt = {};
    
    i.getTexture = function() {
      texF(obj['tex']);
    }
    
    i.getUnlocalizedName = function() { return obj.mod.name + ":" + obj.name; }
    
    i.maxDamage = 0;
    i.itemDamage = 0;
    i.damageBar = false;
    if(typeof obj['max'] !== "undefined") { i.maxDamage  =   obj['max'] }
    if(typeof obj['cur'] !== "undefined") { i.itemDamage =   obj['cur'] }
    if(typeof obj['bar'] !== "undefined") { i.damageBar  = !!obj['bar'] }
  });
};