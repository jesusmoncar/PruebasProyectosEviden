import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar esto en el módulo también
import { EmpleadoService } from '../empleado.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false, // Si no es standalone, recuerda declararlo en un módulo
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'] // Cambiado a styleUrls
})
export class LoginComponentComponent {

  nombre: string = '';
  apellido: string = '';
  email: string = '';

  // Inyectamos el servicio
  constructor(private empleadoService: EmpleadoService, private router :Router) {}

  // Variable para controlar si se muestran los datos del formulario
  mostrarDatos: boolean = false;

  // Método para enviar los datos del formulario
  onSubmit(): void {
    // Usamos el servicio para agregar el empleado
    this.empleadoService.agregarEmpleado(this.nombre, this.apellido, this.email);

    // Permitimos que los datos se muestren si la operación fue exitosa
    this.mostrarDatos = true;
  this.router.navigate(['/lista']);
    // Limpiamos los campos del formulario
    this.nombre = '';
    this.apellido = '';
    this.email = '';
  }
}
