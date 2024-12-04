import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto-component',
  standalone: false,
  templateUrl: './contacto-component.component.html',
  styleUrls: ['./contacto-component.component.css'] // Cambiado a styleUrls
})
export class ContactoComponentComponent {

  constructor(private router: Router) {}

  // Método para navegar a la página principal
  volverHome(): void {
    this.router.navigate(['']); // Cambiado para aceptar un array como parámetro
  }
}
