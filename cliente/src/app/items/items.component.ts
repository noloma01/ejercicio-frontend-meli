import {Component, OnInit} from '@angular/core';
import {ItemsService} from "./shared/items.service";
import {Resultado} from "./shared/models/resultado.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  public resultado: Resultado = new Resultado();
  public filtro: string;

  constructor(private itemsService: ItemsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.route.queryParams
      .subscribe(param => {
        this.filtro = param.search;
        this.itemsService.getResultados(this.filtro)
          .subscribe(resultado => {
            this.resultado = resultado;
          })
      });
  }
}
