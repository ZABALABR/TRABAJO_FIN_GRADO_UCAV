import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { ServicioUsuario } from  '../services/servicio.usuario';
import { ServicioCanalRadio } from  '../services/servicio.canalRadio';

import { CanalRadio } from '../models/canalRadio';


@Component({
	selector: 'canalRadio-crear',
	templateUrl: '../views/canalRadio-crear.html',
	providers: [ServicioUsuario, ServicioCanalRadio]
})

export class CanalRadioCrearComponent implements OnInit{
	public titulo: string;
	public canalRadio: CanalRadio;
	public identity;
	public token;
	public url: string;
	public alertMensaje;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _servicioUsuario: ServicioUsuario,
		private _servicioCanalRadio: ServicioCanalRadio

		//private _artistService: ArtistService
	){
		this.titulo = 'Crear cadena de Radio';
		this.identity = this._servicioUsuario.getIdentity();
		this.token = this._servicioUsuario.getToken();
		this.url = GLOBAL.url;
		this.canalRadio = new CanalRadio('','','');
	}

	ngOnInit(){
		console.log('canalRadio-crear.component.ts cargado');
		
	}

	onSubmit(){
		
		console.log(this.canalRadio);

		
		this._servicioCanalRadio.crearCanalRadio(this.token, this.canalRadio).subscribe(
			response => {
				
				if(!response.canal){
					this.alertMensaje = 'Error en el servidor';
					//alert('Error en el servidor');
				}else{
					this.alertMensaje = '¡Creado canal de Radio correctamente!';
					this.canalRadio = response.canal;
					this._router.navigate(['/editar-canalRadio', response.canal._id]);
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
	 	
	}

}