import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import usuario

import { InicioComponent } from './components/inicio.component';
import { UsuarioEdicionComponent } from './components/usuario-edicion.component';

// import canalRadio
import { CanalRadioListadoComponent } from './components/canalRadio-listado.component';
import { CanalRadioCrearComponent } from './components/canalRadio-crear.component';
import { CanalRadioEditarComponent } from './components/canalRadio-editar.component';
import { CanalRadioDetalleComponent } from './components/canalRadio-detalle.component';


// import programa

import { ProgramaCrearComponent } from './components/programa-crear.component';
import { ProgramaEditarComponent } from './components/programa-editar.component';
import { ProgramaDetalleComponent } from './components/programa-detalle.component';

// import de los podcast

import { PodcastCrearComponent } from './components/podcast-crear.component';
import { PodcastEditarComponent } from './components/podcast-editar.component';




const appRoutes: Routes = [
/*
    {
       path:'',
       redirectTo:'canalesRadio/1',
       pathMatch:'full'
       
    },
 */   
	{path: '', component: InicioComponent},
	{path: 'canalesRadio/:page', component: CanalRadioListadoComponent},
	{path: 'crear-canalRadio', component: CanalRadioCrearComponent},
	{path: 'editar-canalRadio/:id', component: CanalRadioEditarComponent},
	{path: 'canalRadio/:id', component: CanalRadioDetalleComponent},
	{path: 'crear-programa/:canalRadio', component: ProgramaCrearComponent},//le pasamos el id del canal de radio
	{path: 'editar-programa/:id', component: ProgramaEditarComponent},
	{path: 'programa/:id', component: ProgramaDetalleComponent},
	{path: 'crear-podcast/:programa', component: PodcastCrearComponent}, //le pasamos el id del program en el param programa
	{path: 'editar-podcast/:id', component: PodcastEditarComponent}, //le pasamos el id del podcast
    {path: 'mi-cuenta', component: UsuarioEdicionComponent}, 
    {path: '**', component: InicioComponent}
/*
	{path: 'artistas/:page', component: ArtistListComponent},
	{path: 'crear-artista', component: ArtistAddComponent},
	{path: 'editar-artista/:id', component: ArtistEditComponent},
	{path: 'artista/:id', component: ArtistDetailComponent},
	{path: 'crear-album/:artist', component: AlbumAddComponent},
	{path: 'editar-album/:id', component: AlbumEditComponent},
	{path: 'album/:id', component: AlbumDetailComponent},
	{path: 'crear-tema/:album', component: SongAddComponent},
	{path: 'editar-tema/:id', component: SongEditComponent},
	{path: 'mis-datos', component: UserEditComponent},
	
	{path: '**', component: HomeComponent}
*/	
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
