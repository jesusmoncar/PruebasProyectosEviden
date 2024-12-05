import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../models/empleado.model';  // Asegúrate de tener un modelo de Empleado si lo necesitas

@Component({
  selector: 'app-actualiza-component',
  standalone: false,
  templateUrl: './actualiza-component.component.html',
  styleUrls: ['./actualiza-component.component.css']
})
export class ActualizaComponentComponent implements OnInit {

  id: number = 0;
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  email: string = '';

  empleado: Empleado | undefined;  // Usamos una propiedad para almacenar el empleado

  // Inyectamos el servicio
  constructor(private empleadoService: EmpleadoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el id del parámetro de la ruta
    this.id = +this.route.snapshot.params['id'];  // Convertimos el id a número

    // Buscar el empleado por su ID
    this.empleado = this.empleadoService.encontrarEmpleado(this.id);

    // Si se encuentra el empleado, asignamos sus datos al formulario
    if (this.empleado) {
      this.nombre = this.empleado.nombre;
      this.apellido = this.empleado.apellido;
      this.password = '';
      this.email = this.empleado.email;
    } else {
      // Si no se encuentra el empleado, podríamos redirigir o mostrar un mensaje de error
      console.error('Empleado no encontrado');
    }
  }

  mostrarDatos: boolean = false;

  // Método para actualizar los datos del empleado
  onSubmit(): void {
    // Usamos el servicio para actualizar el empleado
    if (this.empleado) {
      this.empleadoService.actualizarEmpleado(this.id, this.nombre, this.apellido, this.password, this.email);
      this.mostrarDatos = true;

      // Limpiamos los campos del formulario
      this.nombre = '';
      this.apellido = '';
      this.password = '';
      this.email = '';
    } else {
      console.error('Empleado no encontrado para actualizar');
    }

  }


}
