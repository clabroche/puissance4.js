import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

interface Neighbors {
  left?: CellComponent,
  right?: CellComponent,
  bottom?: CellComponent,
  top?: CellComponent,
}
@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  active = false;
  state = new Subject();
  x:number
  y:number;
  neighbors: Neighbors = {};
  constructor() { }

  ngOnInit() {
  }

  setActive() {
    if(this.neighbors.bottom === undefined || this.neighbors.bottom.active === true)
      this.active = true;
    else if (this.neighbors.bottom) {
      this.neighbors.bottom.setActive();
    }
  } 
}
