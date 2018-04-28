import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';




// usuario
import { InicioComponent } from './components/inicio.component';
import { UsuarioEdicionComponent } from './components/usuario-edicion.component';
import { CanalRadioListadoComponent } from './components/canalRadio-listado.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioEdicionComponent,
    CanalRadioListadoComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
