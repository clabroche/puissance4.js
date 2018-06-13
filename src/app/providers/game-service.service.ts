import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  finish = false;
  turn = new Subject();
  constructor() {
    this.turn.subscribe((cell: CellComponent) => {
      if (this.finish) return;
      this.endGame(cell);
    });
  }

  endGame(cell: CellComponent) {
    let e = 0;
    let w = 0;
    let n = 0;
    let ne = 0;
    let nw = 0;
    let se = 0;
    let sw = 0;
    let nextCell = cell;
    while (nextCell.neighbors.left && nextCell.neighbors.left.active) {
      w++; nextCell = nextCell.neighbors.left;
    }
    nextCell = cell;
    while (nextCell.neighbors.right && nextCell.neighbors.right.active) {
      e++; nextCell = nextCell.neighbors.right;
    }

    nextCell = cell;
    while (nextCell.neighbors.top && nextCell.neighbors.top.active) {
      n++; nextCell = nextCell.neighbors.top;
    }

    nextCell = cell;
    while (nextCell.neighbors.top && nextCell.neighbors.top.neighbors.left && nextCell.neighbors.top.neighbors.left.active) {
      nw++; nextCell = nextCell.neighbors.top.neighbors.left;
    }
    nextCell = cell;
    while (nextCell.neighbors.top && nextCell.neighbors.top.neighbors.right && nextCell.neighbors.top.neighbors.right.active) {
      ne++; nextCell = nextCell.neighbors.top.neighbors.right;
    }
    nextCell = cell;
    while (nextCell.neighbors.bottom && nextCell.neighbors.bottom.neighbors.right && nextCell.neighbors.bottom.neighbors.right.active) {
      se++; nextCell = nextCell.neighbors.bottom.neighbors.right;
    }
    nextCell = cell;
    while (nextCell.neighbors.bottom && nextCell.neighbors.bottom.neighbors.left && nextCell.neighbors.bottom.neighbors.left.active) {
      sw++; nextCell = nextCell.neighbors.bottom.neighbors.left;
    }

    if (
      e + w + 1 >= 4 ||
      n + 1 >= 4 ||
      ne + sw + 1 >= 4 ||
      nw + se + 1 >= 4
    ) { // horizontal
      console.log('win');
      this.finish = true;
    }
  }
}
