class Tools {
  constructor({ field }) {
    this.field = field;
    this.el = document.createElement("div");
  }
  renderTools() {
    const amountOfSwords = 2;
    const amountOfHealthPacks = 10;
    for (let i = 0; i < amountOfSwords; i++) {
      const { x, y } = this.field.getRandomPosition();
      const spawn = this.field.tiles
        .flat()
        .find((tile) => tile.x === x && tile.y === y);
      spawn.el.className = "tileSW";
    }
    for (let i = 0; i < amountOfHealthPacks; i++) {
      const { x, y } = this.field.getRandomPosition();
      const spawn = this.field.tiles
        .flat()
        .find((tile) => tile.x === x && tile.y === y);
      spawn.el.className = "tileHP";
    }
  }
}
