import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements AfterContentInit {

  @ContentChildren(CellComponent) cells: QueryList<RowComponent>;
  _cells = []
  
  constructor() { }

  ngAfterContentInit() {
    this._cells = this.cells.toArray()
    this._cells.map((cell,i)=>{
      cell.x = i
    })
  }

}
