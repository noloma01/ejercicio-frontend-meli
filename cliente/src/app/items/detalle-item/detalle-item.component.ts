import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ItemsService} from "../shared/items.service";
import {Resultado} from "../shared/models/resultado.model";

@Component({
  selector: 'app-detalle-item',
  templateUrl: './detalle-item.component.html',
  styleUrls: ['./detalle-item.component.scss']
})
export class DetalleItemComponent implements OnInit {

  public resultado: Resultado = new Resultado();
  public breadCrumb: string;

  constructor(private itemsService: ItemsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.breadCrumb = this.itemsService.getBreadcrumb();
    this.getItem()
  }

  getItem() {
    this.route.params.subscribe((param: Params) => {
      this.itemsService.getItemById(param['id'])
        .subscribe(resultado => {
          this.resultado = resultado;
        });
    });
  }

}
