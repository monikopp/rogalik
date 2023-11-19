class Game {
  constructor() {
    this.field = new Field({ row: 40, column: 24 });
    this.enemy = new Enemy({ field: this.field });
    this.player = new Player({ field: this.field, enemy: this.enemy });
    this.tools = new Tools({ field: this.field });
  }
  renderEnemies() {
    let floor = this.field.tiles
      .flat()
      .filter((tile) => tile.el.className === "tile");
    for (let i = 0; i < 10; i++) {
      let randomStartPosition = Math.floor(Math.random() * floor.length);
      this.enemy.x = floor[randomStartPosition].x;
      this.enemy.y = floor[randomStartPosition].y;

      let spawn = this.field.tiles
        .flat()
        .find((tile) => tile.x === this.enemy.x && tile.y === this.enemy.y);
      spawn.el.className = "tileE";
      spawn.health = 100;

      this.field.enemies.push(
        new Enemy({ field: this.field, x: spawn.x, y: spawn.y })
      );
    }

    // let enemies = document.querySelectorAll(".tileE");

    // enemies.forEach((el) => {
    //   el.hp = document.createElement("div");
    //   el.hp.className = "health";
    //   el.hp.style.cssText = `width: ${this.enemy.health}%;`;
    //   el.append(el.hp);

    // });
  }
  init() {
    this.field.renderField();
    this.field.renderRandomHallways();
    this.field.renderRandomRoom();
    this.player.renderPlayer();
    this.renderEnemies();
    this.tools.renderTools();

    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "KeyW":
          this.player.moveUp();

          for (let i = 0; i < this.field.enemies.length; i++) {
            if (
              (this.field.enemies[i].x === this.player.x ||
                this.field.enemies[i].x === this.player.x + 1 ||
                this.field.enemies[i].x === this.player.x - 1) &&
              (this.field.enemies[i].y === this.player.y ||
                this.field.enemies[i].y === this.player.y + 1 ||
                this.field.enemies[i].y === this.player.y - 1)
            ) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
        case "KeyS":
          this.player.moveDown();

          for (let i = 0; i < this.field.enemies.length; i++) {
            if (
              (this.field.enemies[i].x === this.player.x ||
                this.field.enemies[i].x === this.player.x + 1 ||
                this.field.enemies[i].x === this.player.x - 1) &&
              (this.field.enemies[i].y === this.player.y ||
                this.field.enemies[i].y === this.player.y + 1 ||
                this.field.enemies[i].y === this.player.y - 1)
            ) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
        case "KeyA":
          this.player.moveLeft();

          for (let i = 0; i < this.field.enemies.length; i++) {
            if (
              (this.field.enemies[i].x === this.player.x ||
                this.field.enemies[i].x === this.player.x + 1 ||
                this.field.enemies[i].x === this.player.x - 1) &&
              (this.field.enemies[i].y === this.player.y ||
                this.field.enemies[i].y === this.player.y + 1 ||
                this.field.enemies[i].y === this.player.y - 1)
            ) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
        case "KeyD":
          this.player.moveRight();

          for (let i = 0; i < this.field.enemies.length; i++) {
            if (
              (this.field.enemies[i].x === this.player.x ||
                this.field.enemies[i].x === this.player.x + 1 ||
                this.field.enemies[i].x === this.player.x - 1) &&
              (this.field.enemies[i].y === this.player.y ||
                this.field.enemies[i].y === this.player.y + 1 ||
                this.field.enemies[i].y === this.player.y - 1)
            ) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
        case "Space":
          this.player.attack();
          for (let i = 0; i < this.field.enemies.length; i++) {
            if (
              (this.field.enemies[i].x === this.player.x ||
                this.field.enemies[i].x === this.player.x + 1 ||
                this.field.enemies[i].x === this.player.x - 1) &&
              (this.field.enemies[i].y === this.player.y ||
                this.field.enemies[i].y === this.player.y + 1 ||
                this.field.enemies[i].y === this.player.y - 1)
            ) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
      }
    });
  }
}
