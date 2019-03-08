import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemsService} from "./shared/items.service";
import {ItemsComponent} from "./items.component";
import {DetalleItemComponent} from "./detalle-item/detalle-item.component";
import {ThousandsPipe} from "../thousands.pipe";

@NgModule({
  declarations: [
    ItemsComponent,
    DetalleItemComponent,
    ThousandsPipe
  ],
  imports: [
    CommonModule
  ],
  providers:[
    ItemsService
  ]
})
export class ItemsModule { }
