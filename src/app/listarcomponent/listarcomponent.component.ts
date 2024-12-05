import {Component, OnInit} from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-listarcomponent',
  standalone: false,

  templateUrl: './listarcomponent.component.html',
  styleUrl: './listarcomponent.component.css'
})
export class ListarcomponentComponent implements OnInit{

  empleados: {
    id:number; nombre: string; apellido: string; password: string; email: string }[] = [];
  id: number ;

  // Inyectamos el servicio
  constructor(private empleadoService: EmpleadoService,   private router: Router) {}

  // Cargamos la lista de empleados cuando el componente se inicializa
  ngOnInit(): void {

    // this.empleados = this.empleadoService.obtenerEmpleados();
    console.log(this.empleadoService.obtenerEmpleados());
    this.empleadoService.obtenerEmpleados().subscribe(misEmpleados=>{
      console.log(misEmpleados);
      this.empleados= Object.values(misEmpleados);

      this.empleadoService.setEmpleado(this.empleados)
    })
  }



}
