this.mods = []; // just a place to dump mods

function Main() {
  Main.instance = this;
  this.registry = new Registry();
  this.registry.runMods();
  this.world = new World(this.registry);
  this.view = {};
  
  this.tool = {
    tool: '',
    changeTo: function(tool) {
      if(tool === this.tool) {
        this.tool = ''; return;
      }
      this.tool = tool;
      var icon = $('.cursor-icon');
      if(this.tool === '') {
        icon.addClass('hidden');
      } else {
        icon.removeClass('hidden');
      }
      icon.attr('id','tool-' + this.tool);
    },
    noTool: function() {
      icon = $('.cursor-icon');
      icon.addClass('hidden');
      icon.attr('id', '');
      this.tool = '';
    },
    toolActive: function(tool) {
      return tool === this.tool;
    }
  };
  
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
    this.redraw3DTexture(this.editing, $('#edit-pane-cube'));
  }
  
  this.redraw3DTexture = function(b, elem) {
    $('.face', elem).html('');
    $('.custom', elem).html('');
    if(b.hasCustom3DRenderer()) {
      $('.custom', elem).html(b.getCustom3DRenderer());
    } else {
      $('.face.north' , elem).html(b.getTexture(Coord.NORTH));
      $('.face.south' , elem).html(b.getTexture(Coord.SOUTH));
      $('.face.east'  , elem).html(b.getTexture(Coord.EAST ));
      $('.face.west'  , elem).html(b.getTexture(Coord.WEST ));
      $('.face.top'   , elem).html(b.getTexture(Coord.UP   ));
      $('.face.bottom', elem).html(b.getTexture(Coord.DOWN ));
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
      itm.addClass('block-type_' + id + '_' + meta);
      itm.data('id', id);
      itm.data('meta', meta);
      
      itm.html(block.getTexture(Coord.UP));

      sel.append(itm);
    });
    
