function Tab(image) {
  this.image = image;
  
  this.blocks = []
  
  this.addBlock = function(id, metadata) {
    this.blocks.push([id, metadata]);
  }
}