import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { ServicioUsuario } from  '../services/servicio.usuario';

/*
import { ArtistService } from '../services/artist.service';

*/
import { CanalRadio } from '../models/canalRadio';

@Component({
	selector: 'canalRadio-listado',
	templateUrl: '../views/canalRadio-listado.html',
	//providers: [ServicioUsuario, ArtistService]
	providers: [ServicioUsuario]
})

export class CanalRadioListadoComponent implements OnInit{
	public titulo: string;
	public canalesRadio: CanalRadio[];
	public identity;
	public token;
	public url: string;
	public next_page;
	public prev_page;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		
		private _servicioUsuario: ServicioUsuario
	){
		this.titulo = 'Canales de Radio';
		this.identity = this._servicioUsuario.getIdentity();
    	this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.next_page = 1;
		this.prev_page = 1;
	}

	ngOnInit(){
		console.log('canalRadio-listado.component.ts cargado');
		this.url = GLOBAL.url;

		//  el listado de Canales de Radio
	
	}
/*
	getArtists(){
		this._route.params.forEach((params: Params) =>{
				let page = +params['page'];
				if(!page){
					page = 1;
				}else{
					this.next_page = page+1;
					this.prev_page = page-1;

					if(this.prev_page == 0){
						this.prev_page = 1;
					}
				}

				this._artistService.getArtists(this.token, page).subscribe(
					response => {
						if(!response.artists){
							this._router.navigate(['/']);
						}else{
							this.artists = response.artists;
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
	onDeleteConfirm(id){
		this.confirmado = id;
	}

	onCancelArtist(){
		this.confirmado = null;
	}

	onDeleteArtist(id){
		this._artistService.deleteArtist(this.token, id).subscribe(
			response => {
				if(!response.artist){
					alert('Error en el servidor');
				}
				this.getArtists();
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
*/


}