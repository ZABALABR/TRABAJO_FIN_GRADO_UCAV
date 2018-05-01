import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../services/global';

import { Router, ActivatedRoute, Params } from '@angular/router';




import { ServicioUsuario } from  '../services/servicio.usuario';
import { ServicioPodcast } from  '../services/servicio.podcast';
import { ServicioSubirFichero } from '../services/servicio.subirFichero';

import { Podcast } from '../models/podcast';




@Component({
	selector: 'podcast-editar',
	templateUrl: '../views/podcast-crear.html',
	providers: [ServicioUsuario, ServicioPodcast, ServicioSubirFichero]
})

export class PodcastEditarComponent implements OnInit{
	public titulo: string;
	public podcast: Podcast;
	public identity;
	public token;
	public url: string;
	public alertMensaje;
	public editable;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,

		private _servicioUsuario: ServicioUsuario,
		private _servicioPodcast: ServicioPodcast,
		private _servicioSubirFichero: ServicioSubirFichero

		
	){
		this.titulo = 'Modificar podcast';
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.podcast = new Podcast('','', '', '', '');
		this.editable = true;
	}

	ngOnInit(){
		console.log('podcast-editar.component.ts cargado');

		// obtener el podcast a modificar
		this.damePodcast();
	}

	damePodcast(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._servicioPodcast.damePodcast(this.token, id).subscribe(
				response => {
					if(!response.podcast){
						this._router.navigate(['/']);
					}else{
						this.podcast = response.podcast;
						console.log(this.podcast);
					}
				},	
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);
			          //this.alertMessage = body.message;

			          console.log(error);
			        }
				}	
			);
		});
	}

	onSubmit(){

		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._servicioPodcast.modificarPodcast(this.token, id, this.podcast).subscribe(
				response => {
					
					if(!response.podcast){
						this.alertMensaje = 'Error en el servidor';
					}else{
						this.alertMensaje = '¡El podcast se ha actualizado correctamente!';
						
						if(!this.ficherosASubir){
							this._router.navigate(['/programa', response.podcast.programa]);
						}else{
							// Subir el fichero de podcast
							this._servicioSubirFichero.makeFileRequest(this.url+'podcast/audio/subir/'+id, [], this.ficherosASubir, this.token, 'file')
								.then(
									(result) => {
										this._router.navigate(['/programa', response.podcast.programa]);
									},
									(error) => {
										console.log(error);
									}
								);
						}
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

	public ficherosASubir: Array<File>;
	fileChangeEvent(fileInput: any){
		this.ficherosASubir = <Array<File>>fileInput.target.files;
	}


}