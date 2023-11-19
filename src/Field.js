class Tile {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;

    this.el = document.createElement("div");
    this.el.className = "tileW";
  }
}

class Field {
  constructor({ row, column }) {
    this.row = row;
    this.column = column;
    this.tiles = [];
    this.enemies = [];
  }
  renderField() {
    const field = document.getElementsByClassName("field")[0];
    let tmap = [];
    for (let j = 0; j < this.column; j++) {
      for (let i = 0; i < this.row; i++) {
        const tile = new Tile({ x: i, y: j });
        tmap.push(tile);
      }
    }
    for (let t = 0; t < tmap.length; t = t + 40) {
      const rows = tmap.slice(t, t + 40);
      this.tiles.push(rows);

      rows.forEach((tile) => {
        field.appendChild(tile.el);
      });
    }
  }
  renderRandomHallways() {
    let randomNumberForRow = Math.floor(Math.random() * (5 - 3)) + 3;

    let randomNumberForColumn = Math.floor(Math.random() * (5 - 3)) + 3;

    let randomRowArr = Array.from(Array(24).keys());

    let randomColumnArr = Array.from(Array(40).keys());

    for (let i = 0; i < randomNumberForRow; i++) {
      const randomRow =
        randomRowArr[Math.floor(Math.random() * randomRowArr.length)];
      if (randomRowArr.indexOf(randomRow) !== 0) {
        randomRowArr.splice(randomRow - 1, 3);
      } else if (randomRowArr.indexOf(randomRow) === randomRowArr.length - 1) {
        randomRowArr.splice(randomRow - 1, 2);
      } else {
        randomRowArr.splice(randomRow, 2);
      }
      this.tiles[randomRow].forEach((tile) => {
        tile.el.className = "tile";
      });
    }
    for (let i = 0; i < randomNumberForColumn; i++) {
      const randomColumn =
        randomColumnArr[Math.floor(Math.random() * randomColumnArr.length)];
      if (randomColumnArr.indexOf(randomColumn) !== 0) {
        randomColumnArr.splice(randomColumn - 1, 3);
      } else if (
        randomColumnArr.indexOf(randomColumn) ===
        randomColumnArr.length - 1
      ) {
        randomColumnArr.splice(randomColumn - 1, 2);
      } else {
        randomColumnArr.splice(randomColumn, 2);
      }

      this.tiles.forEach((rows) => (rows[randomColumn].el.className = "tile"));
    }
  }

  renderRandomRoom() {
    const randomNumberOfRooms = Math.floor(Math.random() * (10 - 5)) + 5;

    let roomsArr = [];
    const randomRoom = () => {
      let room = [];
      let randomX = Math.floor(Math.random() * 24);
      let randomY = Math.floor(Math.random() * 40);
      let width = Math.floor(Math.random() * (8 - 3)) + 3;
      let height = Math.floor(Math.random() * (8 - 3)) + 3;

      for (let m = 0; m < height; m++) {
        for (let j = 0; j < width; j++) {
          const tile = new Tile({ x: randomX + j, y: randomY });
          tile.el.className = "tile";
          room.push(tile);
        }

        randomY += 1;
      }

      if (
        room.find((tile) =>
          this.tiles
            .flat()
            .find(
              (elt) =>
                elt.x === tile.x &&
                elt.y === tile.y &&
                elt.el.className === "tile"
            )
        )
      ) {
        roomsArr.push(room);
      } else {
        randomRoom();
      }
    };

    for (let i = 0; i < randomNumberOfRooms; i++) {
      randomRoom();
    }

    roomsArr.flat().forEach((tile) => {
      const ok = this.tiles
        .flat()
        .find((kletka) => kletka.x === tile.x && kletka.y === tile.y);

      if (ok) {
        ok.el.className = "tile";
      }
    });
  }
}
