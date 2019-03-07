import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemsService} from "./shared/items.service";
import {ItemsComponent} from "./items.component";
import {DetalleItemComponent} from "./detalle-item/detalle-item.component";

@NgModule({
  declarations: [
    ItemsComponent,
    DetalleItemComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    ItemsService
  ]
})
export class ItemsModule { }
