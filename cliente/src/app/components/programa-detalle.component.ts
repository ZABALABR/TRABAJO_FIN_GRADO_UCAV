import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';


import { ServicioUsuario } from  '../services/servicio.usuario';


import { ServicioPrograma } from '../services/servicio.programa';





import { Programa } from '../models/programa';

/*
import { SongService } from '../services/song.service';
import { Song } from '../models/song';
*/




@Component({
	selector: 'programa-detalle',
	templateUrl: '../views/programa-detalle.html',
	providers: [ServicioUsuario, ServicioPrograma]
})

export class ProgramaDetalleComponent implements OnInit{
	public programa: Programa;
	//public songs: Song[];
	public identity;
	public token;
	public url: string;
	public alertMensaje;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,

        private _servicioUsuario: ServicioUsuario,
		
		private _servicioPrograma: ServicioPrograma

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

						/*
						// Sacar las canciones
						this._songService.getSongs(this.token, response.album._id).subscribe(
						response => {
							if(!response.songs){
								this.alertMessage = 'Este album no tiene canciones';
							}else{
								this.songs = response.songs;
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
						*/

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

/*
	public confirmado;
	onDeleteConfirm(id){
		this.confirmado = id;
	}

	onCancelSong(){
		this.confirmado = null;
	}

	onDeleteSong(id){
		this._songService.deleteSong(this.token, id).subscribe(
			response => {
				if(!response.song){
					alert('Error ene el servidor');
				}

				this.getAlbum();
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

	startPlayer(song){
		let song_player = JSON.stringify(song);
		let file_path = this.url + 'get-song-file/' + song.file;
		let image_path = this.url + 'get-image-album/' + song.album.image;

		localStorage.setItem('sound_song', song_player);

		document.getElementById("mp3-source").setAttribute("src", file_path);
		(document.getElementById("player") as any).load();
		(document.getElementById("player") as any).play();

		document.getElementById('play-song-title').innerHTML = song.name;
		document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
		document.getElementById('play-image-album').setAttribute('src', image_path);

	}

*/	
}