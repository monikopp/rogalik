class Game {
  constructor() {
    this.field = new Field({ row: 24, column: 40 });

    this.player = new Player({ field: this.field, enemy: this.enemy });
    this.tools = new Tools({ field: this.field });
  }
  renderEnemies() {
    for (let i = 0; i < 10; i++) {
      const { x, y } = this.field.getRandomPosition();
      let spawn = this.field.tiles
        .flat()
        .find((tile) => tile.x === x && tile.y === y);
      spawn.el.className = "tileE";
      spawn.health = 100;

      this.field.enemies.push(
        new Enemy({ field: this.field, x: spawn.x, y: spawn.y })
      );
    }
  }

  checkEnemyNextToHero(enemyIndex) {
    return (
      (this.field.enemies[enemyIndex].x === this.player.x ||
        this.field.enemies[enemyIndex].x === this.player.x + 1 ||
        this.field.enemies[enemyIndex].x === this.player.x - 1) &&
      (this.field.enemies[enemyIndex].y === this.player.y ||
        this.field.enemies[enemyIndex].y === this.player.y + 1 ||
        this.field.enemies[enemyIndex].y === this.player.y - 1)
    );
  }

  init() {
    this.field.renderField();
    this.field.renderRandomHallways();
    this.field.renderRandomRoom();
    this.player.renderPlayer();
    this.renderEnemies();
    this.tools.renderTools();

    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "KeyW":
          this.player.moveUp();

          for (let i = 0; i < this.field.enemies.length; i++) {
            if (this.checkEnemyNextToHero(i)) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
        case "KeyS":
          this.player.moveDown();

          for (let i = 0; i < this.field.enemies.length; i++) {
            if (this.checkEnemyNextToHero(i)) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
        case "KeyA":
          this.player.moveLeft();

          for (let i = 0; i < this.field.enemies.length; i++) {
            if (this.checkEnemyNextToHero(i)) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
        case "KeyD":
          this.player.moveRight();

          for (let i = 0; i < this.field.enemies.length; i++) {
            if (this.checkEnemyNextToHero(i)) {
              this.field.enemies[i].attack(this.player);
            } else {
              this.field.enemies[i].randomMove();
            }
          }

          break;
        case "Space":
          this.player.attack();
          for (let i = 0; i < this.field.enemies.length; i++) {
            if (this.checkEnemyNextToHero(i)) {
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
