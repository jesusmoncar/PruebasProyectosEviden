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

  constructor(private dataService: DataService) {
    this.cargarEmpleados().subscribe(empleados => {
      this.empleados = empleados;
      this.idCounter = empleados.length; // Actualizamos el contador
    });
  }

  cargarEmpleados(): Observable<Empleado[]> {
    return this.dataService.cargarEmpleados().pipe(
      map((empleados: any) => {
        return Object.values(empleados || {}).map((emp: any) => ({
          id: emp.id,
          nombre: emp.nombre,
          apellido: emp.apellido,
          email: emp.email,
        }));
      })
    );
  }

  agregarEmpleado(nombre: string, apellido: string, email: string): void {
    const nuevoEmpleado: Empleado = {
      id: ++this.idCounter,
      nombre,
      apellido,
      email
    };

    this.dataService.guardarEmpleado(nuevoEmpleado).subscribe(() => {
      console.log("Empleado agregado con éxito.");
      this.empleados.push(nuevoEmpleado);
    }, error => {
      console.error("Error al guardar el empleado:", error);
    });
  }

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.cargarEmpleados();
  }

  setEmpleado(misEmpleados: Empleado[]): void {
    this.empleados = misEmpleados.map(emp => ({
      id: emp.id,
      nombre: emp.nombre,
      apellido: emp.apellido,
      email: emp.email,
    }));
  }

  encontrarEmpleado(id: number): Empleado | undefined {
    return this.empleados.find(emp => emp.id === id);
  }

  actualizarEmpleado(id: number, nombre: string, apellido: string, email: string): void {
    const empleado = this.empleados.find(emp => emp.id === id);
    if (empleado) {
      empleado.nombre = nombre;
      empleado.apellido = apellido;
      empleado.email = email;
      this.dataService.guardarEmpleado(empleado).subscribe(() => {
        console.log("Empleado actualizado con éxito.");
      });
    }
  }
}
