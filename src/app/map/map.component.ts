import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { CellComponent } from '../cell/cell.component';
import { GameService } from '../providers/game-service.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterContentInit {

  result = {};
  @ContentChildren(RowComponent) rows: QueryList<RowComponent>;
  _rows: Array<RowComponent> = [];
  constructor(public game: GameService) { }

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
      });
    });
  }
}