//    this.registry.eachItem(function( id, meta, item ) {
//      if(typeof item.block === "undefined") return;
//      
//      var html = $('<div></div>');
//      
//      html.addClass('selector-item');
//      html.data('id', id);
//      html.data('meta', meta);
//      
//      html.html(item.getTexture());
//      sel.append(html);
//    });
    
    $('#selector').replaceWith(sel);
  }
  
  this.redrawGrid = function() {
    var grid = $("#grid");
    grid.html("");
    //var m = this;
    if(this.view.x <= 0 && this.view.y <= 0 && this.view.x >= -this.view.h && this.view.y >= -this.view.w) {
      var center = $('<div></div>');
    
      center.addClass('center');
    
      center.css({
        left: (-16 * this.view.y) + 'em',
        top: (-16 * this.view.x) + 'em',
        'margin-left': -1 * ( 5+this.view.y ) + 'px',
        'margin-top':  -1 * ( 5+this.view.x ) + 'px',
        'margin-bottom': -9 + (5+this.view.x) + 'px'
      });
      grid.append(center);
    }
    
    for(var x = this.view.x; x < (this.view.x + this.view.h); x += 1) {
      var row = $('<div></div>');
      row.addClass('grid-row');
      for(var y = this.view.y; y < (this.view.y + this.view.w); y += 1) {
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
    
    $('#edit-pane-cube').on('click','.face.selectable', function(evt) {
      var elem = $(this);
      if(elem.hasClass('north' )) { m.editing.facing = Coord.NORTH; }
      if(elem.hasClass('south' )) { m.editing.facing = Coord.SOUTH; }
      if(elem.hasClass('east'  )) { m.editing.facing = Coord.EAST;  }
      if(elem.hasClass('west'  )) { m.editing.facing = Coord.WEST;  }
      if(elem.hasClass('top'   )) { m.editing.facing = Coord.UP;    }
      if(elem.hasClass('bottom')) { m.editing.facing = Coord.DOWN;  }
      $('.face').removeClass('selectable');
      $('.face').removeClass('not-selectable');
      m.updateTextures(m.editing.x, m.editing.y, m.editing.z);
    });
    
    $('#edit-pane-cube').on('click','.face.not-selectable', function(evt) {
      $('.face').removeClass('selectable');
      $('.face').removeClass('not-selectable');
    });
    
    
    $('#editor').on('dragstart', 'img', function(event) { event.preventDefault(); });
    $('#edit-pane-cube').on('dragstart', 'img', function(event) { event.preventDefault(); });
    
    $('#editor').on('mousedown', '.grid-cell', function(evt) {
      if(evt.which !== 1) return;
      var elem = $(this);
      var x = elem.data('x');
      var y = elem.data('y');
      var z = elem.data('z');
      
      if(m.tool.toolActive('fill')) {
        m.tool.noTool();
        m.fill(x,y,z);
        
      } else if(m.tool.toolActive('eyedropper')) {
        m.tool.noTool();
        m.selected = m.world.getBlock(x,y,z).dup();
        
      } else {
        m.ismousedown = true;
        m.world.setBlock(x, y, z, m.selected.dup());
        m.redrawTexture(elem);
      }
    });
    
    $('#editor').on('mouseover', '.grid-cell', function(evt) {
      var elem = $(this);
      var x = elem.data('x');
      var y = elem.data('y');
      var z = elem.data('z');
      
      var name = m.registry.lang[
        m.world.getBlock(x,y,z).getUnlocalizedName()];
      
      if(typeof name === "undefined") {
        name = "???";
      }
      if(name === "") {
        $('#tooltip').addClass('hidden');
      } else {
        $('#tooltip').text(name).removeClass('hidden');
      }
    });
    
    $('#editor').on('mouseenter', function(evt) {
      $('.cursor-icon').removeClass('out-of-bounds');
    });
    
    $('#editor').on('mouseleave', function(evt) {
      $('#tooltip').addClass('hidden');
      $('.cursor-icon').addClass('out-of-bounds');
    });
    
    $('#selector').on('mouseleave', function(evt) {
      $('#tooltip').addClass('hidden');
    });
    
    $('#selector').on('mouseover', '.selector-item', function(evt) {
      var elem = $(this);
      var b;
      if(elem.data('id') == 0) {
        b = m.registry.air;
      } else {
        b = m.registry.blocks[elem.data('id')][elem.data('meta')];
      }
      var name = m.registry.lang[b.getUnlocalizedName()];
      if(typeof name === "undefined") {
        name = "???";
      }
      $('#tooltip').text(name).removeClass('hidden');
    });
    
    $('#editor, #selector').bind('mousemove', function(e){
      if(m.contextOn === true) { return }
      $('#tooltip').css({
        left:  e.pageX+3,
        top:   e.pageY-28
      });
    });
    
    $('#editor').bind('mousemove', function(e) {
      if(m.fillMode == false) { return }
      $('.cursor-icon').css({
        left:  e.pageX+10,
        top:   e.pageY+10
      });
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
      
      m.contextOn = true;
      
      menu.one('mouseleave', function() {
        $('.context').removeClass('on');
        m.contextOn = false;
      });
      
      menu.one('click', function() {
        $('.context').removeClass('on');
        m.contextOn = false;
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
      
      var north = $('<div></div>');
      north.addClass('context-item');
      north.addClass('context-north');
      
      menu.append(north);
      
      $.each(e, function(i, o) {
        var ce = $('<div></div>');
        ce.append(o);
        ce.addClass('context-item');
        var rotAmt = (deg*i) + 270;
        var t = "rotate(" + rotAmt + "deg) translate(29px) rotate(-" + rotAmt + "deg)";
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
    
    $(".goleft").click(function() {
      m.view.y += 1;
      m.redrawGrid();
    });
    $(".goright").click(function() {
      m.view.y -= 1;
      m.redrawGrid();
    });
    $(".goup").click(function() {
      m.view.x += 1;
      m.redrawGrid();
    });
    $(".godown").click(function() {
      m.view.x -= 1;
      m.redrawGrid();
    });
    $(".uplayer").click(function() {
      m.view.z += 1;
      $('.z-indicator').text(m.view.z);
      m.redrawGrid();
    });
    $(".downlayer").click(function() {
      m.view.z -= 1;
      $('.z-indicator').text(m.view.z);
      m.redrawGrid();
    });
    
    $(document).keydown(function(event) {
      console.log("keydown: " + event.which);
      var obj = m.shortcuts[event.which];
      if(typeof obj === "function") {
        obj(event);
      }
    });
    
    $('#height-editbox').keydown(function(event) {
      var elem = $(this);
      if(event.keyCode >= 48 && event.keyCode < 57 || event.keyCode === 8) {
        var icon = elem.siblings('i');
        icon.removeClass('fa-arrows-v');
        icon.addClass('fa-check');
        icon.addClass('change');
      } else if(event.keyCode === 27) {
        var icon = elem.siblings('i');
        icon.removeClass('change');
        icon.removeClass('fa-check');
        icon.addClass('fa-arrows-v');
        elem.text(m.view.h);
        elem.blur();
        event.preventDefault();
      } else {
        console.log('got bad key:' + event.keyCode);
        event.preventDefault();
      }
      
    });
    
    $('#width-editbox').keydown(function(event) {
      var elem = $(this);
      if(event.keyCode >= 48 && event.keyCode < 57 || event.keyCode === 8) {
        var icon = elem.siblings('i');
        icon.removeClass('fa-arrows-h');
        icon.addClass('fa-check');
        icon.addClass('change');
      } else if(event.keyCode === 27) {
        var icon = elem.siblings('i');
        icon.removeClass('change');
        icon.removeClass('fa-check');
        icon.addClass('fa-arrows-h');
        elem.text(m.view.w);
        elem.blur();
        event.preventDefault();
      } else {
        console.log('got bad key:' + event.keyCode);
        event.preventDefault();
      }
      
    });
    
    $('#width-change-outer').on('mousedown', '.change', function(evt) {
      var elem = $(this);
      m.view.w = parseInt(elem.siblings('#width-editbox').text());
      m.redrawGrid();
      elem.removeClass('change');
      elem.removeClass('fa-check');
      elem.addClass('fa-arrows-h');
    });
    
    $('#height-change-outer').on('mousedown', '.change', function(evt) {
      var elem = $(this);
      m.view.h = parseInt(elem.siblings('#height-editbox').text());
      m.redrawGrid();
      elem.removeClass('change');
      elem.removeClass('fa-check');
      elem.addClass('fa-arrows-v');
    });
    
    $('#save').click(function() {
      console.log('SAVING');
      $('#save-area').val(m.world.save());
    });
    
    $('#load').click(function() {
      m.world.load($('#save-area').val());
      m.redrawGrid();
    });
    
  };
  
  this.registerEvents = function() {
    $( ".selector-item" ).draggable({
        helper: 'clone'
    });
    
  };
  
  this.oldselected = null;
  this.shortcuts = {
    37: function() { // Left
      m.view.y += 1;
      m.redrawGrid();
    },
    39: function() { // Right
      m.view.y -= 1;
      m.redrawGrid();
    },
    38: function() { // Up
      m.view.x += 1;
      m.redrawGrid();
    },
    40: function() { // Down
      m.view.x -= 1;
      m.redrawGrid();
    },
    69: function() { // E
      var elem;
      if(m.oldselected === null) {
        m.oldselected = m.selected;
        m.selected = m.registry.air;
        
        elem = $('.selector-item-air');
        elem.siblings().removeClass('selected');
        elem.addClass('selected');
      } else {
        m.selected = m.oldselected;
        m.oldselected = null;
        
        elem = $('.block-type_' + m.selected.id + '_' + m.selected.meta);
        elem.siblings().removeClass('selected');
        elem.addClass('selected');
      }
    },
    70: function() { // F
      m.tool.changeTo('fill');
    },
    73: function() { // I
      m.tool.changeTo('eyedropper');
    }
  }
  
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
    var title = $('<div></div>');
    title.addClass('edit-pane-title');
    title.html(this.registry.lang[block.getUnlocalizedName()]);
    $('.right-pane').prepend(title);
    $('.edit-pane-close').click(function() {
      $('.edit-pane').removeClass('open');
    });
    this.redrawEditorTexture();
  };
  
  this.updateTextures = function(x, y, z) {
    if(this.view.z === z) {
      //console.log('updating grid texture');
      var gridItem = $('.grid-cell.cell-coord_' + x + '_' + y + '_' + z + '');
      //console.log(gridItem);
      this.redrawTexture(gridItem);
    }
    if(this.world.getBlock(x,y,z) === this.editing) {
      //console.log('updating editor texture');
      this.redrawEditorTexture();
    }
  }
  
  
  this.fill = function(x,y,z, target, replacement) {
    if(typeof replacement === "undefined") replacement = m.selected;
    if(typeof target === "undefined") target = m.world.getBlock(x,y,z);
    //console.log("filling "+x+","+y+","+z+": " + target.getUnlocalizedName() + " with " + replacement.getUnlocalizedName());
    
    if(target.getUnlocalizedName() === replacement.getUnlocalizedName()) return;
    if(this.world.getBlock(x,y,z).getUnlocalizedName() !== target.getUnlocalizedName()) return;
    
    if(x <  this.view.x) return;
    if(x >= this.view.x + this.view.w) return;
    if(y <  this.view.y) return;
    if(y >= this.view.y + this.view.h) return;
    
    this.world.setBlock(x,y,z, replacement.dup());
    this.world.getBlock(x,y,z).updateTextures();
    
    this.fill(x+1, y  , z, target, replacement);
    this.fill(x-1, y  , z, target, replacement);
    this.fill(x  , y+1, z, target, replacement);
    this.fill(x  , y-1, z, target, replacement);
    
  }
  
  $('#height-editbox').text(this.view.h);
  $('#width-editbox' ).text(this.view.w);
  this.redrawGrid();
  this.redrawSelector();
  this.registerEvents();
  this.registry.loadLanguages("en_US");
  
  $("edit-pane-cube").replaceWith(
    $( $('#3d-cube').html() ).addClass('spin').attr('id', 'edit-pane-cube')
  );
  
  this.registerOnceEvents();
  
}

Main.root = "";

$(function() {
  new Main();
});