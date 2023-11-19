class Tools {
  constructor({ field }) {
    this.field = field;
    this.el = document.createElement("div");
  }
  renderTools() {
    for (let i = 0; i < 2; i++) {
      let floor = this.field.tiles
        .flat()
        .filter((tile) => tile.el.className === "tile");
      let randomPosition = Math.floor(Math.random() * floor.length);
      this.x = floor[randomPosition].x;
      this.y = floor[randomPosition].y;
      let spawn = this.field.tiles
        .flat()
        .find((tile) => tile.x === this.x && tile.y === this.y);
      spawn.el.className = "tileSW";
    }
    for (let i = 0; i < 10; i++) {
      let floor = this.field.tiles
        .flat()
        .filter((tile) => tile.el.className === "tile");
      let randomPosition = Math.floor(Math.random() * floor.length);
      this.x = floor[randomPosition].x;
      this.y = floor[randomPosition].y;
      let spawn = this.field.tiles
        .flat()
        .find((tile) => tile.x === this.x && tile.y === this.y);
      spawn.el.className = "tileHP";
    }
  }
}
