import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';


import { ServicioUsuario } from  '../services/servicio.usuario';
import { ServicioPodcast } from  '../services/servicio.podcast';

import { Podcast } from '../models/podcast';



/*
import { SongService } from '../services/song.service';
import { Song } from '../models/song';
*/


@Component({
	selector: 'podcast-crear',
	templateUrl: '../views/podcast-crear.html',
	providers: [ServicioUsuario,ServicioPodcast]
})

export class PodcastCrearComponent implements OnInit{
	public titulo: string;
	public podcast: Podcast;
	public identity;
	public token;
	public url: string;
	public alertMensaje;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _servicioUsuario: ServicioUsuario,
		private _servicioPodcast: ServicioPodcast
	){
		this.titulo = 'Crear nuevo podcast';
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.podcast = new Podcast('','', '', '', '');

	}

	ngOnInit(){
		console.log('podcast-crear.component.ts cargado');
	}


	onSubmit(){
     	

		this._route.params.forEach((params: Params) => {
			let programa_id = params['programa'];
			this.podcast.programa = programa_id;
			console.log(this.podcast);	

			this._servicioPodcast.crearPodcast(this.token, this.podcast).subscribe(
				response => {
					
					if(!response.podcast){
						this.alertMensaje = 'Error en el servidor';
					}else{
						this.alertMensaje = '¡El podcast se ha creado correctamente!';
						this.podcast = response.podcast;
						
						this._router.navigate(['/editar-podcast', response.podcast._id]);
					}

				},
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);
			          this.alertMensaje = body.message;

			          console.log(error);
			        }
				}	
			);

		});

	}


}