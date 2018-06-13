import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid/v4';
@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  uuid() {
    return uuid();
  }
}
