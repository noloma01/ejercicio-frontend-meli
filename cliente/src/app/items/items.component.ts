import {Component, OnInit} from '@angular/core';
import {ItemsService} from "./shared/items.service";
import {Resultados} from "./shared/models/resultados.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  public resultado: Resultados = new Resultados();
  public filtro: string;

  constructor(private itemsService: ItemsService,
              private route: ActivatedRoute,
              private router: Router) {
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

  buscarItemPorId(id: string) {
    this.itemsService.setBreadcrumb(this.getCategories());
    this.router.navigate([/items/ + id])
  }

  getCategories(): string {
    let result = '';
    if (this.resultado.categories) {
      this.resultado.categories.forEach((categoria, index) => {
        if (index == this.resultado.categories.length - 1) {
          result += categoria;
        }
        else {
          result += categoria + " > ";
        }
      })
    }
    return result;
  }
}
