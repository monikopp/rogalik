class Player {
  constructor({ field }) {
    this.el = document.createElement("div");
    this.el.className = "tileP";
    this.health = 100;
    this.field = field;
    this.hp = document.createElement("div");
    this.hp.className = "health";

    this.hp.style.cssText = `width: ${this.health}%;`;
    this.el.appendChild(this.hp);
    this.strength = 50;
  }
  renderPlayer() {
    const { x, y } = this.field.getRandomPosition();
    this.x = x;
    this.y = y;

    let spawn = this.field.tiles
      .flat()
      .find((tile) => tile.x === this.x && tile.y === this.y);
    spawn.el.className = "tileP";

    let player = document.getElementsByClassName("tileP")[0];
    player.appendChild(this.hp);
  }

  attack() {
    this.field.enemies
      .filter(
        (tile) =>
          (tile.x === this.x ||
            tile.x === this.x + 1 ||
            tile.x === this.x - 1) &&
          (tile.y === this.y || tile.y === this.y + 1 || tile.y === this.y - 1)
      )
      .map((enemy) => {
        enemy.health -= this.strength;

        this.hp.style.cssText = `width: ${this.health}%;`;
        if (enemy.health <= 0) {
          enemy.el.className = "tile";
          this.field.enemies.filter((el) => {
            el.el.className !== "tile";
          });
        }

        this.strength = 50;
      });
  }
  canMove(y, x) {
    return (
      this.field.tiles[y][x].el.className !== "tileW" &&
      this.field.tiles[y][x].el.className !== "tileE"
    );
  }
  checkForTools(y, x) {
    if (this.field.tiles[y][x].el.className === "tileHP") {
      this.health = 100;
      this.hp.style.cssText = `width: ${this.health}%;`;
    }
    if (this.field.tiles[y][x].el.className === "tileSW") {
      this.strength = 100;
    }
  }
  moveUp() {
    if (this.y > 0 && this.canMove(this.y - 1, this.x)) {
      this.y--;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y - 1
      );
      this.checkForTools(this.y, this.x);

      prevPosition.el.className = "tile";
      currentPosition.el.className = "tileP";

      let player = document.getElementsByClassName("tileP")[0];
      player.appendChild(this.hp);
    }
  }
  moveDown() {
    if (this.y < this.field.row - 1 && this.canMove(this.y + 1, this.x)) {
      this.y++;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y + 1
      );
      this.checkForTools(this.y, this.x);

      prevPosition.el.className = "tile";
      currentPosition.el.className = "tileP";
      let player = document.getElementsByClassName("tileP")[0];
      player.appendChild(this.hp);
    }
  }
  moveLeft() {
    if (this.x > 0 && this.canMove(this.y, this.x - 1)) {
      this.x--;

      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x - 1 === this.x && this.y === tile.y
      );

      this.checkForTools(this.y, this.x);
      prevPosition.el.className = "tile";
      currentPosition.el.className = "tileP";
      let player = document.getElementsByClassName("tileP")[0];
      player.appendChild(this.hp);
    }
  }
  moveRight() {
    if (this.x < this.field.column - 1 && this.canMove(this.y, this.x + 1)) {
      this.x++;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x + 1 === this.x && this.y === tile.y
      );

      this.checkForTools(this.y, this.x);
      prevPosition.el.className = "tile";
      currentPosition.el.className = "tileP";
      let player = document.getElementsByClassName("tileP")[0];
      player.appendChild(this.hp);
    }
  }
}
