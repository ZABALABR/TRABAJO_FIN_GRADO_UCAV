import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';

import { ServicioUsuario } from  '../services/servicio.usuario';
import { ServicioCanalRadio } from  '../services/servicio.canalRadio';
import { CanalRadio } from '../models/canalRadio';


//import { ServicioPrograma } from '../services/servcio.programa';

import { Programa } from '../models/programa';

@Component({
	selector: 'programa-crear',
	templateUrl: '../views/programa-crear.html',
	providers: [ServicioUsuario, ServicioCanalRadio]
})

export class ProgramaCrearComponent implements OnInit{
	public titulo: string;
	public canalRadio: CanalRadio;
	public programa: Programa;
	public identity;
	public token;
	public url: string;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
        private _servicioUsuario: ServicioUsuario,
		private _servicioCanalRadio: ServicioCanalRadio
	){
		this.titulo = 'Crear nuevo programa de radio';
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.programa = new Programa('', '', 2018, '', '');

	}

	ngOnInit(){
		console.log('programa-crear.component.ts cargado');
	}

	onSubmit(){
		/*
		this._route.params.forEach((params: Params) => {
			let artist_id = params['artist'];
			this.album.artist = artist_id;

			this._albumService.addAlbum(this.token, this.album).subscribe(
				response => {
					
					if(!response.album){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡El album se ha creado correctamente!';
						this.album = response.album;
						
						this._router.navigate(['/editar-album', response.album._id]);
					}

				},
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);
			          this.alertMessage = body.message;

			          console.log(error);
			        }
				}	
			);


		});
		*/
	}

}