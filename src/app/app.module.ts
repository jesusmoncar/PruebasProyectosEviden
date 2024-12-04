import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ListarcomponentComponent } from './listarcomponent/listarcomponent.component';
import { ContactoComponentComponent } from './contacto-component/contacto-component.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { ActualizaComponentComponent } from './actualiza-component/actualiza-component.component';
import { FormsModule } from '@angular/forms';

// Importamos AppRoutingModule donde se definen las rutas
import { AppRoutingModule } from './app-routing.module';
import { ErrorPersonalizadoComponent } from './error-personalizado/error-personalizado.component';
import {DataService} from "./data.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    ListarcomponentComponent,
    ContactoComponentComponent,
    NavbarComponentComponent,
    ActualizaComponentComponent,
    ErrorPersonalizadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importamos las rutas desde AppRoutingModule
    FormsModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]

})
export class AppModule { }
