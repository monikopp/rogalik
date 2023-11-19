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
    let floor = this.field.tiles
      .flat()
      .filter((tile) => tile.el.className === "tile");

    let randomStartPosition = Math.floor(Math.random() * floor.length);
    this.x = floor[randomStartPosition].x;
    this.y = floor[randomStartPosition].y;

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
          enemy.hp.style.ccsText = `width: ${enemy.health}%;`;
        }

        this.strength = 50;
      });
  }

  moveUp() {
    if (
      this.y > 0 &&
      this.field.tiles[this.y - 1][this.x].el.className !== "tileW" &&
      this.field.tiles[this.y - 1][this.x].el.className !== "tileE"
    ) {
      this.y--;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y - 1
      );
      if (this.field.tiles[this.y][this.x].el.className === "tileHP") {
        this.health = 100;
        this.hp.style.cssText = `width: ${this.health}%;`;
      }
      if (this.field.tiles[this.y][this.x].el.className === "tileSW") {
        this.strength = 100;
      }
      prevPosition.el.className = "tile";
      currentPosition.el.className = "tileP";

      let player = document.getElementsByClassName("tileP")[0];
      player.appendChild(this.hp);
    }
  }
  moveDown() {
    if (
      this.y < 23 &&
      this.field.tiles[this.y + 1][this.x].el.className !== "tileW" &&
      this.field.tiles[this.y + 1][this.x].el.className !== "tileE"
    ) {
      this.y++;

      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y + 1
      );
      if (this.field.tiles[this.y][this.x].el.className === "tileHP") {
        this.health = 100;
        this.hp.style.cssText = `width: ${this.health}%;`;
      }
      if (this.field.tiles[this.y][this.x].el.className === "tileSW") {
        this.strength += 50;
      }
      prevPosition.el.className = "tile";
      currentPosition.el.className = "tileP";
      let player = document.getElementsByClassName("tileP")[0];
      player.appendChild(this.hp);
    }
  }
  moveLeft() {
    if (
      this.x > 0 &&
      this.field.tiles[this.y][this.x - 1].el.className !== "tileW" &&
      this.field.tiles[this.y][this.x - 1].el.className !== "tileE"
    ) {
      this.x--;

      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x - 1 === this.x && this.y === tile.y
      );
      if (this.field.tiles[this.y][this.x].el.className === "tileHP") {
        this.health = 100;
        this.hp.style.cssText = `width: ${this.health}%;`;
      }
      if (this.field.tiles[this.y][this.x].el.className === "tileSW") {
        this.strength = 100;
      }
      prevPosition.el.className = "tile";
      currentPosition.el.className = "tileP";
      let player = document.getElementsByClassName("tileP")[0];
      player.appendChild(this.hp);
    }
  }
  moveRight() {
    if (
      this.x < 39 &&
      this.field.tiles[this.y][this.x + 1].el.className !== "tileW" &&
      this.field.tiles[this.y][this.x + 1].el.className !== "tileE"
    ) {
      this.x++;
      let tmap = this.field.tiles.flat();
      let currentPosition = tmap.find(
        (tile) => tile.x === this.x && this.y === tile.y
      );
      let prevPosition = tmap.find(
        (tile) => tile.x + 1 === this.x && this.y === tile.y
      );
      if (this.field.tiles[this.y][this.x].el.className === "tileHP") {
        this.health = 100;
        this.hp.style.cssText = `width: ${this.health}%;`;
      }
      if (this.field.tiles[this.y][this.x].el.className === "tileSW") {
        this.strength = 100;
      }
      prevPosition.el.className = "tile";
      currentPosition.el.className = "tileP";
      let player = document.getElementsByClassName("tileP")[0];
      player.appendChild(this.hp);
    }
  }
}
