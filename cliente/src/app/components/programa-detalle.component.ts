import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';


import { ServicioUsuario } from  '../services/servicio.usuario';


import { ServicioPrograma } from '../services/servicio.programa';





import { Programa } from '../models/programa';


import { ServicioPodcast } from  '../services/servicio.podcast';
import { Podcast } from '../models/podcast';



@Component({
	selector: 'programa-detalle',
	templateUrl: '../views/programa-detalle.html',
	providers: [ServicioUsuario, ServicioPrograma,ServicioPodcast]
})

export class ProgramaDetalleComponent implements OnInit{
	public programa: Programa;
	public podcasts: Podcast[];
	public identity;
	public token;
	public url: string;
	public alertMensaje;
	public rss;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,

        private _servicioUsuario: ServicioUsuario,
		
		private _servicioPrograma: ServicioPrograma,
		private _servicioPodcast: ServicioPodcast,

	){
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('programa-detalle.component.ts cargado');

		// Obtener el programa de la BD
		this.damePrograma();
	}


	damePrograma(){
			console.log('el metodo funciona....')
			
	
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._servicioPrograma.damePrograma(this.token, id).subscribe(
				response => {
					if(!response.programa){
						this._router.navigate(['/']);
					}else{
						this.programa = response.programa;

						
						// obtenemos todos los podcast que tenemos en la bd de este programa de radio
						this._servicioPodcast.damePodcasts(this.token, response.programa._id).subscribe(
						response => {
							if(!response.podcasts){
								this.alertMensaje = 'Este programa no tiene ningún podcasts';
							}else{
								this.podcasts = response.podcasts;
							}
						},
						error => {
							var errorMessage = <any>error;

					        if(errorMessage != null){
					          var body = JSON.parse(error._body);
					          //this.alertMessage = body.message;

					          console.log(error);
					        }
						});


						

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


	public confirmado;
	siConfirmarBorrado(id){
		this.confirmado = id;
	}

	siCancelarPodcast(){
		this.confirmado = null;
	}

	siBorrarPodcast(id){
		this._servicioPodcast.eliminarPodcast(this.token, id).subscribe(
			response => {
				if(!response.podcast){
					alert('Error en el servidor');
				}

				this.damePrograma();
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
	}

	reproducirPodcast(podcast){
		let podcast_a_reproducir = JSON.stringify(podcast);
		let file_path = this.url + 'podcast/audio/' + podcast.file;
		let image_path = this.url + 'programa/logotipo/' + podcast.programa.imagen;

		localStorage.setItem('reproduciendo_podcast', podcast_a_reproducir);

		document.getElementById("mp3-source").setAttribute("src", file_path);
		(document.getElementById("reproductor") as any).load();
		(document.getElementById("reproductor") as any).play();

		document.getElementById('rep-podcast-descripcion').innerHTML = podcast.descripcion;
		document.getElementById('rep-podcast-canal').innerHTML = podcast.programa.canalradio.nombre;
		document.getElementById('rep-logo-programa').setAttribute('src', image_path);

	}

/*
    subscribirPodcast(){
    	console.log('el metodo funciona....')
			
	
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._servicioPrograma.damePrograma(this.token, id).subscribe(
				response => {
					if(!response.programa){
						this._router.navigate(['/']);
					}else{
						this.programa = response.programa;

						
						// llamamos al servicio para que envie peticion al api


					



						this._servicioPodcast.subscribirPodcast( response.programa._id).subscribe(

						response => {
							var respuestaMessage = <any>response;
							if(respuestaMessage != null){
								console.log('recibo respuesta....')
								this.rss = respuestaMessage._body;
								console.log('la respuesta es:'+ this.rss)
							}else{
								this.alertMensaje = 'Este programa no tiene ningún podcasts';
								console.log('sin respuesta....')
							}
						},
						error => {
							var errorMessage = <any>error;

					        if(errorMessage != null){
					          var body = JSON.parse(error._body);
					          //this.alertMessage = body.message;

					          console.log(error);
					        }
						});							
						
						

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
*/
}