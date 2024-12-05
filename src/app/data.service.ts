import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './models/empleado.model';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = "https://mis-clientes-e3d52-default-rtdb.europe-west1.firebasedatabase.app/datos.json";

  constructor(private httpClient: HttpClient) {}

  // Cargar empleados desde Firebase
  cargarEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(this.apiUrl).pipe(
      map((empleados) => {
        if (!empleados) {
          return []; // Si la base de datos está vacía, devolvemos un array vacío
        }
        return Object.values(empleados); // Convertimos los empleados en un array
      })
    );
  }


  // Guardar la lista completa de empleados en Firebase (sobrescribir con PUT)
  guardarEmpleados(empleados: Empleado[]): Observable<any> {
    return this.httpClient.put(this.apiUrl, empleados); // Reemplaza todos los datos en el nodo "datos"
  }
  eliminarEmpleado(id: number): Observable<any> {
    const url = `https://mis-clientes-e3d52-default-rtdb.europe-west1.firebasedatabase.app/datos/${id}.json`;
    return this.httpClient.delete(url);


  }

}
