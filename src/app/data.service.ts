import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './models/empleado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Proporciona el servicio a toda la aplicación
})
export class DataService {

  private apiUrl = "https://mis-clientes-e3d52-default-rtdb.europe-west1.firebasedatabase.app/datos.json";

  constructor(private httpClient: HttpClient) { }

  // Cargar empleados desde Firebase
  cargarEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(this.apiUrl); // Especificamos que esperamos un array de Empleados
  }

  // Guardar empleados en Firebase
  guardarEmpleados(empleados: Empleado[]): Observable<any> {
    return this.httpClient.put(this.apiUrl, empleados); // No usamos subscribe aquí, sino que devolvemos el Observable
  }
}
