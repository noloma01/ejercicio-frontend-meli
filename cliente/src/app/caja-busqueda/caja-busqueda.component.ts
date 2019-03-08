import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-caja-busqueda',
  templateUrl: './caja-busqueda.component.html',
  styleUrls: ['./caja-busqueda.component.scss']
})
export class CajaBusquedaComponent implements OnInit {

  public form: FormGroup;
  public filtro: string;

  constructor(private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.form = this.fb.group({
      filtro: this.fb.control(this.filtro)
    });
  }

  buscar() {
    this.filtro = this.form.get('filtro').value;
    this.router.navigate(['/items'], {queryParams: {search: this.filtro}});
  }

  limpiarBusqueda() {
    this.form.get('filtro').setValue('');
  }

  keyDownFunction(event) {
    if (event.key === 'Enter') {
      this.buscar();
    }
  }
}
