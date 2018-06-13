import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GameService } from '../providers/game-service.service';

interface Neighbors {
  left?: CellComponent;
  right?: CellComponent;
  bottom?: CellComponent;
  top?: CellComponent;
}
@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  active = false;
  x: number;
  y: number;
  neighbors: Neighbors = {};

  constructor(private game: GameService) { }

  ngOnInit() {
  }

  setActive() {
    if (this.neighbors.bottom === undefined || this.neighbors.bottom.active === true) {
      this.active = true;
      this.game.turn.next(this);
    } else if (this.neighbors.bottom) {
      this.neighbors.bottom.setActive();
    }
  }
}
