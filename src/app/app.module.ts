import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { RowComponent } from './row/row.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    RowComponent,
    CellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
