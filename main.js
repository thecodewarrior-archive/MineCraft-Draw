this.mods = []; // just a place to dump mods

function Main() {
  this.registry = new Registry();
  this.registry.runMods();
  this.world = new World(this.registry);
  this.view = {};
  
  this.editing = null;
  
  this.view.x = -5;
  this.view.y = -5;
  this.view.z = 0;
  this.view.w = 10;
  this.view.h = 10;
  
  var m = this;
  
  this.currentLayer = 0;
  
  this.selected = this.registry.air
  
  
  this.redrawTexture = function(cell) {
    var x = cell.data('x');
    var y = cell.data('y');
    var z = cell.data('z');
    
    var b = m.world.getBlock(x,y,z)
    var tex = b.getTexture(Coord.UP);
    
    cell.html(tex);
  };
  
  this.redrawEditorTexture = function() {
    var b = this.editing;
    $('#cube .face').html('');
    $('#cube .custom').html('');
    if(b.hasCustom3DRenderer()) {
      $('#cube .custom').html(b.getCustom3DRenderer(true));
    } else {
      var ctx;
      
      ctx = $('#cube .face.north' )[0].getContext('2d');
      ctx.clearRect ( 0 , 0 , ctx.width, ctx.height );
      b.getTexture(Coord.NORTH, ctx);
      
      ctx = $('#cube .face.south' )[0].getContext('2d');
      ctx.clearRect ( 0 , 0 , ctx.width, ctx.height );
      b.getTexture(Coord.SOUTH, ctx);
      
      ctx = $('#cube .face.east'  )[0].getContext('2d');
      ctx.clearRect ( 0 , 0 , ctx.width, ctx.height );
      b.getTexture(Coord.EAST , ctx);
      
      ctx = $('#cube .face.west'  )[0].getContext('2d');
      ctx.clearRect ( 0 , 0 , ctx.width, ctx.height );
      b.getTexture(Coord.WEST , ctx);
      
      ctx = $('#cube .face.top'   )[0].getContext('2d');
      ctx.clearRect ( 0 , 0 , ctx.width, ctx.height );
      b.getTexture(Coord.UP   , ctx);
      
      ctx = $('#cube .face.bottom')[0].getContext('2d');
      ctx.clearRect ( 0 , 0 , ctx.width, ctx.height );
      b.getTexture(Coord.DOWN , ctx);
    }
    
  }
  
  this.redrawSelector = function() {
    var sel = $('<div></div>');
    
    sel.attr('id', 'selector');
    
    //var m = this;
    
    var air_div = $('<div></div>');
    var air_img = $('<img></img>');
    
    air_img.attr('src', Main.root + "assets/minecraft/textures/" + 'eraser' + ".png");
    
    air_div.html(air_img);
    air_div.data('id', 0);
    air_div.data('meta', 0);
    air_div.addClass('selector-item-air');
    
    sel.append(air_div);
    
    this.registry.eachBlock(function( id, meta, block ) {

      var itm = $('<div></div>');

      itm.addClass('selector-item');

      itm.data('id', id);
      itm.data('meta', meta);
      
      itm.html(block.getTexture(Coord.UP));

      sel.append(itm);
    });
    
    $('#selector').replaceWith(sel);
  }
  
  this.redrawGrid = function() {
    var grid = $("#grid");
    grid.html("");
    //var m = this;
    if(this.view.x < 0 && this.view.y < 0) {
      var center = $('<div></div>');
    
      center.addClass('center');
    
      center.css('left', '' + (-17 * this.view.y - 5) );
      center.css('top', '' + (-17 * this.view.x  - 5) );
      grid.append(center);
    }
    
    for(var x = this.view.x; x < (this.view.x + this.view.w); x += 1) {
      var row = $('<div></div>');
      row.addClass('grid-row');
      for(var y = this.view.y; y < (this.view.y + this.view.h); y += 1) {
        var cell = $('<div></div>');
        cell.addClass('grid-cell');
        cell.data('x', x);
        cell.data('y', y);
        cell.data('z', m.view.z);
        cell.addClass('cell-coord_' + x + '_' + y + '_' + m.view.z);
        m.redrawTexture(cell);
        row.append(cell);
      }
      grid.append(row);
    }
  };
  
  this.registerOnceEvents = function() {
    $('body').mouseup(function() {
      m.ismousedown = false;
    });
    
    $('#start-facing-select').click(function(evt) {
      var valid = m.editing.getValidFacingDirections();
      console.log(valid);
      if($.inArray(Coord.NORTH, valid)!==-1) {
        $('.face.north').addClass('selectable');
      } else {
        $('.face.north').addClass('not-selectable'); }
      
      if($.inArray(Coord.SOUTH, valid)!==-1) {
        $('.face.south').addClass('selectable');
      } else {
        $('.face.south').addClass('not-selectable'); }
      
      if($.inArray(Coord.EAST, valid)!==-1) {
        $('.face.east').addClass('selectable');
      } else {
        $('.face.east').addClass('not-selectable'); }
      
      if($.inArray(Coord.WEST, valid)!==-1) {
        $('.face.west').addClass('selectable');
      } else {
        $('.face.west').addClass('not-selectable'); }
      
      if($.inArray(Coord.UP, valid)!==-1) {
        $('.face.top').addClass('selectable');
      } else {
        $('.face.top').addClass('not-selectable'); }
      
      if($.inArray(Coord.DOWN, valid)!==-1) {
        $('.face.bottom').addClass('selectable');
      } else {
        $('.face.bottom').addClass('not-selectable'); }
      
    });
    
    $('#cube').on('click','.face.selectable', function(evt) {
      var elem = $(this);
      if(elem.hasClass('north' )) { m.editing.facing = Coord.NORTH; }
      if(elem.hasClass('south' )) { m.editing.facing = Coord.SOUTH; }
      if(elem.hasClass('east'  )) { m.editing.facing = Coord.EAST;  }
      if(elem.hasClass('west'  )) { m.editing.facing = Coord.WEST;  }
      if(elem.hasClass('top'   )) { m.editing.facing = Coord.UP;    }
      if(elem.hasClass('bottom')) { m.editing.facing = Coord.DOWN;  }
      $('.face').removeClass('selectable');
      $('.face').removeClass('not-selectable');
      m.redrawEditorTexture();
    });
    
    $('#cube').on('click','.face.not-selectable', function(evt) {
      $('.face').removeClass('selectable');
      $('.face').removeClass('not-selectable');
    });
    
    
    $('#editor').on('dragstart', 'img', function(event) { event.preventDefault(); });
    $('#cube').on('dragstart', 'img', function(event) { event.preventDefault(); });
    
    $('#editor').on('mousedown', '.grid-cell', function(evt) {
      if(evt.which !== 1) return;
      var elem = $(this);
      var x = elem.data('x');
      var y = elem.data('y');
      var z = elem.data('z');
      m.ismousedown = true;
      m.world.setBlock(x, y, z, m.selected.dup());
      m.redrawTexture(elem);
    });
    
    $('#editor').on('mouseover', '.grid-cell', function() {
      if(m.ismousedown) {
        var elem = $(this);
        var x = elem.data('x');
        var y = elem.data('y');
        var z = elem.data('z');
        m.world.setBlock(x, y, z, m.selected.dup());
        m.redrawTexture(elem);
      }
    });
    
    $('.context').on('mousedown', false);
    
    $('#editor').on('contextmenu', '.grid-cell', function(evt) {
      console.log('context menu');
      var elem = $(this);
      var x = elem.data('x');
      var y = elem.data('y');
      var z = elem.data('z');
      
      var b = m.world.getBlock(x,y,z);
      
      var e = b.getContextElements();
      
      
      
      var deg = 360.0 / e.length;
      
      var menu = $('.context');
      menu.html('');
      
      menu.one('mouseleave', function() {
        $('.context').removeClass('on');
      });
      
      menu.one('click', function() {
        $('.context').removeClass('on');
      });
      
      var menuOuter = $('.context-wrapper')
      menuOuter.css('top',  evt.pageY-32);
      menuOuter.css('left', evt.pageX-32);
      
      var rc_i = $('#rc-i');
      
      rc_i.css('top', evt.pageY);
      rc_i.css('left', evt.pageX);
      
      var rc_i_m = $('#rc-i-m');
      
      rc_i_m.css('top', evt.pageY-32);
      rc_i_m.css('left', evt.pageX-32);
      
      $.each(e, function(i, o) {
        var ce = $('<div></div>');
        ce.append(o);
        ce.addClass('context-item');
        var rotAmt = (deg*i) + 270;
        var t = "rotate(" + rotAmt + "deg) translate(22px) rotate(-" + rotAmt + "deg)";
        ce.css('transform', t);
        ce.css('-o-transform', t);
        ce.css('-ms-transform', t);
        ce.css('-moz-transform', t);
        ce.css('-webkit-transform', t);
        menu.append(ce);
      });
      
      menu.addClass('on');
      evt.preventDefault();
    });
    
    $('#selector-outer').on('click', '.selector-item, .selector-item-air, .hotbar-item', function() {
      var elem = $(this);
      if(elem.data('id') == 0) {
        m.selected = m.registry.air;
      } else {
        m.selected = m.registry.blocks[elem.data('id')][elem.data('meta')];
      }
      elem.siblings().removeClass('selected');
      elem.addClass('selected');
    });
    
    $( ".hotbar-item" ).droppable({
      accept: '.selector-item',
      drop: function( event, ui ) {
        var id = ui.draggable.data('id');
        var meta = ui.draggable.data('meta');
        var block = m.registry.blocks[id][meta];
        var elem = $(this);
        elem.data('id', id);
        elem.data('meta', meta);
        elem.html(block.getTexture(Coord.UP));
        m.registerEvents();
      }
    });
  };
  
  this.registerEvents = function() {
    $( ".selector-item" ).draggable({
        helper: 'clone'
    });
    
  };
  
  
  $(".tab").click(function() {
    var elem = $(this);
    elem.parent().children(".selected").removeClass("selected");
    elem.addClass("selected");
    console.log('redrawing selector');
    m.redrawSelector();
  });
  
  this.openEditWindow = function(block) {
    this.editing = block;
    $('.edit-pane').addClass('open');
    $('.right-pane').html(block.getEditScreen());
    $('.edit-pane-close').click(function() {
      $('.edit-pane').removeClass('open');
    });
    this.redrawEditorTexture();
  };
  
  this.updateTextures = function(x, y, z) {
    console.log("TEXTURE. UPDATE!");
    if(this.currentLayer === z) {
      console.log('updating grid texture');
      var gridItem = $('.grid-cell.cell-coord_' + x + '_' + y + '_' + z + '');
      console.log(gridItem);
      this.redrawTexture(gridItem);
    }
    if(this.world.getBlock(x,y,z) === this.editing) {
      console.log('updating editor texture');
      this.redrawEditorTexture();
    }
  }
  
  this.redrawGrid();
  this.redrawSelector();
  this.registerEvents();
  this.registerOnceEvents();
  
}

Main.root = "";

$(function() {
  window.main = new Main();
});