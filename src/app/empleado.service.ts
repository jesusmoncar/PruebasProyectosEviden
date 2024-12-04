import {DataService} from './data.service';
import {Empleado} from './models/empleado.model';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class EmpleadoService {
  empleados: Empleado[] = []; // Inicializa el array vacío
  private idCounter: number = 0; // Contador de ID, que se actualizará al cargar empleados

  constructor(private dataService: DataService) {
    // Al cargar el servicio, obtenemos la lista de empleados desde el DataService
    this.cargarEmpleados();
  }

  // Cargar empleados desde el DataService o cualquier almacenamiento persistente
  cargarEmpleados(): Observable<Empleado[]> {
    return this.dataService.cargarEmpleados().pipe(
      map((empleados: any[]) => empleados.map(emp => ({
        id: emp.id,
        nombre: emp.nombre,
        apellido: emp.apellido,
        email: emp.email,
      })))
    );
  }



  // Agregar un nuevo empleado
  agregarEmpleado(nombre: string, apellido: string, email: string): void {
    const newId = ++this.idCounter; // Incrementamos el contador para asignar una nueva ID
    const nuevoEmpleado: Empleado = { id: newId, nombre, apellido, email };

    // Agregamos el nuevo empleado al array de empleados
    this.empleados.push(nuevoEmpleado);

    // Guardamos la lista de empleados actualizada en el almacenamiento persistente
    this.dataService.guardarEmpleados(this.empleados);
  }

  // Obtener la lista de empleados
  obtenerEmpleados(): Observable<Empleado[]> {
    return this.dataService.cargarEmpleados();
  }
setEmpleado(misEmpleados:Empleado[]){
    this.empleados=Object.values(misEmpleados);
}
  // Buscar un empleado por ID
  encontrarEmpleado(id: number): Empleado | undefined {
    return this.empleados.find(emp => emp.id === id);
  }

  // Actualizar un empleado
  actualizarEmpleado(id: number, nombre: string, apellido: string, email: string): void {
    const empleado = this.empleados.find(emp => emp.id === id);
    if (empleado) {
      empleado.nombre = nombre;
      empleado.apellido = apellido;
      empleado.email = email;

      // Guardamos los cambios después de actualizar
      this.dataService.guardarEmpleados(this.empleados);
    }
  }
}
