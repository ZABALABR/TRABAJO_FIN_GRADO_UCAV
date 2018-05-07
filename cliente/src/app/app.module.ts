import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';





import { InicioComponent } from './components/inicio.component';

import { UsuarioEdicionComponent } from './components/usuario-edicion.component';

import { CanalRadioListadoComponent } from './components/canalRadio-listado.component';
import { CanalRadioCrearComponent } from './components/canalRadio-crear.component';
import { CanalRadioEditarComponent } from './components/canalRadio-editar.component';
import { CanalRadioDetalleComponent } from './components/canalRadio-detalle.component';

import { ProgramaCrearComponent } from './components/programa-crear.component';
import { ProgramaEditarComponent } from './components/programa-editar.component';
import { ProgramaDetalleComponent } from './components/programa-detalle.component';

import { PodcastCrearComponent } from './components/podcast-crear.component';
import { PodcastEditarComponent } from './components/podcast-editar.component';

import { ReproductorComponent } from './components/reproductor.component';
import { MyFilterPipe } from './pipes/filtroCanales.pipe';


PodcastCrearComponent

@NgModule({
  declarations: [
    AppComponent,
    UsuarioEdicionComponent,
    CanalRadioListadoComponent,
    InicioComponent,
    CanalRadioCrearComponent,
    CanalRadioEditarComponent,
    CanalRadioDetalleComponent,
    ProgramaCrearComponent,
    ProgramaEditarComponent,
    ProgramaDetalleComponent,
    PodcastCrearComponent,
    PodcastEditarComponent,
    ReproductorComponent,
    MyFilterPipe
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
