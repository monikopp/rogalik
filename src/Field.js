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

  get floor() {
    return this.tiles.flat().filter((tile) => tile.el.className === "tile");
  }

  getRandomPosition() {
    const floor = this.floor;

    const randomPosition = Math.floor(Math.random() * floor.length);
    const { x, y } = floor[randomPosition];

    return { x, y };
  }

  renderField() {
    const field = document.getElementsByClassName("field")[0];
    let tmap = [];
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        const tile = new Tile({ x: j, y: i });
        tmap.push(tile);
      }
    }
    for (let t = 0; t < tmap.length; t = t + this.column) {
      const row = tmap.slice(t, t + this.column);
      this.tiles.push(row);

      row.forEach((tile) => {
        field.appendChild(tile.el);
      });
    }
    console.log(this);
  }
  renderRandomHallways() {
    const maxAmountOfHalls = 5;
    const minAmountofHalls = 3;
    let randomNumberForRow =
      Math.floor(Math.random() * (maxAmountOfHalls - minAmountofHalls)) +
      minAmountofHalls;

    let randomNumberForColumn =
      Math.floor(Math.random() * (maxAmountOfHalls - minAmountofHalls)) +
      minAmountofHalls;

    let randomRowArr = Array.from(Array(this.row).keys());

    let randomColumnArr = Array.from(Array(this.column).keys());

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
    const maxAmountOfRooms = 10;
    const minAmountOfRooms = 5;
    const randomNumberOfRooms =
      Math.floor(Math.random() * (maxAmountOfRooms - minAmountOfRooms)) +
      minAmountOfRooms;
    const maxSize = 8;
    const minSize = 3;
    let roomsArr = [];
    const randomRoom = () => {
      let room = [];
      let randomY = Math.floor(Math.random() * this.row);
      let randomX = Math.floor(Math.random() * this.column);
      let width = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
      let height = Math.floor(Math.random() * (maxSize - minSize)) + minSize;

      for (let m = 0; m < height; m++) {
        for (let j = 0; j < width; j++) {
          const tile = new Tile({ x: randomY + j, y: randomX });
          tile.el.className = "tile";
          room.push(tile);
        }

        randomX += 1;
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
      const rooms = this.tiles
        .flat()
        .find((rTile) => rTile.x === tile.x && rTile.y === tile.y);

      if (rooms) {
        rooms.el.className = "tile";
      }
    });
  }
}
