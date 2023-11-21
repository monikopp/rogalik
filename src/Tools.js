class Tools {
  constructor({ field }) {
    this.field = field;
    this.el = document.createElement("div");
  }
  renderTools() {
    const amountOfSwords = 2;
    const amountOfHealthPacks = 10;
    for (let i = 0; i < amountOfSwords; i++) {
      this.field.setSpawn("tileSW");
    }
    for (let i = 0; i < amountOfHealthPacks; i++) {
      this.field.setSpawn("tileHP");
    }
  }
}
