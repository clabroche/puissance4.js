import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterContentInit {

  result = {};
  finish = false;
  @ContentChildren(RowComponent) rows: QueryList<RowComponent>;
  _rows: Array<RowComponent> = [];
  constructor() { }

  ngAfterContentInit() {
    this._rows = this.rows.toArray();
    this._rows.map((row: RowComponent, y) => {
      row._cells.map((cell: CellComponent, x) => {
        cell.x = x;
        cell.y = y;
        if (this._rows[y + 1]) cell.neighbors.bottom = this._rows[y + 1]._cells[x];
        if (this._rows[y - 1]) cell.neighbors.top = this._rows[y - 1]._cells[x];
        if (this._rows[y]._cells[x + 1]) cell.neighbors.right = this._rows[y]._cells[x + 1];
        if (this._rows[y]._cells[x - 1]) cell.neighbors.left    = this._rows[y]._cells[x - 1];
        cell.state.subscribe((cell: CellComponent) => {
          if (this.finish) return;
          this.getNeighbors(cell);
        });
      });
    });
  }

  getNeighbors(cell: CellComponent) {
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
      e + w + 1 >= 4  ||
      n + 1 >= 4 ||
      ne + sw + 1 >= 4 ||
      nw + se + 1 >= 4
    ) { // horizontal
      console.log('win');
      this.finish = true;
    }
  }

}
