import { DataService } from './data.service';
import { Empleado } from './models/empleado.model';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  empleados: Empleado[] = [];
  private idCounter: number = 0;
  private password: string;

  constructor(private dataService: DataService) {
    this.cargarEmpleados().subscribe(empleados => {
      this.empleados = empleados;
      this.idCounter = 0; // Actualizamos el contador
    });
  }

  cargarEmpleados(): Observable<Empleado[]> {
    return this.dataService.cargarEmpleados().pipe(
      map((empleados: any) => {
        if (!empleados) {
          return []; // Si no hay empleados, devolvemos un array vacío
        }
        return Object.entries(empleados).map(([key, emp]: [string, any]) => ({
          id: parseInt(key, 10), // Convertimos la clave a número
          nombre: emp.nombre,
          apellido: emp.apellido,
          password: emp.password,
          email: emp.email,
        })).filter(emp => !isNaN(emp.id)); // Filtramos entradas con IDs no numéricos
      })
    );
  }



  agregarEmpleado(nombre: string, apellido: string, password: string, email: string): void {
    const nuevoEmpleado: Empleado = {
      id: ++this.idCounter,
      nombre,
      apellido,
      password,
      email
    };

    // Agregamos el nuevo empleado a la lista local
    this.empleados.push(nuevoEmpleado);

    // Guardamos la lista completa de empleados en Firebase usando PUT
    this.dataService.guardarEmpleados(this.empleados).subscribe(() => {
      console.log("Lista de empleados actualizada con éxito.");
    }, error => {
      console.error("Error al guardar la lista de empleados:", error);
    });
  }

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.cargarEmpleados();
  }

  setEmpleado(misEmpleados: {
    id: number; nombre: string; apellido: string; password: string; email: string }[]): void {
    this.empleados = misEmpleados.map(emp => ({
      id: emp.id,
      nombre: emp.nombre,
      apellido: emp.apellido,
      password: emp.password,
      email: emp.email,
    }));
  }

  encontrarEmpleado(id: number): Empleado | undefined {
    return this.empleados.find(emp => emp.id === id);
  }

  actualizarEmpleado(id: number, nombre: string, apellido: string, email: string, s: string): void {
    const empleado = this.empleados.find(emp => emp.id === id);
    if (empleado) {
      empleado.nombre = nombre;
      empleado.apellido = apellido;
      empleado.password = this.password;
      empleado.email = email;

      // Guardamos la lista completa después de actualizar
      this.dataService.guardarEmpleados(this.empleados).subscribe(() => {
        console.log("Empleado actualizado con éxito.");

      });
    }
  }
  eliminarEmpleado(id: number): void {
    this.dataService.eliminarEmpleado(id).subscribe(() => {
      console.log(`Empleado con ID ${id} eliminado de Firebase.`);
      // Recargamos la lista de empleados
      this.cargarEmpleados().subscribe((empleados) => {
        this.empleados = empleados;
        console.log("Lista de empleados actualizada después de la eliminación.");
      });
    }, error => {
      console.error(`Error al eliminar el empleado con ID ${id}:`, error);
    });
  }


}
