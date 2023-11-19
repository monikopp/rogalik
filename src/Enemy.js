class Enemy {
  constructor({ field, x = 0, y = 0 }) {
    this.el = document.createElement("div");
    this.el.className = "tileE";
    this.hp;
    this.health = 100;
    this.field = field;
    this.strength = 25;
    this.x = x;
    this.y = y;
    // this.hp = document.createElement("div");
    // this.hp.className = "health";
    // this.hp.style.cssText = `width: ${this.health}%;`;
    // this.el.append(this.hp);
  }

  attack(player) {
    let tmap = this.field.tiles.flat();
    let currentPosition = tmap.find(
      (tile) => tile.x === this.x && this.y === tile.y
    );
    if (this.health <= 0) {
      currentPosition.el.className = "tile";

      this.field.enemies = this.field.enemies.filter(
        (el) => el.el.className !== "tile"
      );
    } else {
      player.health -= this.strength;
      // player.hp.style.ccsText = `width: ${player.health}%;`;
      if (player.health <= 0) {
        player.el.className = "tile";
        alert("Вы умерли(");

        window.location.reload();
      }
    }
  }
  randomMove() {
    let randomDirection = Math.floor(Math.random() * 4);
    if (randomDirection === 0) {
      this.moveUp();
    }
    if (randomDirection === 1) {
      this.moveDown();
    }
    if (randomDirection === 2) {
      this.moveLeft();
    }
    if (randomDirection === 3) {
      this.moveRight();
    }
  }

  moveUp() {
    if (
      this.y > 0 &&
      this.field.tiles[this.y - 1][this.x].el.className !== "tileW" &&
      this.field.tiles[this.y - 1][this.x].el.className !== "tileP" &&
      this.field.tiles[this.y - 1][this.x].el.className !== "tileE" &&
      this.field.tiles[this.y - 1][this.x].el.className !== "tileHP" &&
      this.field.tiles[this.y - 1][this.x].el.className !== "tileSW"
    ) {
      this.y--;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y - 1
      );

      prevPosition.el.className = "tile";

      currentPosition.el.className = "tileE";
    } else {
      this.randomMove();
    }
  }
  moveDown() {
    if (
      this.y < 23 &&
      this.field.tiles[this.y + 1][this.x].el.className !== "tileW" &&
      this.field.tiles[this.y + 1][this.x].el.className !== "tileP" &&
      this.field.tiles[this.y + 1][this.x].el.className !== "tileE" &&
      this.field.tiles[this.y + 1][this.x].el.className !== "tileHP" &&
      this.field.tiles[this.y + 1][this.x].el.className !== "tileSW"
    ) {
      this.y++;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y + 1
      );

      prevPosition.el.className = "tile";

      currentPosition.el.className = "tileE";
    } else {
      this.randomMove();
    }
  }
  moveLeft() {
    if (
      this.x > 0 &&
      this.field.tiles[this.y][this.x - 1].el.className !== "tileW" &&
      this.field.tiles[this.y][this.x - 1].el.className !== "tileP" &&
      this.field.tiles[this.y][this.x - 1].el.className !== "tileE" &&
      this.field.tiles[this.y][this.x - 1].el.className !== "tileHP" &&
      this.field.tiles[this.y][this.x - 1].el.className !== "tileSW"
    ) {
      this.x--;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x - 1 === this.x && this.y === tile.y
      );

      prevPosition.el.className = "tile";

      currentPosition.el.className = "tileE";
    } else {
      this.randomMove();
    }
  }
  moveRight() {
    if (
      this.x < 39 &&
      this.field.tiles[this.y][this.x + 1].el.className !== "tileW" &&
      this.field.tiles[this.y][this.x + 1].el.className !== "tileP" &&
      this.field.tiles[this.y][this.x + 1].el.className !== "tileE" &&
      this.field.tiles[this.y][this.x + 1].el.className !== "tileHP" &&
      this.field.tiles[this.y][this.x + 1].el.className !== "tileSW"
    ) {
      this.x++;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x + 1 === this.x && this.y === tile.y
      );

      prevPosition.el.className = "tile";

      currentPosition.el.className = "tileE";
    } else {
      this.randomMove();
    }
  }
  die() {
    this.el.className === "tile";
  }
}
