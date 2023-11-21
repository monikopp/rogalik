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
  }

  attack(player) {
    const tmap = this.field.tiles.flat();

    const currentPosition = tmap.find(
      (tile) => tile.x === this.x && this.y === tile.y
    );
    if (this.health <= 0) {
      currentPosition.el.className = "tile";

      this.field.enemies = this.field.enemies.filter(
        (el) => el.el.className !== "tile"
      );
    } else {
      player.health -= this.strength;
      player.hp.setAttribute("style", `width: ${player.health}%;`);

      if (player.health <= 0) {
        player.hp.setAttribute("style", `width: ${player.health}%;`);
        player.el.className = "tile";

        alert("Вы умерли(");

        window.location.reload();
      }
    }
  }
  randomMove() {
    const directions = 4;
    const randomDirection = Math.floor(Math.random() * directions);
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

  canMove(y, x) {
    return (
      this.field.tiles[y][x].el.className !== "tileW" &&
      this.field.tiles[y][x].el.className !== "tileP" &&
      this.field.tiles[y][x].el.className !== "tileE" &&
      this.field.tiles[y][x].el.className !== "tileHP" &&
      this.field.tiles[y][x].el.className !== "tileSW"
    );
  }
  getCurrentPosition(tmap) {
    return tmap.find((tile) => tile.x === this.x && this.y === tile.y);
  }

  moveUp() {
    if (this.y > 0 && this.canMove(this.y - 1, this.x)) {
      this.y--;
      const tmap = this.field.tiles.flat();
      const currentPosition = this.getCurrentPosition(tmap);
      const prevPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y - 1
      );

      prevPosition.el.className = "tile";

      currentPosition.el.className = "tileE";
    } else {
      this.randomMove();
    }
  }
  moveDown() {
    if (this.y < this.field.row - 1 && this.canMove(this.y + 1, this.x)) {
      this.y++;
      const tmap = this.field.tiles.flat();
      const currentPosition = this.getCurrentPosition(tmap);
      const prevPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y + 1
      );

      prevPosition.el.className = "tile";

      currentPosition.el.className = "tileE";
    } else {
      this.randomMove();
    }
  }
  moveLeft() {
    if (this.x > 0 && this.canMove(this.y, this.x - 1)) {
      this.x--;
      const tmap = this.field.tiles.flat();
      const currentPosition = this.getCurrentPosition(tmap);
      const prevPosition = tmap.find(
        (tile) => tile.x - 1 === this.x && this.y === tile.y
      );

      prevPosition.el.className = "tile";

      currentPosition.el.className = "tileE";
    } else {
      this.randomMove();
    }
  }
  moveRight() {
    if (this.x < this.field.column - 1 && this.canMove(this.y, this.x + 1)) {
      this.x++;
      const tmap = this.field.tiles.flat();
      const currentPosition = this.getCurrentPosition(tmap);
      const prevPosition = tmap.find(
        (tile) => tile.x + 1 === this.x && this.y === tile.y
      );

      prevPosition.el.className = "tile";

      currentPosition.el.className = "tileE";
    } else {
      this.randomMove();
    }
  }
}
