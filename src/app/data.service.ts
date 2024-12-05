import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './models/empleado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = "https://misclientes-d34e6-default-rtdb.europe-west1.firebasedatabase.app/datos.json";

  constructor(private httpClient: HttpClient) {}

  // Cargar empleados desde Firebase
  cargarEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(this.apiUrl);
  }

  // Guardar la lista completa de empleados en Firebase (sobrescribir con PUT)
  guardarEmpleados(empleados: Empleado[]): Observable<any> {
    return this.httpClient.put(this.apiUrl, empleados); // Reemplaza todos los datos en el nodo "datos"
  }

  eliminarEmpleados(id:number){

    let url = 'https://misclientes-d34e6-default-rtdb.europe-west1.firebasedatabase.app/' + id + ".json";

    this.httpClient.delete(url).subscribe(
      respose=>console.log("Se ha eliminado correctamente el empleado " + respose),
      error => console.log("Error: " + error),

    )
  }


}
