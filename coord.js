function Coord(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  
  this.offset = function(d, amt) {
    if(       d === Coord.NORTH) {
      this.x += amt;
    } else if(d === Coord.SOUTH) {
      this.x -= amt;
    } else if(d === Coord.EAST ) {
      this.y += amt;
    } else if(d === Coord.WEST ) {
      this.y -= amt;
    } else if(d === Coord.UP   ) {
      this.z += amt;
    } else if(d === Coord.DOWN ) {
      this.z -= amt;
    }
  }
  
  this.offsetXYZ = function(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
  }
  
}

Coord.NORTH = "+x";
Coord.SOUTH = "-x";

Coord.EAST  = "+y";
Coord.WEST  = "-y";

Coord.UP    = "+z";
Coord.DOWN  = "-z";

Coord.isTop = function(side) {
  return (side == Coord.UP);
};

Coord.isSide = function(side) {
  return (side == Coord.NORTH || side == Coord.SOUTH || side == Coord.EAST || side == Coord.WEST);
};

Coord.isBottom = function(side) {
  return (side == Coord.DOWN);
};
